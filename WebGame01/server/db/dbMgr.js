const { MongoClient } = require('mongodb');

const db = {
    DB_URI: `mongodb+srv://gin:PUFcZUenas4EmRz5@cluster0.yzruq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
}

var dbClient = new MongoClient(db.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.svr = dbClient

db.svr.connect2DB = function() {
    return this.connect();
}

db.svr.closeDB = function() {
    return this.close();
}

module.exports = db;