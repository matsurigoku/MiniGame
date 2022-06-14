const startBtn = document.getElementById('startBtn')
const errorTip = document.getElementById('errorTip')

startBtn.addEventListener("click", () => {
    let name = nameinputer.value.trim();
    if (name) {
        localStorage.setItem("user", name)
        location.href = "./game.html"
    } else {
        errorTip.innerText = "Error! The input cannot be empty."
    }
})