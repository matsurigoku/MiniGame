const gameRecordDao = require("../db/gameRecordDao");
const tool = require("../utils/tool");

module.exports = {
    path: "/saveScore",
    method: "post",

    execute(req, res) {
        const obj = JSON.parse(tool.b64_to_utf8(req.body.data));
        if (!obj || !obj.user || !obj.score) {
            res.status(404).end();
            return;
        }

        gameRecordDao.updatePlayerRecord(obj.user, obj.score).then(result => {
            if (result.modifiedCount > 0 || result.upsertedCount > 0) {
                gameRecordDao.loadRankList().then((result) => {
                    const rankInfo = result[obj.user];
                    res.status(200).end(JSON.stringify({
                        rank: rankInfo.rank
                    }));
                });
            } else {
                res.status(200).end();
            }
        });
    }
}