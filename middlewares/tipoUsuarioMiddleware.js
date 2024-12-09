
exports.tipoUsuarioMiddleware = (...allowedTipos) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!allowedTipos.includes(req.user.tipo)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
}
