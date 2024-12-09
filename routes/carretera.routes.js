const { userRequiredMiddleware } = require("../middlewares/userRequiredMiddleware.js");
const { tipoUsuarioMiddleware } = require("../middlewares/tipoUsuarioMiddleware.js");
const controller = require("../controllers/carretera.controller.js");

module.exports = app => {
    let router = require("express").Router();

    router.get('/', controller.listCarreteras);
    router.get('/:id', controller.getCarreteraById);
    router.post('/', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.createCarretera);
    router.put('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.updateCarreteraPut);
    router.patch('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.updateCarreteraPatch);

    router.delete('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.deleteCarretera);

    router.get('/:id/puntos', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.getPuntosByCarreteraId);
    router.delete('/:id/puntos', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.deletePuntosByCarreteraId);

    app.use('/carreteras', router);
};
