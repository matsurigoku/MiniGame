const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const maxscoretext = document.getElementById('maxscore')
const scoretext = document.getElementById('score')
const username = document.getElementById('username')
const round = document.getElementById('round')

const TOTAL_TEST = 10
const EACH_TEST_TIME = 100
const CUSTOM_PROB = 0.15 // 自訂題目觸發機率, 範圍0 ~ 1

const app = {
    user: null,
    score: 0,
    round: 0,
    endtime: null
}

function init() {
    quoteInputElement.addEventListener('input', () => {
        const arrayQuote = quoteDisplayElement.querySelectorAll('span')
        const arrayValue = quoteInputElement.value.split('')

        let correct = true
        arrayQuote.forEach((characterSpan, index) => {
            const character = arrayValue[index]
            if (character == null) {
                characterSpan.classList.remove('correct')
                characterSpan.classList.remove('incorrect')
                correct = false
            } else if (character === characterSpan.innerText) {
                characterSpan.classList.add('correct')
                characterSpan.classList.remove('incorrect')
            } else {
                characterSpan.classList.remove('correct')
                characterSpan.classList.add('incorrect')
                correct = false
            }
        })

        if (correct) {
            renderNewQuote()
        }
    })
}

function getRandomQuote() {
    if (Math.random() > CUSTOM_PROB) {
        return fetch(RANDOM_QUOTE_API_URL)
            .then(response => response.json())
            .then(data => data.content)
    } else {
        return new Promise((resolve, reject) => {
            getRandomQuestion().then(res => {
                const obj = JSON.parse(res);
                resolve(obj.content)
            }).catch(err => {
                fetch(RANDOM_QUOTE_API_URL)
                    .then(response => response.json())
                    .then(data => resolve(data.content))
            })
        });
    }
}

async function renderNewQuote() {
    if (app.round >= TOTAL_TEST) {
        if (timerId) {
            app.endtime = new Date()
            clearInterval(timerId)
            timerId = null
        }

        updateScore()
        storeUserScore(app.user, calScore(), showWinBoard)
    } else {
        await playGame()
    }
}

async function playGame() {
    nextRound()
    updateScore()
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    timerId || startTimer()
}

let timerId
let startTime

function startTimer() {
    timerId = setInterval(() => {
        timer.innerText = getTimerTime()
        updateScore()
    }, 1000)
}

function getTimerTime() {
    return Math.floor(((app.endtime || new Date()) - startTime) / 1000)
}

function nextRound() {
    if (app.round >= TOTAL_TEST) {
        app.round = 0
        app.endtime = null
    }

    if (app.round == 0) {
        timerElement.innerText = 0
        startTime = new Date()
    }

    app.round += 1
    round.innerText = `round: ${app.round}`
}

async function restoreUser() {
    const user = localStorage.getItem("user");
    if (!user) {
        location.href = "./index.html"
        return
    }

    let result = await login(user);

    const player = JSON.parse(result) || { name: user, score: 0 }

    app.user = user
    app.score = player.score || 0

    username.innerText = `user: ${app.user}`
    maxscoretext.innerText = `max score: ${app.score}`
}

function storeUserScore(name, score, callback) {
    saveScore(name, score).then((result) => {
        if (result) {
            app.score = score
            maxscoretext.innerText = `max score: ${app.score}`
        }

        callback(app.user, result)
    })
}

// 期望為每題最快25秒打完, 所以如果平均25秒打完應該為100分
function calScore() {
    return Math.floor(app.round * EACH_TEST_TIME * 25 / (getTimerTime() || 1))
}

function updateScore() {
    scoretext.innerText = `score: ${calScore()}`
}

restoreUser().then((res) => {
    renderNewQuote().then((res) => {
        init()
    })
})