const { userRequiredMiddleware } = require("../middlewares/userRequiredMiddleware.js");
const { tipoUsuarioMiddleware } = require("../middlewares/tipoUsuarioMiddleware.js");


module.exports = app => {
    let router = require("express").Router();
    const controller =
    require("../controllers/municipio.controller.js");

    router.get('/', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.listMunicipios);
    router.get('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.getMunicipioById);
    router.post('/', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.createMunicipio);
    router.put('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.updateMunicipioPut);
    router.patch('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.updateMunicipioPatch);
    router.delete('/:id', userRequiredMiddleware, tipoUsuarioMiddleware('administrador', 'verificador'), controller.deleteMunicipio);

    app.use('/municipios', router);
};
