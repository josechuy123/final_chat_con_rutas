let router = require('express').Router();

//Requerimos las rutas de los archivos
let chat = require('./chat');
let login = require('./login');
let registro = require('./registro');

let session = require("express-session");

router.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
);

//usamos las rutas
router.use('/', login);
router.use('/registro',registro);
router.use('/chat', chat);

module.exports = router;