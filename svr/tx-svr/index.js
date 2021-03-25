const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const tcb = require('@cloudbase/node-sdk');

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

const DBapp = tcb.init({});
const pageDate = DBapp.database().collection("page_date_db");

app.get('/', (req, res) => {
    res.status(200)
    res.json({a:'222'})
});

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

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log('Hello world listening on port', port);
});
