const whatIs = document.getElementById('what-is');
const howTo = document.getElementById('how-to');
const aboutMe = document.getElementById('about-me');

const startButton = document.getElementById('pomodoro-actions__start');
const pauseButton = document.getElementById('pomodoro-actions__pause');
const stopButton = document.getElementById('pomodoro-actions__stop');
const display = document.getElementById('pomodoro-timer__display');

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

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

// Change button color on click
$('#pomodoro-mode__session').click( function(){
    $('#pomodoro-mode__session').addClass('mode-active');
    $('#pomodoro-mode__short-break').removeClass('mode-active');
    $('#pomodoro-mode__long-break').removeClass('mode-active');
})

$('#pomodoro-mode__short-break').click( function(){
    $('#pomodoro-mode__short-break').addClass('mode-active');
    $('#pomodoro-mode__session').removeClass('mode-active');
    $('#pomodoro-mode__long-break').removeClass('mode-active');
})

$('#pomodoro-mode__long-break').click( function(){
    $('#pomodoro-mode__long-break').addClass('mode-active');
    $('#pomodoro-mode__short-break').removeClass('mode-active');
    $('#pomodoro-mode__session').removeClass('mode-active');
})


const currentMode = (modeIs = 'session') => {
    if (modeIs == 'session'){
        mode = modeIs;
        currentTimeLeft = sessionDuration;
        display.innerText = '25:00'
    }
    else if (modeIs == 'short break'){
        mode = modeIs;
        currentTimeLeft = shortBreakDuration;
        display.innerText = '05:00'
    }
    else if (modeIs == 'long break'){
        mode = modeIs;
        currentTimeLeft = longBreakDuration;
        display.innerText = '15:00'
    }
}

const stopClock = () => {
    // 1) reset the timer we set
    clearInterval(clockTimer);
    // 2) update our variable to know that the timer is stopped
    isClockRunning = false;
    // reset the time left in the session to its original state
    currentMode(mode);
    // update the timer displayed
    displayCurrentTimeLeftInSession();
  }

const toggleClock = (reset) => {
    if (reset) {
        // STOP THE TIMER
        stopClock();
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

// Modal operation
whatIs.addEventListener('click', () => {
    modal.style.display = 'block';
})

span.addEventListener('click', () => {
    modal.style.display = 'none';
})

window.addEventListener('click', () => {
    if (event.target == modal) {modal.style.display = 'none'};
})

// START
startButton.addEventListener('click', () => {
    toggleClock();
})

// PAUSE
pauseButton.addEventListener('click', () => {
    toggleClock();
})

// STOP
stopButton.addEventListener('click', () => {
    toggleClock(true);
})

// Mode selection
modeSession.addEventListener('click', () => {
    currentMode('session');
});
modeShortBreak.addEventListener('click', () => {
    currentMode('short break');
});
modeLongBreak.addEventListener('click', () => {
    currentMode('long break');
});