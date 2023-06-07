/*
    Rutas de usuarios
    host + /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, loginUsuario, revalidarUsuario } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
    "/new",
    [
        check( "name", "El nombre es obligatorio" ).not().isEmpty(),
        check( "email", "El email es obligatorio" ).isEmail(),
        check( "password", "El password es obligatorio" ).isLength({ min: 6 }),
        validarCampos

    ],
    crearUsuario
);

router.post(
    "/",
    [
        check( "email", "El email es obligatorio" ).isEmail(),
        check( "password", "El password es obligatorio" ).isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);

router.post("/renew", validarJWT ,revalidarUsuario);

module.exports = router;