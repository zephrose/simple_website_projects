const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const cvc_words = [
    'had',
    'mad',
    'sad',
    'pat',
    'sat',
    'cat',
    'can',
    'van',
    'fan',
    'sap',
    'tap',
    'map',
    'men',
    'ten',
    'hen',
    'sun',
    'run',
    'fun'
];

// Init
let randomWord;
let score = 0;
let time = 30;
let difficulty = localStorage.getItem('difficulty') !== null ? 
                 localStorage.getItem('difficulty') : 'beginner';
difficultySelect.value = difficulty;
text.focus(); // Focus user to text input on page
const timeInterval = setInterval(updateTime, 1000); // Start Counting Down

// Game functions
function getRandomWord() {
    return cvc_words[Math.floor(Math.random()*cvc_words.length)];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        // End game
        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time Ran Out!</h1>
        <p>Your Final Score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display='flex';
}

addWordToDOM();

// Event Listeners
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        e.target.value = '';
        if (difficulty === 'expert') {
            time += 2;
        } else if (difficulty === 'advanced') {
            time += 4;
        } else {
            time += 6;
        }
        updateTime();
    }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
    location.reload();
});