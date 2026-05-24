export class Catalog {
    constructor(container, questEngine) {
        this.container = container;
        this.questEngine = questEngine;
        this.quests = [
            { id: 'colors-1-3', title: 'Magic Colors', age: '1-3', category: 'Logic', description: 'Learn basic colors with fun objects.' },
            { id: 'math-4-6', title: 'Number Fun', age: '4-6', category: 'Math', description: 'Simple addition with friendly animals.' },
            { id: 'science-7-12', title: 'Lab Explorer', age: '7-12', category: 'Science', description: 'Fun experiments and science facts.' },
            { id: 'logic-13-18', title: 'Brain Master', age: '13-18', category: 'Logic', description: 'Challenging puzzles for sharp minds.' },
            { id: 'softskills-18-25', title: 'Team Leader', age: '18-25', category: 'Soft Skills', description: 'Scenario-based leadership challenges.' },
            { id: 'finance-25plus', title: 'Wealth Strategist', age: '25+', category: 'Finance', description: 'Mastering personal finance strategies.' },
            { id: 'memory-65plus', title: 'Mind Sharpeners', age: '65+', category: 'Memory', description: 'Gentle exercises to keep your mind active.' }
        ];
        this.filter = 'all';
    }

    render() {
        const filteredQuests = this.filter === 'all'
            ? this.quests
            : this.quests.filter(q => q.age === this.filter);

        this.container.innerHTML = `
            <div class="catalog">
                <header class="catalog-header">
                    <h2>Quest Catalog</h2>
                    <div class="filters">
                        <button class="filter-btn ${this.filter === 'all' ? 'active' : ''}" data-filter="all">All</button>
                        <button class="filter-btn ${this.filter === '1-3' ? 'active' : ''}" data-filter="1-3">1-3</button>
                        <button class="filter-btn ${this.filter === '4-6' ? 'active' : ''}" data-filter="4-6">4-6</button>
                        <button class="filter-btn ${this.filter === '7-12' ? 'active' : ''}" data-filter="7-12">7-12</button>
                        <button class="filter-btn ${this.filter === '13-18' ? 'active' : ''}" data-filter="13-18">13-18</button>
                        <button class="filter-btn ${this.filter === '18-25' ? 'active' : ''}" data-filter="18-25">18-25</button>
                        <button class="filter-btn ${this.filter === '25+' ? 'active' : ''}" data-filter="25+">25+</button>
                        <button class="filter-btn ${this.filter === '65+' ? 'active' : ''}" data-filter="65+">65+</button>
                    </div>
                </header>
                <div class="catalog-grid">
                    ${filteredQuests.map(quest => `
                        <div class="quest-card animate-slide-up">
                            <div class="quest-card-content">
                                <span class="quest-tag">${quest.age} years</span>
                                <span class="quest-tag">${quest.category}</span>
                                <h3>${quest.title}</h3>
                                <p>${quest.description}</p>
                                <button class="btn btn-primary start-quest-btn" data-id="${quest.id}">Start Quest</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.container.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filter = e.target.dataset.filter;
                this.render();
            });
        });

        this.container.querySelectorAll('.start-quest-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.questEngine.loadQuest(e.target.dataset.id);
            });
        });
    }
}
