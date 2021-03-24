const express = require("express");

const app = express();
// 设置跨域
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', '3.2.1')
    res.header('Content-type', 'application/json;charset=utf-8')
    next()
})

const res1 = [{
    data:213,
    num:444,
    age:12
}, {
    data:456,
    num:678,
    age:13
}]

app.get('/getTest1', (req, res) => {
    res.status(200)
    res.json(res1)
})

const server = app.listen(8082, () => {
    const host = server.address().address
    const port = server.address().port
});