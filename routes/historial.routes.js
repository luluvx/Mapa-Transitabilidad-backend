const { userRequiredMiddleware } = require("../middlewares/userRequiredMiddleware.js");
const { tipoUsuarioMiddleware } = require("../middlewares/tipoUsuarioMiddleware.js");


module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/historial.controller.js");

    router.get('/', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.listHistorial);
    router.get('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.getHistorialById);
    router.post('/', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.createHistorial);
    router.put('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.updateHistorialPut);
    router.patch('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.updateHistorialPatch);
    router.delete('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.deleteHistorial);

    app.use('/historiales', router);
    
};