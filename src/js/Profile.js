export class Profile {
    constructor(container, storage) {
        this.container = container;
        this.storage = storage;
    }

    render() {
        const progress = this.storage.getProgress();

        this.container.innerHTML = `
            <div class="profile animate-fade-in">
                <header class="profile-header">
                    <h2>User Profile: ${progress.userName}</h2>
                </header>

                <div class="stats-container">
                    <div class="stat-card">
                        <span class="stat-value">${progress.completedQuests.length}</span>
                        <span class="stat-label">Quests Completed</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value">${progress.achievements.length}</span>
                        <span class="stat-label">Achievements Earned</span>
                    </div>
                </div>

                <div class="achievements-section">
                    <h3>Your Achievements</h3>
                    <div class="achievements-list">
                        ${progress.achievements.length > 0
                            ? progress.achievements.map(ach => `
                                <div class="achievement-item">
                                    <span class="ach-icon">🏆</span>
                                    <div class="ach-info">
                                        <h4>${ach.title}</h4>
                                        <p>Earned on ${new Date(ach.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            `).join('')
                            : '<p>Complete your first quest to earn an achievement!</p>'
                        }
                    </div>
                </div>

                <button id="reset-progress" class="btn btn-secondary mt-2">Reset Progress</button>
            </div>
        `;

        document.getElementById('reset-progress').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress?')) {
                this.storage.resetProgress();
                this.render();
            }
        });
    }
}
