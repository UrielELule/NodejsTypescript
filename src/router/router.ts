import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (resq: Request, resp: Response) => {

    const query = `
    SELECT * FROM alumnos`;

        MySQL.ejecutarQuery(query, ( err: any, alumnos: Object[] ) => {
            if (err) {
                resp.status(400).json({
                    ok: false,
                    error: err
                });
            } else {
                resp.json({
                    ok: true,
                    alumnos: alumnos
                });
            }
        });

});

router.get('/heroes/:id', (resq: Request, resp: Response) => {

    const id = resq.params.id;
    //evitar que traegan algo diferente del id 
    const escapedId = MySQL.instance.connection.escape(id);

    const query = `
    SELECT * FROM alumnos WHERE id = ${ escapedId }`;

        MySQL.ejecutarQuery(query, ( err: any, alumnos: Object[] ) => {
            if (err) {
                resp.status(400).json({
                    ok: false,
                    error: err
                });
            } else {
                resp.json({
                    ok: true,
                    alumnos: alumnos[0]
                });
            }
        });
    
});


export default router;