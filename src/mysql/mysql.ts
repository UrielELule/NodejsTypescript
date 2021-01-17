import mysql = require('mysql');

export default class MySQL{

    //patron singleton
    private static _instance: MySQL;

    connection: mysql.Connection;

    conectado: boolean = false;

    constructor() {
        console.log('Clase Inicializada');

        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '9526',
            database: 'vencedor'
        });
        this.conectarDB();
    }

    public static get instance() {
        return this._instance  || ( this._instance = new this() );
    }

    static ejecutarQuery( query: string, callback: Function ) {
        this.instance.connection.query(query, (err, results: Object[], fields) => {
            //si no encuentra el query
            if(err) {

                console.log('Error en query');
                console.log(err);
                return callback( err ); 
            }
            //si el query no tiene resultados
            if(results.length === 0) {
                callback('El registro no existe');
            } else {
                callback( null, results);
            }

           

        });
    }


    private conectarDB(){
        this.connection.connect((err: mysql.MysqlError) =>{
            if(err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos en linea');
        });
    }

}