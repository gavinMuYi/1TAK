const express = require('express');
const app = express();
const tcb = require('@cloudbase/node-sdk');

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

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log('Hello world listening on port', port);
});
