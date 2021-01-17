"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase Inicializada');
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '9526',
            database: 'vencedor'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.connection.query(query, (err, results, fields) => {
            //si no encuentra el query
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            //si el query no tiene resultados
            if (results.length === 0) {
                callback('El registro no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos en linea');
        });
    }
}
exports.default = MySQL;
