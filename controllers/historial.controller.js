const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");


exports.listHistorial = async (req, res) => {
    try {
        const historial = await db.historiales.findAll({
            include: ['usuario']
        });
        res.json(historial);
    } catch (error) {
        sendError500(error);
    }
}


exports.getHistorialById = async (req, res) => {
    const id = req.params.id;
    try {
        const historial = await getHistorialOr404(id, res);
        if (!historial) {
            return;
        }
        res.json(historial);
    } catch (error) {
        sendError500(error);
    }
}

exports.createHistorial = async (req, res) => {
    const requiredFields = ['modelo', 'modeloId', 'accion', 'fecha', 'usuario_id'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const historial = {
            modelo: req.body.modelo,
            modeloId: req.body.modeloId,
            accion: req.body.accion,
            fecha: req.body.fecha,
            usuario_id: req.body.usuario_id
        };
        const historialCreado = await db.historiales.create(historial);
        res.status(201).json(historialCreado);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateHistorialPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const historial = await getHistorialOr404(id, res);
        if (!historial) {
            return;
        }

        historial.modelo = req.body.modelo || historial.modelo;
        historial.modeloId = req.body.modeloId || historial.modeloId;
        historial.accion = req.body.accion || historial.accion;
        historial.fecha = req.body.fecha || historial.fecha;
        historial.usuario_id = req.body.usuario_id || historial.usuario_id;

        await historial.save();
        res.json(historial);
    } catch (error) {
        sendError500(error);
    }
}


exports.updateHistorialPut = async (req, res) => {
    const id = req.params.id;
    try {
        const historial = await getHistorialOr404(id, res);
        if (!historial) {
            return;
        }
        const requiredFields = ['modelo', 'modeloId', 'accion', 'fecha', 'usuario_id'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }

        historial.modelo = req.body.modelo;
        historial.modeloId = req.body.modeloId;
        historial.accion = req.body.accion;
        historial.fecha = req.body.fecha;
        historial.usuario_id = req.body.usuario_id;

        await historial.save();
        res.json(historial);
    } catch (error) {
        sendError500(error);
    }
}


exports.deleteHistorial = async (req, res) => {
    const id = req.params.id;
    try {
        const historial = await getHistorialOr404(id, res);
        if (!historial) {
            return;
        }
        await historial.destroy();
        res.json({
            msg: 'Historial eliminado correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}

async function getHistorialOr404(id, res) {
    const historial = await db.historiales.findByPk(id, {
        include: ['usuario']
    });
    if (!historial) {
        res.status(404).json({
            msg: 'Historial no encontrado'
        });
        return;
    }
    return historial;
}
