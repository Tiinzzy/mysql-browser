const express = require('express');
const app = express();

const MySqlConnection = require('./MySqlConnection');
const connection = MySqlConnection.INSTANCE();

app.get('/connection-is-ok', async function (req, res) {
    let isOK = await connection.connect(req.query)
    res.send({ isOK })
})

app.get('/execute-sql', async function (req, res) {
    try {
        let result = await connection.executeSql(req.query);
        res.send(result);
    } catch (error) {
        res.send({ error: error.message, row: [] });
    }
})

app.get('/get-sql-tables', async function (req, res) {
    try {
        let result = await connection.getSqlTables(req.query);
        res.send(result);
    } catch (error) {
        res.send({ error: error.message, row: [] });
    }
})

app.get('/select-all-from-sql-table', async function (req, res) {
    try {
        let result = await connection.selectAllSql(req.query);
        res.send(result);
    } catch (error) {
        res.send({ error: error.message, row: [] });
    }
})

app.get('/get-sql-views', async function (req, res) {
    try {
        let result = await connection.getSqlViews(req.query);
        res.send(result);
    } catch (error) {
        res.send({ error: error.message, row: [] });
    }
})

app.listen(8888)