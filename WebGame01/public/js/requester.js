function utf8_to_b64(str) {
    return window.btoa(encodeURIComponent(escape(str)));
}

function sendPost(path, postData, alertDisable) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: path,
            data: {
                data: postData
            },
            success: function(result) {
                resolve(result)
            },
            error: function(result) {
                if (!alertDisable) {
                    alert('error')
                }
                reject(result)
            }
        });
    });
}
//做網路請求的

function saveScore(user, score) {
    return sendPost("/saveScore", utf8_to_b64(JSON.stringify({ user: user, score: score })))
}

function login(name) {
    return sendPost("/login", utf8_to_b64(JSON.stringify(name)))
}
//前端對後端坐登入請求

function getRankList() {
    return sendPost("/rankList")
}

function addQuestion(content, qid) {
    return sendPost("/addQuestion", utf8_to_b64(JSON.stringify({ content: content, id: qid })))
}

function removeQuestion(id) {
    return sendPost("/removeQuestion", utf8_to_b64(JSON.stringify({ id: id })))
}

function getQuestionList() {
    return sendPost("/questionList")
}

function getRandomQuestion() {
    return sendPost("/randomQuestion", null, true)
}