let faraz = joshan.split('\n');
let currentIndex = 0;

const container = document.getElementById('farazContainer');
const indexInput = document.getElementById('indexInput');
const leftOverlay = document.querySelector('.nav-overlay.left');
const rightOverlay = document.querySelector('.nav-overlay.right');

// Function to update displayed faraz and sync input value
function updateDisplay(index) {
    if (index < 0) index = 99;
    if (index >= faraz.length) index = 0;
    currentIndex = index;
    if (container) container.innerText = faraz[currentIndex];
    if (indexInput) indexInput.value = currentIndex + 1;
    // Persist currentIndex in localStorage
    localStorage.setItem('currentIndex', currentIndex);
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

// Add keyboard navigation for left and right arrow keys
window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        updateDisplay(currentIndex - 1);
    } else if (e.code === 'ArrowRight') {
        updateDisplay(currentIndex + 1);
    }
});

if (indexInput) {
    indexInput.addEventListener('focus', (e) => {
        e.target.value = '';
    });
}

if (indexInput) {
    indexInput.addEventListener('change', (e) => {
        const idx = parseInt(e.target.value, 10);
        console.log('beep');
        if (!isNaN(idx)) {
            updateDisplay(idx - 1);
        }
        e.target.blur();
    });
}

function launchFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// New function to toggle fullscreen mode
function toggleFullScreen() {
    // Check if document is currently in fullscreen mode
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        // Exit fullscreen using available API
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        document.querySelector('#fullscreenButton').style.color = `#ffffff`;
    } else {
        // Enter fullscreen mode
        launchFullScreen(document.documentElement);
        document.querySelector('#fullscreenButton').style.color = `#000000`;

    }
}

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.querySelector('#fullscreenButton').style.color = `#ffffff`;
    } else {
        document.querySelector('#fullscreenButton').style.color = `#000000`;
    }
});

const fullscreenButton = document.getElementById('fullscreenButton');
if (fullscreenButton) {
    fullscreenButton.addEventListener('click', () => {
        toggleFullScreen();
    });
}

// Initial display update using stored currentIndex if exists
const savedIndex = localStorage.getItem('currentIndex');
if (savedIndex !== null) {
    updateDisplay(parseInt(savedIndex, 10));
} else {
    updateDisplay(0);
}
