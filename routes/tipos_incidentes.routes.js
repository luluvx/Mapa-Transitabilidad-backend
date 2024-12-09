const { userRequiredMiddleware } = require("../middlewares/userRequiredMiddleware.js");
const { tipoUsuarioMiddleware } = require("../middlewares/tipoUsuarioMiddleware.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/tipo_incidente.controller.js");

    router.get('/', controller.listTipoIncidentes);
    router.get('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.getTipoIncidenteById);
    router.post('/', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.createTipoIncidente);
    router.put('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.updateTipoIncidentePut);
    router.patch('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.updateTipoIncidentePatch);
    router.delete('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.deleteTipoIncidente);

    app.use('/tiposIncidentes', router);
}