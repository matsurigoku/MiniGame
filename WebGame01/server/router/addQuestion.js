const questionDao = require("../db/questionDao");
const tool = require("../utils/tool");

module.exports = {
    path: "/addQuestion",
    method: "post",

    execute(req, res) {
        const obj = JSON.parse(tool.b64_to_utf8(req.body.data));
        if (!obj.content) {
            res.status(404).end();
            return;
        }

        if (obj.id == "-1") {
            questionDao.addQuestion({ content: obj.content }).then((result) => {
                let msg = result.upsertedCount > 0 ? "Added successfully!" : "Add failed, the same question already exists!";

                res.status(200).end(JSON.stringify({
                    msg: msg
                }));
            });
        } else {
            questionDao.updateQuestion({ content: obj.content, id: obj.id }).then((result) => {
                let msg = result.modifiedCount > 0 ? "Updated successfully!" : "Update failed!";

                res.status(200).end(JSON.stringify({
                    msg: msg
                }));
            });
        }
    }
}