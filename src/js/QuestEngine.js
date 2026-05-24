export class QuestEngine {
    constructor(container, storage) {
        this.container = container;
        this.storage = storage;
        this.currentQuest = null;
        this.currentStepIndex = 0;
    }

    async loadQuest(questId) {
        try {
            const response = await fetch(`src/data/quests/${questId}.json`);
            if (!response.ok) throw new Error('Quest not found');
            this.currentQuest = await response.json();
            this.currentStepIndex = 0;
            this.renderStep();
        } catch (error) {
            console.error('Error loading quest:', error);
            this.container.innerHTML = `<p class="error">Failed to load quest: ${error.message}</p>`;
        }
    }

    renderStep() {
        const step = this.currentQuest.steps[this.currentStepIndex];
        this.container.innerHTML = `
            <div class="quest-container animate-fade-in">
                <div class="quest-header">
                    <h2>${this.currentQuest.title}</h2>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((this.currentStepIndex + 1) / this.currentQuest.steps.length) * 100}%"></div>
                    </div>
                </div>
                <div class="quest-content">
                    <div id="quest-feedback" class="feedback"></div>
                    <p class="question">${step.question}</p>
                    ${step.image ? `<img src="${step.image}" alt="Quest image" class="quest-image">` : ''}
                    <div class="options-grid">
                        ${step.options.map((option, index) => `
                            <button class="option-btn" data-index="${index}">${option.text}</button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        this.container.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAnswer(parseInt(e.target.dataset.index)));
        });
    }

    handleAnswer(optionIndex) {
        const step = this.currentQuest.steps[this.currentStepIndex];
        const isCorrect = step.options[optionIndex].correct;
        const feedbackEl = document.getElementById('quest-feedback');

        if (isCorrect) {
            feedbackEl.textContent = '✅ Correct!';
            feedbackEl.className = 'feedback success animate-bounce-in';
            setTimeout(() => {
                this.currentStepIndex++;
                if (this.currentStepIndex < this.currentQuest.steps.length) {
                    this.renderStep();
                } else {
                    this.completeQuest();
                }
            }, 1000);
        } else {
            feedbackEl.textContent = '❌ Try again!';
            feedbackEl.className = 'feedback error animate-shake';
        }
    }

    completeQuest() {
        this.storage.saveProgress(this.currentQuest.id);
        this.container.innerHTML = `
            <div class="quest-container text-center animate-bounce-in">
                <h2>🎉 Quest Complete!</h2>
                <p>Congratulations! You've finished ${this.currentQuest.title}.</p>
                <button id="back-to-catalog" class="btn btn-primary mt-1">Back to Catalog</button>
            </div>
        `;
        document.getElementById('back-to-catalog').addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('show-catalog'));
        });
    }
}
