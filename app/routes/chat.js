//Controlador y administrador de rutas
let router = require('express').Router();
let chatControlador = require('../controllers/chatController');

//GET
router.get('/', (req,res) =>{
    chatControlador.chat(req, res);
});

module.exports = router;