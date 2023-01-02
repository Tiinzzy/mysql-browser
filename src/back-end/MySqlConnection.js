const mysql = require('mysql2');

class MySqlConnectionImpl {
    #connection = null;

    async connect(params) {
        if (this.#connection !== null) {
            this.#connection.end();
        }

        this.#connection = mysql.createConnection({
            host: params.host,
            user: params.user,
            password: params.password,
            database: params.database
        });

        return this.#connection.promise()
            .query('select 1 as result from dual;')
            .then(([rows, fields]) => {
                return rows[0].result === 1;
            })
            .catch((error) => {
                console.log(error);
                this.#connection.end();
                this.#connection = null;
                return false;
            });
    }

    close() {
        this.#connection.end();
    }
}

module.exports = class MySqlConnection {
    static #database = null;

    static INSTANCE() {
        if (MySqlConnection.#database === null) {
            MySqlConnection.#database = new MySqlConnectionImpl();
        }
        return MySqlConnection.#database;
    }
}