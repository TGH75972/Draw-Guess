const drawings = [
    { url: 'images/cloth.png', word: 'cloth' },
    { url: 'images/handkerchief.png', word: 'handkerchief' },
    { url: 'images/hell.png', word: 'hell' },
    { url: 'images/hot_chocolate.png', word: 'hot chocolate' },
    { url: 'images/mail.png', word: 'mail' },
    { url: 'images/telescope.png', word: 'telescope' }
];

let currentDrawingIndex = 0;
let triesLeft = 5;
let score = 0;
let hintRevealed = [];

const drawingImage = document.getElementById('drawing-image');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit-guess');
const triesLeftDisplay = document.getElementById('tries-left');
const wordHintDisplay = document.getElementById('word-hint');
const scoreDisplay = document.getElementById('score-value');

loadDrawing(currentDrawingIndex);

function loadDrawing(index) {
    const drawing = drawings[index];
    drawingImage.src = drawing.url;
    triesLeft = 5;
    hintRevealed = new Array(drawing.word.length).fill('_');
    triesLeftDisplay.textContent = `Tries left: ${triesLeft}`;
    wordHintDisplay.textContent = hintRevealed.join(' ');
    guessInput.value = '';
}

submitButton.addEventListener('click', function() {
    const guess = guessInput.value.trim().toLowerCase();
    const correctWord = drawings[currentDrawingIndex].word.toLowerCase();

    if (guess === correctWord) {
        score++;
        scoreDisplay.textContent = score;
        loadNextDrawing();
    } else {
        triesLeft--;
        triesLeftDisplay.textContent = `Tries left: ${triesLeft}`;
        revealHint(correctWord);
        if (triesLeft === 0) {
            wordHintDisplay.textContent = `The word was "${correctWord}"`;
            loadNextDrawing();
        }
    }

    guessInput.value = '';
});

function revealHint(word) {
    const indices = [];
    for (let i = 0; i < word.length; i++) {
        if (hintRevealed[i] === '_') {
            indices.push(i);
        }
    }
    if (indices.length > 0) {
        const randomIndex = indices[Math.floor(Math.random() * indices.length)];
        hintRevealed[randomIndex] = word[randomIndex];
    }
    wordHintDisplay.textContent = hintRevealed.join(' ');
}

function loadNextDrawing() {
    currentDrawingIndex++;
    if (currentDrawingIndex < drawings.length) {
        loadDrawing(currentDrawingIndex);
    } else {
        alert(`Game Over! Your final score is ${score}`);
        currentDrawingIndex = 0;
        score = 0;
        loadDrawing(currentDrawingIndex);
    }
}
