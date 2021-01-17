"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (resq, resp) => {
    const query = `
    SELECT * FROM alumnos`;
    mysql_1.default.ejecutarQuery(query, (err, alumnos) => {
        if (err) {
            resp.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            resp.json({
                ok: true,
                alumnos: alumnos
            });
        }
    });
});
router.get('/heroes/:id', (resq, resp) => {
    const id = resq.params.id;
    //evitar que traegan algo diferente del id 
    const escapedId = mysql_1.default.instance.connection.escape(id);
    const query = `
    SELECT * FROM alumnos WHERE id = ${escapedId}`;
    mysql_1.default.ejecutarQuery(query, (err, alumnos) => {
        if (err) {
            resp.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            resp.json({
                ok: true,
                alumnos: alumnos[0]
            });
        }
    });
});
exports.default = router;
