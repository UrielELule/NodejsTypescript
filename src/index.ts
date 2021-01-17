import MySQL from './mysql/mysql';
import router from './router/router';
import Server from './server/server';

const server = Server.init(3000);
server.app.use(router);

    //mysql instance
//MySQL.instance;



server.start( () => {

    console.log('Servidor corriendo en puerto 3000');

});