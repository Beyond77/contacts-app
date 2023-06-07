const { getContactos, crearContacto, actualizarContacto, eliminarContacto } = require("../controllers/contacts");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { Router } = require("express");

const router = Router();

router.use( validarJWT );

router.get(
    "/",
     getContactos );

router.post(
    "/create",
    [  
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("number", "El número de teléfono es obligatorio y debe de tener 10 dígitos").isLength({ min: 10, max: 10 }),
        validarCampos
    ],
    crearContacto);

router.put(
    "/update/:id", 
    [  
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("number", "El número de teléfono es obligatorio y debe de tener 10 dígitos").isLength({ min: 10, max: 10 }),
        validarCampos
    ],
    actualizarContacto);

router.delete("/delete/:id", eliminarContacto);

module.exports = router;
