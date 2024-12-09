module.exports = (sequelize, Sequelize) => {
    const Incidente = sequelize.define("incidente", {
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        latitud: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        longitud: {
            type: Sequelize.FLOAT,
            allowNull: false
        }

    });
    return Incidente;
}