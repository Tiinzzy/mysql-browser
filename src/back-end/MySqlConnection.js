const mysql = require('mysql2');

class MySqlConnectionImpl {
    #connection = null;
    #connectionInfo = {};

    async executeSql(params) {
        this.#open();

        let safeSql = params.sql;
        if (safeSql.trim().toLowerCase().startsWith("select")) {
            safeSql = 'select * from (\n' + safeSql + '\n) SAFE_TABLE_LOW_ROWS limit 1000';
        }

        return this.#execute(safeSql);
    }

    async getSqlTables(params) {
        this.#open();

        let sql = "select table_name from information_schema.tables where table_schema = '" + params.selected + "' and table_type = 'BASE TABLE'";
        return this.#execute(sql);
    }

    async selectAllSql(params) {
        this.#open();

        let safeSql = params.sql;
        if (safeSql.trim().toLowerCase().startsWith("select")) {
            safeSql = 'select * from (\n' + safeSql + '\n) SAFE_TABLE_LOW_ROWS limit 1000';
        }

        return this.#execute(safeSql);
    }

    async getSqlViews(params) {
        this.#open();
        let sql = "select table_name from information_schema.tables where table_schema = '" + params.selected + "' and table_type = 'VIEW'";
        return this.#execute(sql);
    }

    async connect(params) {
        this.#connectionInfo.host = params.host;
        this.#connectionInfo.user = params.user;
        this.#connectionInfo.password = params.password;
        this.#connectionInfo.selected = params.selected;

        this.#open();

        return this.#connection.promise()
            .query('select 1 as result from dual;')
            .then(([rows, fields]) => {
                return rows[0].result === 1;
            })
            .catch((error) => {
                return false;
            }).finally(() => {
                this.#connection.end();
            });
    }

    async #execute(sql) {
        return this.#connection.promise()
            .query(ignoreForbiddenCommands(sql))
            .then(([rows, fields]) => {
                return { eror: null, rows }
            })
            .catch((error) => {
                this.#connection.end();
                return { error: error.message, rows: [] };
            }).finally(() => {
                this.#connection.end();
            });
    }

    #open() {
        this.#connection = mysql.createConnection({
            host: this.#connectionInfo.host,
            user: this.#connectionInfo.user,
            password: this.#connectionInfo.password,
            database: this.#connectionInfo.selected
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

function ignoreForbiddenCommands(sql) {
    let cleanSql = sql.toLowerCase().trim();
    cleanSql = cleanSql.split(' ');
    if (cleanSql.length >= 1) {
        cleanSql = cleanSql[0];
        let allowed = ['select', 'show', 'display', 'create', 'insert', 'update'];
        if (allowed.indexOf(cleanSql) >= 0) {
            return sql;
        } else {
            return "select 'Sorry just queries starting with " + allowed.join(', ') + "!' as message from dual";
        }
    } else {
        return sql;
    }
}