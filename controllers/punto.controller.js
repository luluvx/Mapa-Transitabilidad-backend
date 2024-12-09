const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listPuntos = async (req, res) => {
    try {
        const puntos = await db.puntos.findAll();
        res.json(puntos);
    } catch (error) {
        sendError500(error);
    }
}

exports.getPuntoById = async (req, res) => {
    const id = req.params.id;
    try {
        const punto = await getPuntoOr404(id, res);
        if (!punto) {
            return;
        }
        res.json(punto);
    } catch (error) {
        sendError500(error);
    }
}

exports.createPunto = async (req, res) => {
    const requiredFields = ['latitud', 'longitud', 'orden', 'carreteraId'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const punto = {
            latitud: req.body.latitud,
            longitud: req.body.longitud,
            orden: req.body.orden,
            carreteraId: req.body.carreteraId
        };
        const puntoCreado = await db.puntos.create(punto);
        res.status(201).json(puntoCreado);
    } catch (error) {
        sendError500(error);
    }
}

const getPuntosByCarreteraId = async (carreteraId) => {
    return await db.puntos.findAll({
        where: {
            carreteraId: carreteraId
        }
    });
}

exports.updatePuntoPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const punto = await getPuntoOr404(id, res);
        if (!punto) {
            return;
        }
        punto.latitud = req.body.latitud || punto.latitud;
        punto.longitud = req.body.longitud || punto.longitud;
        punto.orden = req.body.orden || punto.orden;

        await punto.save();
        res.json(punto);
    } catch (error) {
        sendError500(error);
    }
}

exports.updatePuntoPut = async (req, res) => {
    const id = req.params.id;
    try {
        const punto = await getPuntoOr404(id, res);
        if (!punto) {
            return;
        }
        const requiredFields = ['latitud', 'longitud', 'orden', 'carreteraId'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        punto.latitud = req.body.latitud;
        punto.longitud = req.body.longitud;
        punto.orden = req.body.orden;
        punto.carreteraId = req.body.carreteraId;

        await punto.save();
        res.json(punto);
    } catch (error) {
        sendError500(error);
    }
}

exports.deletePunto = async (req, res) => {
    const id = req.params.id;
    try {
        const punto = await getPuntoOr404(id, res);
        if (!punto) {
            return;
        }
        await punto.destroy();
        res.json({
            msg: 'Punto eliminado correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}

async function getPuntoOr404(id, res) {
    const punto = await db.puntos.findByPk(id, {
        include: ['carretera']
    });
    if (!punto) {
        res.status(404).json({
            msg: 'Punto no encontrado'
        });
        return;
    }
    return punto;
}
