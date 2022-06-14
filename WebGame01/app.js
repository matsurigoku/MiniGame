const express = require("express");
const path = require('path');
const db = require("./server/db/dbMgr");
const tool = require("./server/utils/tool");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

tool.readDirAll(path.resolve("server/router"), (file) => {
    if (file.endsWith(".js")) {
        const route = require(file);

        if (route.path && route.method) {
            app[route.method](route.path, route.execute);
        }
    }
})

console.log("資料庫連接中...")
db.svr.connect2DB().then(res => {
    console.log("伺服器啟動中...")
    app.listen(process.env.PORT || 8080, () => {
        console.log("服務啟動完成!")
    });
})