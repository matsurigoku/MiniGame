const questionDao = require("../db/questionDao");
const tool = require("../utils/tool");

module.exports = {
    path: "/removeQuestion",
    method: "post",

    execute(req, res) {
        const obj = JSON.parse(tool.b64_to_utf8(req.body.data));
        if (!obj.id) {
            res.status(404).end();
            return;
        }

        questionDao.removeQuestion(obj.id).then((result) => {
            let msg = result.deletedCount > 0 ? "Deleted successfully!" : "Delete failed, this data was not found!";

            res.status(200).end(JSON.stringify({
                msg: msg
            }));
        });
    }
}