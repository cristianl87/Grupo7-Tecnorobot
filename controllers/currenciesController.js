//controlador de currencies


const db = require('../src/database/models')
const sequelize = db.sequelize;
const Op = db.Sequelize.op

const currenciesController = {
    add: function (req, res) {

        res.render('listadoCurrencies')
    },

    create: async function (req, res) {
        try {
            await db.Currency.create(
                {
                    name: req.body.name,
                    symbol: req.body.symbol,

                }
            )
            res.redirect('/listadoCurrencies');
        } catch (error) {
            return res.send(error)
        }

    },

    listar: async function (req, res) {
        try {
            const currenciesListar = await db.Currency.findAll()

            res.render("listadoCurrencies", { currencies: currenciesListar })
        }
        catch (error) {
            console.log(error)
        }
    },

    edit: async function (req, res) {
        const currenciesEdit = await db.Currency.findByPk(req.params.id)

        res.render('editarCurrencies',
            { currency: currenciesEdit })

    },
    update: async function (req, res) {
        const currenciesUpdate = await db.Currency.update({
            name: req.body.name,
            symbol: req.body.symbol,

        }, {
            where: { id: req.params.id }
        })
        res.redirect('/listadoCurrencies/')
    },

    delete: async function (req, res) {
        const currenciesDelete = await db.Currency.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/listadoCurrencies')
    }


}

module.exports = currenciesController