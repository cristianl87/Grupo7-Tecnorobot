//controlador de currencies


const db = require('../src/database/models')
const sequelize = db.sequelize;
const Op= db.Sequelize.op

const currenciesController= {
    add: function(req,res){

        res.render('createCurrencies')
    },

create: function (req,res) {
        db.Currency.create(
            {
                name: req.body.name,
                symbol: req.body.symbol,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt
             
            }
        )
       res.redirect('/listadoCurrencies')
    },

listar: function(req, res){
    db.Currency.findAll()
    
.then(function(currencies){
    res.render("listadoCurrencies",{currencies})
})
},

edit: function(req,res){
    db.Currency.findByPk(req.params.id)
    .then (function(currency){
        res.render('editarCurrencies', 
        {currency:currency})
    })
},
update: function(req, res){
    db.Currency.update({
                name: req.body.name,
                symbol: req.body.symbol,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt
    },{
        where:{id: req.params.id}
    })
res.redirect('/currencies/edit/' + req.params.id)
},

delete: function(req,res){
db.Currency.destroy({
    where: {
        id:req.params.id
    }
})
res.redirect('/listadoCurrencies')
}


}

module.exports = currenciesController