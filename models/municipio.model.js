module.exports = (sequelize, Sequelize) => {
    const Mascota = sequelize.define("municipio", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
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
    return Mascota;
}
