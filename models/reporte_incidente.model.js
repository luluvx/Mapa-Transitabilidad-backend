module.exports = (sequelize, Sequelize) => {
    const ReporteIncidente = sequelize.define("reporteIncidente", {
        estado:{
            type: Sequelize.ENUM('pendiente', 'aprobado', 'rechazado'),
            allowNull: false
        },
        comentarios:{
            type: Sequelize.STRING,
            allowNull: false
        },
        fechaSolicitud:{
            type: Sequelize.DATE,
            allowNull: false
        },
    });
    return ReporteIncidente;
}