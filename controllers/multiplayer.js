const express = require('express')

const multiplayerRouter = express.Router();

multiplayerRouter.get('/', (req, res) => {
    res.render('multiplayerViews/multiplayerInstance')
})

module.exports = {
    multiplayerRouter
}