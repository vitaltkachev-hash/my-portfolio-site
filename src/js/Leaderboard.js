export class Leaderboard {
    constructor(container) {
        this.container = container;
        this.mockLeaders = [
            { name: 'Alice', points: 1250, completed: 15 },
            { name: 'Bob', points: 980, completed: 12 },
            { name: 'Charlie', points: 850, completed: 10 },
            { name: 'David', points: 720, completed: 8 },
            { name: 'Eve', points: 600, completed: 7 }
        ];
    }

    render() {
        this.container.innerHTML = `
            <div class="leaderboard animate-fade-in">
                <header class="leaderboard-header">
                    <h2>Global Leaderboard</h2>
                    <p>Top explorers and their achievements</p>
                </header>

                <div class="leaderboard-table-container mt-2">
                    <table class="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Explorer</th>
                                <th>Quests</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.mockLeaders.map((leader, index) => `
                                <tr class="${index < 3 ? 'top-rank' : ''}">
                                    <td>${index + 1}</td>
                                    <td>${leader.name} ${index === 0 ? '👑' : ''}</td>
                                    <td>${leader.completed}</td>
                                    <td>${leader.points}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="tournament-info mt-2">
                    <h3>Current Tournament: Summer Questathon</h3>
                    <p>Ends in 5 days. Complete 5 new quests to qualify!</p>
                </div>
            </div>
        `;
    }
}
