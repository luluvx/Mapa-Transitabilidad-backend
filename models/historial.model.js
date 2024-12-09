module.exports = (sequelize, Sequelize) => {
    const Historial = sequelize.define("historial", {
        modelo: {
            type: Sequelize.ENUM('carretera', 'municipio', 'incidente'),
            allowNull: false
        },
        modeloId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        accion: {
            type: Sequelize.ENUM('crear', 'editar', 'eliminar'),
            allowNull: false
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false
        },
        usuario_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Historial;
}

