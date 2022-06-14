const gameRecordDao = require("../db/gameRecordDao");

module.exports = {
    path: "/rankList",
    method: "post",

    execute(req, res) {
        gameRecordDao.loadRankList().then((result) => {
            res.status(200).end(JSON.stringify(result));
        });
    }
}