const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;






db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
db.tokens = require("./auth_token.model.js")(sequelize, Sequelize);


db.municipios = require("./municipio.model.js")(sequelize, Sequelize);
db.carreteras = require("./carretera.model.js")(sequelize, Sequelize);
db.puntos = require("./punto.model.js")(sequelize, Sequelize);
db.incidentes = require("./incidente.model.js")(sequelize, Sequelize);
db.tipos_incidentes = require("./tipo_incidente.model.js")(sequelize, Sequelize);
db.reportes_incidentes = require("./reporte_incidente.model.js")(sequelize, Sequelize);
db.historiales = require("./historial.model.js")(sequelize, Sequelize);




db.municipios.hasMany(db.carreteras, {foreignKey: "municipioOrigenId", as: "carreterasOrigen" });
db.carreteras.belongsTo(db.municipios, {foreignKey: "municipioOrigenId", as: "municipioOrigen" });


db.municipios.hasMany(db.carreteras, {foreignKey: "municipioDestinoId", as: "carreterasDestino" });
db.carreteras.belongsTo(db.municipios, {foreignKey: "municipioDestinoId", as: "municipioDestino" });



db.carreteras.hasMany(db.puntos, {foreignKey:"carreteraId", as: "puntos" });
db.puntos.belongsTo(db.carreteras, {foreignKey:"carreteraId", as: "carretera"});


db.carreteras.hasMany(db.incidentes, {foreignKey:"carreteraId", as: "incidentes" });
db.incidentes.belongsTo(db.carreteras, {foreignKey:"carreteraId", as: "carretera"});


db.tipos_incidentes.hasMany(db.incidentes, {foreignKey:"tipoIncidenteId", as: "incidentes" });
db.incidentes.belongsTo(db.tipos_incidentes, {foreignKey:"tipoIncidenteId", as: "tipoIncidente"});


db.usuarios.hasMany(db.historiales, {foreignKey:"usuario_id", as: "historiales" });
db.historiales.belongsTo(db.usuarios, {foreignKey:"usuario_id", as: "usuario"});


db.usuarios.hasMany(db.tokens, { as: "tokens" });
db.tokens.belongsTo(db.usuarios, {
    foreignKey: "usuarioId",
    as: "usuario",
});


module.exports = db;