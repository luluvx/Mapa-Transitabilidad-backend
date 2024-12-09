const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listMunicipios = async (req, res) => {
    try {
        const municipios = await db.municipios.findAll({
            include: ['carreterasOrigen', 'carreterasDestino']
        });
        res.json(municipios);
    } catch (error) {
        sendError500(error);
    }
}

exports.getMunicipioById = async (req, res) => {
    const id = req.params.id;
    try {
        const municipio = await getMunicipioOr404(id, res);
        if (!municipio) {
            return;
        }
        res.json(municipio);
    } catch (error) {
        sendError500(error);
    }
}

exports.createMunicipio = async (req, res) => {
    const requiredFields = ['nombre', 'latitud', 'longitud'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const municipio = {
            nombre: req.body.nombre,
            latitud: req.body.latitud,
            longitud: req.body.longitud
        };
        const municipioCreado = await db.municipios.create(municipio);
        res.status(201).json(municipioCreado);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateMunicipioPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const municipio = await getMunicipioOr404(id, res);
        if (!municipio) {
            return;
        }
        municipio.nombre = req.body.nombre || municipio.nombre;
        municipio.latitud = req.body.latitud || municipio.latitud;
        municipio.longitud = req.body.longitud || municipio.longitud;

        await municipio.save();
        res.json(municipio);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateMunicipioPut = async (req, res) => {
    const id = req.params.id;
    try {
        const municipio = await getMunicipioOr404(id, res);
        if (!municipio) {
            return;
        }
        const requiredFields = ['nombre', 'latitud', 'longitud'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        municipio.nombre = req.body.nombre;
        municipio.latitud = req.body.latitud;
        municipio.longitud = req.body.longitud;

        await municipio.save();
        res.json(municipio);
    } catch (error) {
        sendError500(error);
    }
}

exports.deleteMunicipio = async (req, res) => {
    const id = req.params.id;
    try {
        const municipio = await getMunicipioOr404(id, res);
        if (!municipio) {
            return;
        }
        await municipio.destroy();
        res.json({
            msg: 'Municipio eliminado correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}

async function getMunicipioOr404(id, res) {
    const municipio = await db.municipios.findByPk(id, {
        include: ['carreterasOrigen', 'carreterasDestino'] // Incluir las relaciones con las carreteras
    });
    if (!municipio) {
        res.status(404).json({
            msg: 'Municipio no encontrado'
        });
        return;
    }
    return municipio;
}
