const { userRequiredMiddleware } = require("../middlewares/userRequiredMiddleware.js");
const { tipoUsuarioMiddleware } = require("../middlewares/tipoUsuarioMiddleware.js");


module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/incidente.controller.js");

    router.get('/', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.listIncidentes);
    router.get('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.getIncidenteById);
    router.post('/', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.createIncidente);
    router.put('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.updateIncidentePut);
    router.patch('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.updateIncidentePatch);
    router.delete('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.deleteIncidente);

    router.post('/:id/foto', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.uploadFotoIncidente);

    app.use('/incidentes', router);
};
