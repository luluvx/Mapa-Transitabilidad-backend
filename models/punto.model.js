module.exports = (sequelize, Sequelize) => {
    const Punto = sequelize.define("punto", {
        latitud: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        longitud: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        orden: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Punto;
}