const questionDao = require("../db/questionDao");
const tool = require("../utils/tool");

module.exports = {
    path: "/questionList",
    method: "post",

    execute(req, res) {
        questionDao.loadQuestionList().then((result) => {
            res.status(200).end(JSON.stringify(result));
        });
    }
}