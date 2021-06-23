let router = require('express').Router();
let loginControlador = require('../controllers/loginController');
let session = require("express-session");

router.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
);

//GET
router.get('/', (req, res) => {
    loginControlador.index(req, res);
});

router.get('/home', (req, res) => {
    loginControlador.home(req, res);
})

//POST
router.post('/auth', (req, res) => {
    loginControlador.auth(req, res);
})

router.post('/register', (req, res) => {
    loginControlador.registrar(req, res);
})

module.exports = router;