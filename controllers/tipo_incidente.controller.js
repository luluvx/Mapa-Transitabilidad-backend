const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listTipoIncidentes = async (req, res) => {
    try {
        const tipoIncidentes = await db.tipos_incidentes.findAll();
        res.json(tipoIncidentes);
    } catch (error) {
        sendError500(error);
    }
}

exports.getTipoIncidenteById = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoIncidente = await getTipoIncidenteOr404(id, res);
        if (!tipoIncidente) {
            return;
        }
        res.json(tipoIncidente);
    } catch (error) {
        sendError500(error);
    }
}

exports.createTipoIncidente = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const tipoIncidente = {
            nombre: req.body.nombre
        };
        const tipoIncidenteCreado = await db.tipos_incidentes.create(tipoIncidente);
        res.status(201).json(tipoIncidenteCreado);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateTipoIncidentePatch = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoIncidente = await getTipoIncidenteOr404(id, res);
        if (!tipoIncidente) {
            return;
        }
        tipoIncidente.nombre = req.body.nombre || tipoIncidente.nombre;
        await tipoIncidente.save();
        res.json(tipoIncidente);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateTipoIncidentePut = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoIncidente = await getTipoIncidenteOr404(id, res);
        if (!tipoIncidente) {
            return;
        }
        const requiredFields = ['nombre'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        tipoIncidente.nombre = req.body.nombre;
        await tipoIncidente.save();
        res.json(tipoIncidente);
    } catch (error) {
        sendError500(error);
    }
}

exports.deleteTipoIncidente = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoIncidente = await getTipoIncidenteOr404(id, res);
        if (!tipoIncidente) {
            return;
        }
        await tipoIncidente.destroy();
        res.json({
            msg: 'Tipo de incidente eliminado correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}

async function getTipoIncidenteOr404(id, res) {
    const tipoIncidente = await db.tipos_incidentes.findByPk(id);
    if (!tipoIncidente) {
        res.status(404).json({
            msg: 'Tipo de incidente no encontrado'
        });
        return;
    }
    return tipoIncidente;
}
