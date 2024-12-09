const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");
const sha1 = require('sha1');

exports.listUsuarios = async (req, res) => {
    try {
        const usuarios = await db.usuarios.findAll();
        res.json(usuarios);
    } catch (error) {
        sendError500(error);
    }
}

exports.getUsuarioById = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await getUsuarioOr404(id, res);
        if (!usuario) {
            return;
        }
        res.json(usuario);
    } catch (error) {
        sendError500(error);
    }
}

exports.createUsuario = async (req, res) => {

    const requiredFields = ['email', 'password', 'tipo'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const email = req.body.email;
        const usuarioExistente = await db.usuarios.findOne({
            where: {
                email: email
            }
        });
        if (usuarioExistente) {
            res.status(400).json({
                msg: 'El email ya está registrado'
            });
            return;
        }
        const usuario = {
            email: req.body.email,
            password: sha1(req.body.password),
            tipo: req.body.tipo
        }
        const usuarioCreada = await db.usuarios.create(usuario);
        const usuarioRespuesta = await db.usuarios.findByPk(usuarioCreada.id);

        res.status(201).json(usuarioRespuesta);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateUsuarioPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await getUsuarioOr404(id, res);
        if (!usuario) {
            return;
        }
        const email = req.body.email;
        const usuarioExistente = await db.usuarios.findOne(
            {
                where: {
                    email: email
                }
            }
        );
        if (usuarioExistente && usuarioExistente.id !== usuario.id) {
            res.status(400).json({
                msg: 'El email ya está registrado'
            });
            return;
        }
        usuario.email = req.body.email || usuario.email;

        await usuario.save();
        res.json(usuario);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateUsuarioPut = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await getUsuarioOr404(id, res);
        if (!usuario) {
            return;
        }
        const requiredFields = ['email', 'tipo'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        const email = req.body.email;
        const usuarioExistente = await db.usuarios.findOne(
            {
                where: {
                    email: email
                }
            }
        );
        if (usuarioExistente && usuarioExistente.id !== usuario.id) {
            res.status(400).json({
                msg: 'El email ya está registrado'
            });
            return;
        }
        usuario.email = req.body.email;

        await usuario.save();

        res.json(usuario);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateContraseña = async (req, res) => {
    const id = req.params.id;
    const { password } = req.body;
    
    if (!password) {
        return res.status(400).json({ msg: 'La nueva contraseña es requerida' });
    }

    try {
        const usuario = await getUsuarioOr404(id, res);
        if (!usuario) {
            return;
        }

 
        usuario.password = sha1(password);

        await usuario.save();

        res.json({ msg: 'Contraseña actualizada correctamente' });
    } catch (error) {
        sendError500(error);
    }
}

exports.deleteUsuario = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await getUsuarioOr404(id, res);
        if (!usuario) {
            return;
        }
        await usuario.destroy();
        res.json({
            msg: 'Usuario eliminada correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}
async function getUsuarioOr404(id, res) {
    const usuario = await db.usuarios.findByPk(id);
    if (!usuario) {
        res.status(404).json({
            msg: 'Usuario no encontrado'
        });
        return;
    }
    return usuario;
}