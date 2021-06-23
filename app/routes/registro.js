let router = require('express').Router();
let registroControlador = require('../controllers/registroController');
let session = require("express-session");

router.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
);

//GET
router.get("/", (req, res) => {
    registroControlador.index(req, res);
});

//POST


module.exports = router;