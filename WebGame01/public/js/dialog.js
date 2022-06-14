const winboard = document.getElementById('winboard')
const wintitle = document.getElementById('wintitle')
const wininfo = document.getElementById('wininfo')
const winfinish = document.getElementById('winfinish')

function showWinBoard(name, result) {
    if (result) {
        wintitle.innerText = `New Score!`
    } else {
        wintitle.innerText = `Game Fisnish!`
    }

    wininfo.innerText = `
        User: ${name}
        Score: ${calScore()}
        ${result ? `Rank: ${JSON.parse(result).rank}` : ""}
    `.trim()

    winboard.showModal()
}

winfinish.addEventListener("click", () => {
    playGame()
    winboard.close()
})