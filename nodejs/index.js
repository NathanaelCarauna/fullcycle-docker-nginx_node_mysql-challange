const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

app.get('/', async (req, res) => {
    try {
        const connection = mysql.createConnection(config);
        await connection.connect();

        // Consulta SQL de inserção
        const insertSql = "INSERT INTO people (name) VALUES ('Nathanael')";
        await executeQuery(insertSql, connection);

        // Consulta SQL de seleção
        const selectSql = 'SELECT * FROM people';
        const result = await executeQuery(selectSql, connection);

        const renderResult = result.map(item => `<li>${item.id} - ${item.name}</li>`);
        let response = `<h1>Full Cycle Rocks!</h1><ul>${renderResult.join('')}</ul>`;
        res.send(response);
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.listen(port, () => {
    console.log('Rodando na porta: ' + port);
});

async function executeQuery(sql, connection) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}