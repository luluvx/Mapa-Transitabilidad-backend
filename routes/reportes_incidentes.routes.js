const { userRequiredMiddleware } = require("../middlewares/userRequiredMiddleware.js");
const { tipoUsuarioMiddleware } = require("../middlewares/tipoUsuarioMiddleware.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/reporte_incidente.controller.js");


    router.get('/', 
        userRequiredMiddleware, 
        tipoUsuarioMiddleware('administrador', 'verificador'), 
        controller.listReporteIncidente
    );


    router.get('/:id', 
        userRequiredMiddleware, 
        tipoUsuarioMiddleware('administrador', 'verificador'), 
        controller.getReporteIncidenteById
    );


    router.post('/', 
        controller.createReporteIncidente
    );


    router.put('/:id', 
        userRequiredMiddleware, 
        tipoUsuarioMiddleware('administrador'), 
        controller.updateReporteIncidentePut
    );

    router.patch('/:id', 
        userRequiredMiddleware, 
        tipoUsuarioMiddleware('administrador'), 
        controller.updateReporteIncidentePatch
    );


    router.delete('/:id', 
        userRequiredMiddleware, 
        tipoUsuarioMiddleware('administrador'), 
        controller.deleteReporteIncidente
    );

    router.post('/:id/foto',
        controller.uploadPictureReporte
    )





    app.use('/reporteIncidente', router);
};
