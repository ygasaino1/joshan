let faraz = joshan.split('\n');
let currentIndex = 0;

const container = document.getElementById('farazContainer');
const indexInput = document.getElementById('indexInput');
const leftOverlay = document.querySelector('.nav-overlay.left');
const rightOverlay = document.querySelector('.nav-overlay.right');

// Function to update displayed faraz and sync input value
function updateDisplay(index) {
    if (index < 0) index = 0;
    if (index >= faraz.length) index = faraz.length - 1;
    currentIndex = index;
    if (container) container.innerText = faraz[currentIndex];
    if (indexInput) indexInput.value = currentIndex + 1;
}

// Event listeners for overlay navigation areas
if (leftOverlay) {
    leftOverlay.addEventListener('click', () => {
        updateDisplay(currentIndex - 1);
    });
}

if (rightOverlay) {
    rightOverlay.addEventListener('click', () => {
        updateDisplay(currentIndex + 1);
    });
}

if (indexInput) {
    indexInput.addEventListener('change', (e) => {
        const idx = parseInt(e.target.value, 10);
        console.log('beep');
        if (!isNaN(idx)) {
            updateDisplay(idx - 1);
        }
    });
}

// Initial display update
updateDisplay(1);