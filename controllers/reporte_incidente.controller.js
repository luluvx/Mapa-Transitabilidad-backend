const db = require("../models");
const { sendError500, isRequestValid } = require("../utils/request.utils");

exports.listReporteIncidente = async (req, res) => {
    try {
        const reportes = await db.reportes_incidentes.findAll();
        res.json(reportes);
    } catch (error) {
        sendError500(error, res);
    }
};

exports.getReporteIncidenteById = async (req, res) => {
    const id = req.params.id;
    try {
        const reporte = await getReporteIncidenteOr404(id, res);
        if (!reporte) {
            return;
        }
        res.json(reporte);
    } catch (error) {
        sendError500(error, res);
    }
};

exports.createReporteIncidente = async (req, res) => {
    const requiredFields = ['estado', 'comentarios', 'fechaSolicitud'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const reporte = {
            estado: req.body.estado,
            comentarios: req.body.comentarios,
            fechaSolicitud: req.body.fechaSolicitud
        };
        const reporteCreado = await db.reportes_incidentes.create(reporte);
        res.status(201).json(reporteCreado);
    } catch (error) {
        sendError500(error, res);
    }
};

exports.updateReporteIncidentePatch = async (req, res) => {
    const id = req.params.id;
    try {
        const reporte = await getReporteIncidenteOr404(id, res);
        if (!reporte) {
            return;
        }

        reporte.estado = req.body.estado || reporte.estado;
        reporte.comentarios = req.body.comentarios || reporte.comentarios;
        reporte.fechaSolicitud = req.body.fechaSolicitud || reporte.fechaSolicitud;

        await reporte.save();
        res.json(reporte);
    } catch (error) {
        sendError500(error, res);
    }
};

exports.updateReporteIncidentePut = async (req, res) => {
    const id = req.params.id;
    try {
        const reporte = await getReporteIncidenteOr404(id, res);
        if (!reporte) {
            return;
        }

        const requiredFields = ['estado', 'comentarios', 'fechaSolicitud'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }

        reporte.estado = req.body.estado;
        reporte.comentarios = req.body.comentarios;
        reporte.fechaSolicitud = req.body.fechaSolicitud;

        await reporte.save();
        res.json(reporte);
    } catch (error) {
        sendError500(error, res);
    }
};

exports.deleteReporteIncidente = async (req, res) => {
    const id = req.params.id;
    try {
        const reporte = await getReporteIncidenteOr404(id, res);
        if (!reporte) {
            return;
        }
        await reporte.destroy();
        res.json({
            msg: 'Reporte de incidente eliminado correctamente'
        });
    } catch (error) {
        sendError500(error, res);
    }
};

exports.uploadPictureReporte = async (req, res) => {
    const id = req.params.id;
    try {
        const reporte = await db.reportes_incidentes.findByPk(id);

        if (!reporte) {
            res.status(404).json({
                msg: 'reporte no encontrado'
            });
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha subido ninguna imagen'
            });
            return;
        }
        
        const file = req.files.photoReporte;
        const fileName = reporte.id + '.jpg';
        file.mv(`public/reportes/${fileName}`);
        await reporte.save();
        res.json(reporte);

    } catch (error) {
        sendError500(error);
    }
}

//patch cambiar estado
exports.updateEstadoReporteIncidente = async (req, res) => {
    const id = req.params.id;
    try {
        const reporte = await getReporteIncidenteOr404(id, res);
        if (!reporte) {
            return;
        }

        reporte.estado = req.body.estado || reporte.estado;

        await reporte.save();
        res.json(reporte);
    } catch (error) {
        sendError500(error, res);
    }
};


async function getReporteIncidenteOr404(id, res) {
    const reporte = await db.reportes_incidentes.findByPk(id);
    if (!reporte) {
        res.status(404).json({
            msg: 'Reporte de incidente no encontrado'
        });
        return;
    }
    return reporte;
}
