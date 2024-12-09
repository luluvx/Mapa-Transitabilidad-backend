const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {

        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        tipo:{
            type: Sequelize.ENUM('administrador', 'verificador'),
            allowNull: false,
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
    });
    return Usuario;
}
