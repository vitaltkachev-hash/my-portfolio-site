export class Storage {
    constructor() {
        this.STORAGE_KEY = 'quest_haven_progress';
    }

    saveProgress(questId) {
        const progress = this.getProgress();
        if (!progress.completedQuests.includes(questId)) {
            progress.completedQuests.push(questId);
            progress.achievements.push({
                id: `ach_${questId}`,
                date: new Date().toISOString(),
                title: 'Quest Master'
            });
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
        }
    }

    getProgress() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return {
            completedQuests: [],
            achievements: [],
            userName: 'Guest',
            isRegistered: false
        };
    }

    saveUser(userData) {
        const progress = this.getProgress();
        progress.userName = userData.name;
        progress.isRegistered = true;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    }

    resetProgress() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}
