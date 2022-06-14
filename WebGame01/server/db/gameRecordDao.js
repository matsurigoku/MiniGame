const db = require("./dbMgr")

module.exports = {
    async loadRankList() {
        let ret = {};

        try {
            const collection = db.svr.db("WebGame").collection("Records");
            let datas = await collection.find().sort({ score: -1 });
            let rank = 0;

            await datas.forEach(item => {
                let tmp = {};

                item = item || {};

                tmp.name = item.name;
                tmp.score = item.score || 0;
                tmp.rank = ++rank;

                ret[tmp.name] = tmp;
            })

        } finally {}

        return ret;
    },

    async updatePlayerRecord(name, score) {
        try {
            const collection = db.svr.db("WebGame").collection("Records");

            return await collection.updateOne({
                name: name,
            }, [{
                $set: {
                    score: {
                        $cond: {
                            if: {
                                $lt: ["$score", score]
                            },
                            then: score,
                            else: "$score"
                        }
                    },
                },
            }], {
                upsert: true,
            });
        } finally {}
    },

    async loginUser(name) {
        let ret = {};

        try {
            const collection = db.svr.db("WebGame").collection("Records");
            let item = await collection.findOne({
                name: name,
            });

            item = item || {};

            ret.name = item.name || name;
            ret.score = item.score || 0;
        } finally {}

        return ret;
    },
}