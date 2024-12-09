const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listCarreteras = async (req, res) => {
    try {
        const carreteras = await db.carreteras.findAll({
            include: ['municipioOrigen', 'municipioDestino', 'puntos', 'incidentes']
        });
        res.json(carreteras);
    } catch (error) {
        sendError500(error);
    }
}

exports.getCarreteraById = async (req, res) => {
    const id = req.params.id;
    try {
        const carretera = await getCarreteraOr404(id, res);
        if (!carretera) {
            return;
        }
        res.json(carretera);
    } catch (error) {
        sendError500(error);
    }
}

exports.getPuntosByCarreteraId = async (req, res) => {
    const id = req.params.id;
    try {
        const carretera = await getCarreteraOr404(id, res);
        if (!carretera) {
            return;
        }
        const puntos = await db.puntos.findAll({
            where: {
                carreteraId: id
            }
        });
        res.json(puntos);
    } catch (error) {
        sendError500(error);
    }
}

exports.deletePuntosByCarreteraId = async (req, res) => {
    const id = req.params.id;
    try {
        const carretera = await getCarreteraOr404(id, res);
        if (!carretera) {
            return;
        }
        await db.puntos.destroy({
            where: {
                carreteraId: id
            }
        });
        res.json({
            msg: 'Puntos eliminados correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}

exports.createCarretera = async (req, res) => {
    const requiredFields = ['nombre', 'estado', 'municipioOrigenId', 'municipioDestinoId'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const carretera = {
            nombre: req.body.nombre,
            estado: req.body.estado,
            razonBloqueo: req.body.razonBloqueo || null,
            municipioOrigenId: req.body.municipioOrigenId,
            municipioDestinoId: req.body.municipioDestinoId
        };
        const carreteraCreada = await db.carreteras.create(carretera);
        res.status(201).json(carreteraCreada);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateCarreteraPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const carretera = await getCarreteraOr404(id, res);
        if (!carretera) {
            return;
        }
        carretera.nombre = req.body.nombre || carretera.nombre;
        carretera.estado = req.body.estado || carretera.estado;
        carretera.razonBloqueo = req.body.razonBloqueo || carretera.razonBloqueo;

        await carretera.save();
        res.json(carretera);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateCarreteraPut = async (req, res) => {
    const id = req.params.id;
    try {
        const carretera = await getCarreteraOr404(id, res);
        if (!carretera) {
            return;
        }
        const requiredFields = ['nombre', 'estado', 'municipioOrigenId', 'municipioDestinoId'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        carretera.nombre = req.body.nombre;
        carretera.estado = req.body.estado;
        carretera.razonBloqueo = req.body.razonBloqueo || carretera.razonBloqueo;

        await carretera.save();
        res.json(carretera);
    } catch (error) {
        sendError500(error);
    }
}

exports.deleteCarretera = async (req, res) => {
    const id = req.params.id;
    try {
        const carretera = await getCarreteraOr404(id, res);
        if (!carretera) {
            return;
        }
        await carretera.destroy();
        res.json({
            msg: 'Carretera eliminada correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}

async function getCarreteraOr404(id, res) {
    const carretera = await db.carreteras.findByPk(id, {
        include: ['municipioOrigen', 'municipioDestino', 'puntos', 'incidentes']
    });
    if (!carretera) {
        res.status(404).json({
            msg: 'Carretera no encontrada'
        });
        return;
    }
    return carretera;
}
