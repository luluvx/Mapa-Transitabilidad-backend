const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listIncidentes = async (req, res) => {
    try {
        const incidentes = await db.incidentes.findAll({
            include: ['carretera', 'tipoIncidente']
        });
        res.json(incidentes);
    } catch (error) {
        sendError500(error);
    }
}

exports.getIncidenteById = async (req, res) => {
    const id = req.params.id;
    try {
        const incidente = await getIncidenteOr404(id, res);
        if (!incidente) {
            return;
        }
        res.json(incidente);
    } catch (error) {
        sendError500(error);
    }
}

exports.createIncidente = async (req, res) => {
    const requiredFields = ['descripcion', 'latitud', 'longitud', 'carreteraId', 'tipoIncidenteId'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const incidente = {
            descripcion: req.body.descripcion,
            latitud: req.body.latitud,
            longitud: req.body.longitud,
            carreteraId: req.body.carreteraId,
            tipoIncidenteId: req.body.tipoIncidenteId
        };
        const incidenteCreado = await db.incidentes.create(incidente);
        res.status(201).json(incidenteCreado);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateIncidentePatch = async (req, res) => {
    const id = req.params.id;
    try {
        const incidente = await getIncidenteOr404(id, res);
        if (!incidente) {
            return;
        }
        incidente.descripcion = req.body.descripcion || incidente.descripcion;
        incidente.latitud = req.body.latitud || incidente.latitud;
        incidente.longitud = req.body.longitud || incidente.longitud;
        incidente.carreteraId = req.body.carreteraId || incidente.carreteraId;
        incidente.tipoIncidenteId = req.body.tipoIncidenteId || incidente.tipoIncidenteId;

        await incidente.save();
        res.json(incidente);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateIncidentePut = async (req, res) => {
    const id = req.params.id;
    try {
        const incidente = await getIncidenteOr404(id, res);
        if (!incidente) {
            return;
        }
        const requiredFields = ['descripcion', 'latitud', 'longitud', 'carreteraId', 'tipoIncidenteId'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        incidente.descripcion = req.body.descripcion;
        incidente.latitud = req.body.latitud;
        incidente.longitud = req.body.longitud;
        incidente.carreteraId = req.body.carreteraId;
        incidente.tipoIncidenteId = req.body.tipoIncidenteId;

        await incidente.save();
        res.json(incidente);
    } catch (error) {
        sendError500(error);
    }
}

exports.uploadFotoIncidente = async (req, res) => {
    const incidenteId = req.params.id;

    try {
        const incidente = await db.incidentes.findByPk(incidenteId);

        if (!incidente) {
            return res.status(404).json({
                msg: 'Incidente no encontrado'
            });
        }


        if (!req.files || !req.files.fotoIncidente) {
            return res.status(400).json({
                msg: 'No se ha subido ninguna imagen'
            });
        }

        const foto = req.files.fotoIncidente;
        const fileName = incidenteId + '.jpg';


        foto.mv(`public/incidentes/${fileName}`, (err) => {
            if (err) {
                return res.status(500).json({
                    msg: 'Error al subir la imagen',
                    error: err.message
                });
            }

            return res.json({
                msg: 'Foto subida correctamente',
                incidenteId: incidente.id,
                fileName: fileName  
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error en el servidor',
            error: error.message
        });
    }
};
exports.deleteIncidente = async (req, res) => {
    const id = req.params.id;
    try {
        const incidente = await getIncidenteOr404(id, res);
        if (!incidente) {
            return;
        }
        await incidente.destroy();
        res.json({
            msg: 'Incidente eliminado correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}

async function getIncidenteOr404(id, res) {
    const incidente = await db.incidentes.findByPk(id, {
        include: ['carretera', 'tipoIncidente']
    });
    if (!incidente) {
        res.status(404).json({
            msg: 'Incidente no encontrado'
        });
        return;
    }
    return incidente;
}
