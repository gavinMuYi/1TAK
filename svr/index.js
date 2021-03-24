const express = require("express");
const tcb = require('@cloudbase/node-sdk');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 设置跨域
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', '3.2.1');
    res.header('Content-type', 'application/json;charset=utf-8');
    next();
});

const DBapp = tcb.init({
    secretId: "AKIDlIbqrUkCDz762q9KGG3cujM6cV9Yae6J",
    secretKey: "92ddeoJXWNypQlFUTDI7y533nFbeaHlz",
    env: "mini-lab-cloudbase-4dxr8e7b614a4",
    timeout: 5000
});
const pageDate = DBapp.database().collection("page_date_db");

console.log("数据库链接完成");
console.log("数据库初始化完成");

app.get('/getList', (req, res) => {
    pageDate.get().then(e => {
        res.status(200)
        res.json({
            code: 0,
            data: {
                records: e.data
            }
        })
    });
});

app.get('/getMeta', (req, res) => {
    pageDate
    .where({
        metaID: req.query.metaID
    })
    .get().then(e => {
        res.status(200)
        res.json({
            code: 0,
            data: {
                data: e.data[0]
            }
        })
    });
});

app.post('/saveMeta', function (req, res) {
    var body = '';
    Object.keys(req.body).forEach(key => {
        body = key;
    });
    body = JSON.parse(body);
    pageDate.add(body).then(e => {
        if (e.id) {
            res.status(200)
            res.json({
                code: 0
            })
        }
    })
});

const server = app.listen(8082, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('svr on 8082');
});
