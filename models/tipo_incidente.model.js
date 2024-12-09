module.exports = (sequelize, Sequelize) => {
    const TipoIncidente = sequelize.define("tipoIncidente", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return TipoIncidente;
}