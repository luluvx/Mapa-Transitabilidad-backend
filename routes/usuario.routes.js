const { userRequiredMiddleware } = require("../middlewares/userRequiredMiddleware.js");
const { tipoUsuarioMiddleware } = require("../middlewares/tipoUsuarioMiddleware.js");
module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/usuario.controller.js");



    router.get('/', userRequiredMiddleware, tipoUsuarioMiddleware('administrador'), controller.listUsuarios);
    router.get('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.getUsuarioById);
    router.post('/', userRequiredMiddleware, tipoUsuarioMiddleware('administrador'), controller.createUsuario);
    router.put('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador'), controller.updateUsuarioPut);
    router.patch('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador'), controller.updateUsuarioPatch);
    router.delete('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador'), controller.deleteUsuario);

    router.put('/:id/password', userRequiredMiddleware, tipoUsuarioMiddleware('administrador'), controller.updateContraseña);

    app.use('/usuarios', router);

};