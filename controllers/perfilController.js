const User = require('../models/User');

const perfilController={
    perfil: (req, res) => {
        res.render('./users/perfil')
    },
    edit: (req, res) => {
        User.edit(req.body, req.file, req.session.userLogueado.email)
        res.redirect('/perfil')
    }
}
module.exports=perfilController
