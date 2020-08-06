const whatIs = document.getElementById('what-is');
const howTo = document.getElementById('how-to');
const aboutMe = document.getElementById('about-me');

const startPauseButton = document.getElementById('pomodoro-actions__start-pause');
const resetButton = document.getElementById('pomodoro-actions__reset');
const display = document.getElementById('pomodoro-timer__display');

const modeSession = document.getElementById('pomodoro-mode__session');
const modeShortBreak = document.getElementById('pomodoro-mode__short-break');
const modeLongBreak = document.getElementById('pomodoro-mode__long-break');

let mode = 'session';

let isClockRunning = false;

// in seconds = 25 mins
let sessionDuration = 1500;
let currentTimeLeft = 1500;

// in seconds = 5 mins;
let shortBreakDuration = 300;
let longBreakDuration = 900;

const togglePlayButton = () => {
    isClockRunning ? startPauseButton.innerHTML = '<span class="material-icons-round gradient-text">pause</span>' 
    : startPauseButton.innerHTML = '<span class="material-icons-round gradient-text">play_arrow</span>';
}

const currentMode = (modeIs = 'session') => {
    if (modeIs == 'session') {
        mode = modeIs;
        currentTimeLeft = sessionDuration;
        display.innerText = '25:00'
    }
    else if (modeIs == 'short break') {
        mode = modeIs;
        currentTimeLeft = shortBreakDuration;
        display.innerText = '05:00'
    }
    else if (modeIs == 'long break') {
        mode = modeIs;
        currentTimeLeft = longBreakDuration;
        display.innerText = '15:00'
    }
}

const resetClock = () => {
    // reset the timer we set
    clearInterval(clockTimer);
    // update our variable to know that the timer is stopped
    isClockRunning = false;
    // reset the time left in the session to its original state
    togglePlayButton ();
    // set the mode
    currentMode(mode);
    // update the timer displayed
    displayCurrentTimeLeftInSession();
}

const toggleClock = (reset) => {
    if (reset) {
        // Reset THE TIMER
        resetClock();
    } else {
        if (isClockRunning === true) {
            // PAUSE THE TIMER
            clearInterval(clockTimer);
            isClockRunning = false;
        } else {
            // START THE TIMER
            isClockRunning = true;
            clockTimer = setInterval(() => {
                // decrease time left / increase time spent
                currentTimeLeft--;
                displayCurrentTimeLeftInSession();
            }, 1000)
        }
    }
}

const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeft;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    let hours = parseInt(secondsLeft / 3600);
    // add leading zeroes if it's less than 10
    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time
    }
    if (hours > 0) result += `${hours}:`
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    // Print the time
    display.innerText = result.toString();
}

// ============================================================
// Change session button color on click
$('#pomodoro-mode__session').click(function () {
    $('#pomodoro-mode__session').addClass('mode-active');
    $('#pomodoro-mode__short-break').removeClass('mode-active');
    $('#pomodoro-mode__long-break').removeClass('mode-active');
})

$('#pomodoro-mode__short-break').click(function () {
    $('#pomodoro-mode__short-break').addClass('mode-active');
    $('#pomodoro-mode__session').removeClass('mode-active');
    $('#pomodoro-mode__long-break').removeClass('mode-active');
})

$('#pomodoro-mode__long-break').click(function () {
    $('#pomodoro-mode__long-break').addClass('mode-active');
    $('#pomodoro-mode__short-break').removeClass('mode-active');
    $('#pomodoro-mode__session').removeClass('mode-active');
})


// ============================================================
// Modal operation
$('nav>button').on('click', function () {
    $('.modal-background').addClass('show').removeClass('hide');
    $('#' + $(this).data('modal')).addClass('show').removeClass('hide');
});

$('a').on('click', function () {
    $('.modal-background').addClass('show').removeClass('hide');
    $('#' + $(this).data('modal')).addClass('show').removeClass('hide');
});

$('.modal-background').on('click', function (e) {
    e.preventDefault();
    $(this).removeClass('show').addClass('hide');
    $('.modal.show').removeClass('show').addClass('hide');
});

$('.close-modal').on('click', function (e) {
    e.preventDefault();
    $('.modal-background').removeClass('show').addClass('hide');
    $('.modal.show').removeClass('show').addClass('hide');
});

$('.modal').on('click', function (e) {
    e.preventDefault();
});

// ============================================================
// Actions
// Start Pause
startPauseButton.addEventListener('click', () => {
    toggleClock();
    togglePlayButton ();
    // startPauseButton.innerText == 'play_arrow' ? startPauseButton.innerHTML = '<span class="material-icons-round gradient-text">pause</span>' 
    // : startPauseButton.innerHTML = '<span class="material-icons-round gradient-text">play_arrow</span>';
})

// Reset
resetButton.addEventListener('click', () => {
    toggleClock(true);
})

// ============================================================
// Mode selection
modeSession.addEventListener('click', () => {
    currentMode('session');
    resetClock();
});
modeShortBreak.addEventListener('click', () => {
    currentMode('short break');
    resetClock();
});
modeLongBreak.addEventListener('click', () => {
    currentMode('long break');
    resetClock();
});