const express = require('express');
const app = express();

const MySqlConnection = require('./MySqlConnection');
const connection = MySqlConnection.INSTANCE();

app.listen(8888)

app.get('/connection-is-ok', async function (req, res) {
    let isOK = await connection.connect(req.query)
    res.send({isOK})
})

