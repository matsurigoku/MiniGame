const ObjectId = require('mongodb').ObjectId;
const db = require("./dbMgr")

module.exports = {
    async loadQuestionList() {
        let ret = {};

        try {
            const collection = db.svr.db("WebGame").collection("Questions");
            let datas = await collection.find();

            await datas.forEach(item => {
                let tmp = {};

                item = item || {};

                tmp._id = item._id;
                tmp.content = item.content;

                ret[tmp._id] = tmp;
            })

        } finally {}

        return ret;
    },

    async addQuestion(question) {
        try {
            const collection = db.svr.db("WebGame").collection("Questions");

            return await collection.updateOne({
                content: question.content,
            }, {
                $setOnInsert: {}
            }, {
                upsert: true,
            });
        } finally {}
    },

    async updateQuestion(question) {
        try {
            const collection = db.svr.db("WebGame").collection("Questions");

            return await collection.updateOne({
                _id: ObjectId(question.id),
            }, {
                $set: {
                    content: question.content
                }
            });
        } finally {}
    },

    async removeQuestion(id) {
        try {
            const collection = db.svr.db("WebGame").collection("Questions");
            return await collection.deleteOne({
                _id: ObjectId(id),
            });
        } finally {}
    },

    async getRandomQuestion() {
        try {
            const collection = db.svr.db("WebGame").collection("Questions");
            let datas = await collection.aggregate([
                { $sample: { size: 1 } }
            ]);

            return await datas.next();
        } finally {}
    },
}