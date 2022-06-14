const customInputer = document.getElementById("quoteInput")
const addQusBtn = document.getElementById("addQusBtn")

addQusBtn.addEventListener("click", (e) => {
    if (customInputer.value && customInputer.value.trim()) {
        addQuestion(customInputer.value, '-1').then(res => {
            const obj = JSON.parse(res);
            alert(obj.msg)
        });
    } else {
        alert("Error! The input cannot be empty!")
    }
});