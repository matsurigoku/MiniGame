const gameRecordDao = require("../db/gameRecordDao");
const tool = require("../utils/tool");

module.exports = {
    path: "/login",
    method: "post",

    execute(req, res) {
        const user = JSON.parse(tool.b64_to_utf8(req.body.data));
        if (!user) {
            res.status(404).end();
            return;
        }

        gameRecordDao.loginUser(user).then((result) => {
            res.status(200).end(JSON.stringify(result));
        });
    }
}