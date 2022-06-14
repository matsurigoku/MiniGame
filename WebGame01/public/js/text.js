const startBtn = document.getElementById('startBtn')
const rankBtn = document.getElementById('rankBtn')
const customBtn = document.getElementById('customBtn')
const questionsBtn = document.getElementById('questionsBtn')
const aboutBtn = document.getElementById('aboutBtn')

startBtn.addEventListener("click", () => {
    location.href = "./register.html"
})

rankBtn.addEventListener("click", () => {
    location.href = "./rank.html"
})

customBtn.addEventListener("click", () => {
    location.href = "./custom.html"
})

questionsBtn.addEventListener("click", () => {
    location.href = "./questions.html"
})

aboutBtn.addEventListener("click", () => {

})