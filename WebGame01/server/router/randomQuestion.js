const questionDao = require("../db/questionDao");
const tool = require("../utils/tool");

module.exports = {
    path: "/randomQuestion",
    method: "post",

    execute(req, res) {
        questionDao.getRandomQuestion().then((result) => {
            if (result) {
                res.status(200).end(JSON.stringify({
                    content: result.content
                }));
            } else {
                res.status(404).end();
            }
        });
    }
}