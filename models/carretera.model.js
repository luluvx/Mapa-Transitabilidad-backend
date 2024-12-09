module.exports = (sequelize, Sequelize) => {
    const Carretera = sequelize.define("carretera", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        estado: {
            type: Sequelize.ENUM('transitable', 'bloqueado'),
            allowNull: false
        },
        razonBloqueo: {
            type: Sequelize.STRING
        },
    });
    return Carretera;
}