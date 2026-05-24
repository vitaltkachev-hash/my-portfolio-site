import { QuestEngine } from './QuestEngine.js';
import { Catalog } from './Catalog.js';
import { Profile } from './Profile.js';
import { Leaderboard } from './Leaderboard.js';
import { Storage } from './Storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const navCatalog = document.getElementById('nav-catalog');
    const navProfile = document.getElementById('nav-profile');
    const navLeaderboard = document.getElementById('nav-leaderboard');
    const goHome = document.getElementById('go-home');

    const storage = new Storage();
    const questEngine = new QuestEngine(app, storage);
    const catalog = new Catalog(app, questEngine);
    const profile = new Profile(app, storage);
    const leaderboard = new Leaderboard(app);

    window.addEventListener('show-catalog', () => {
        catalog.render();
    });

    function showHero() {
        const progress = storage.getProgress();
        app.innerHTML = `
            <section id="hero" class="hero">
                <div class="hero-content">
                    <h1>Welcome to Quest Haven, <span id="display-name"></span>!</h1>
                    <p>Stimulate your mind with interactive quests designed for your age.</p>
                    ${!progress.isRegistered ? `
                        <div class="registration-form mt-2">
                            <input type="text" id="reg-name" placeholder="Enter your name" class="form-input">
                            <button id="register-btn" class="btn btn-primary">Register</button>
                        </div>
                    ` : ''}
                    <div class="mt-2">
                        <button id="start-intro" class="btn btn-secondary">Start Intro Quest</button>
                    </div>
                </div>
            </section>
        `;

        document.getElementById('display-name').textContent = progress.userName;

        const regBtn = document.getElementById('register-btn');
        if (regBtn) {
            regBtn.addEventListener('click', () => {
                const name = document.getElementById('reg-name').value;
                if (name) {
                    storage.saveUser({ name });
                    showHero();
                }
            });
        }

        document.getElementById('start-intro').addEventListener('click', () => {
            questEngine.loadQuest('intro');
        });
    }

    goHome.addEventListener('click', showHero);
    navCatalog.addEventListener('click', (e) => {
        e.preventDefault();
        catalog.render();
    });
    navProfile.addEventListener('click', (e) => {
        e.preventDefault();
        profile.render();
    });
    navLeaderboard.addEventListener('click', (e) => {
        e.preventDefault();
        leaderboard.render();
    });

    showHero();
});
