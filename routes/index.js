module.exports = app => {
    require('./usuario.routes')(app);
    //require('./mascota.routes')(app);
    require('./auth.routes')(app);
    require('./carretera.routes')(app);
    require('./incidente.routes')(app);
    require('./municipio.routes')(app);
    require('./reportes_incidentes.routes')(app);
    require('./tipos_incidentes.routes')(app);
    require('./punto.routes')(app);
}