const User = require('../models/User');

const perfilController={
    perfil: (req, res) => {
        res.render('./users/perfil')
    },
    edit: (req, res) => {
        User.edit(req)
        res.redirect('/perfil')
    }
}
module.exports=perfilController
