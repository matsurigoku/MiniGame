const ranklist = document.getElementById('ranklist')

function initRankTable() {
    getRankList().then(results => {
        const rkList = results ? JSON.parse(results) : {}
        const playerDatas = Object.values(rkList)
        const maxData = 5

        if (playerDatas.length) {
            playerDatas.sort((x, y) => y.score - x.score)

            let content = ""
            for (let i = 0; i < playerDatas.length && i < maxData; ++i) {
                const player = playerDatas[i]
                content += `<li>${i + 1}. <span class="username">User: ${player.name}</span><span class="userscore">Score: ${player.score}</span></li>\n`
            }
            ranklist.innerHTML = content
        } else {
            ranklist.innerHTML = "There is currently no record..."
        }
    })
}

initRankTable()