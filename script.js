let pomodoro = document.getElementById("pomodoro-timer")
let short = document.getElementById("short-timer")
let long = document.getElementById("long-timer")
let timers = document.querySelectorAll(".timer-display")
let session = document.getElementById("pomodoro-session")
let shortBreak = document.getElementById("short-break")
let longBreak = document.getElementById("long-break")
let stopBtn = document.getElementById("stop")
let startBtn = document.getElementById("start")
let timerMsg = document.getElementById("timer-message")
let button = document.querySelector(".button")

let currentTimer = null
let myInterval = null

function showDefaultTimer() {
    pomodoro.style.display = "block"
    short.style.display = "none"
    long.style.display = "none"
}

showDefaultTimer()

function hideAll() {
    timers.forEach((timer) => {
        timer.style.display = "none"
    })
}

session.addEventListener("click", () => {
    hideAll()
    pomodoro.style.display = "block"
    session.classList.add("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")

    currentTimer = pomodoro
    remainingTime = 0
})

shortBreak.addEventListener("click", () => {
    hideAll()
    short.style.display = "block"
    session.classList.remove("active")
    shortBreak.classList.add("active")
    longBreak.classList.remove("active")

    currentTimer = short
    remainingTime = 0
})

longBreak.addEventListener("click", () => {
    hideAll()
    long.style.display = "block"
    session.classList.remove("active")
    shortBreak.classList.remove("active")
    longBreak.classList.add("active")

    currentTimer = long
    remainingTime = 0
})

function startTimer(timerDisplay) {
    if (myInterval) {
        clearInterval(myInterval)
    }
    let timerDuration;
    if (remainingTime > 0) {
        timerDuration = remainingTime;
    } else {
        timerDuration = parseFloat(timerDisplay.getAttribute("data-duration")) * 60 * 1000;
    }
    let endTimestamp = Date.now() + timerDuration
    myInterval = setInterval(() => {
        const timeRemaining = endTimestamp - Date.now()
        if (timeRemaining <= 0) {
            clearInterval(myInterval)
            timerDisplay.querySelector(".time").textContent = "00:00"
            const alarm = new Audio("https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav");
            alarm.play()
        } else {
            const minutes = Math.floor(timeRemaining / 60000)
            const seconds = Math.floor((timeRemaining % 60000) / 1000)
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`
            timerDisplay.querySelector(".time").textContent = formattedTime
            remainingTime = timeRemaining
        }
    }, 1000);
}

startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer(currentTimer)
        timerMsg.style.display = "none"
    } else {
        timerMsg.style.display = "block"
    }
})

stopBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(myInterval)
    }
})