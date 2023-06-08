const { response } = require("express");
const Contacto = require("../models/Contacto");
const Usuario = require("../models/Usuario");

const getContactos = async ( req, res = response ) => {

    const usuario = await Usuario.findById(req.uid);

    const contactos = await Contacto.find({user: usuario._id});

    return res.status(200).json({
        ok: true,
        contactos: contactos
    })
}

const crearContacto = async ( req, res = response ) => {

    const contacto = new Contacto( req.body );

    try {

        contacto.user = req.uid;

        const contactoGuardado = await contacto.save();

        res.json({
            ok: true,
            contacto: contactoGuardado
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}

const actualizarContacto = async ( req, res = response ) => {

    const contactoId = req.params.id;

    try {

        const contacto = await Contacto.findById(contactoId);
        const uid = req.uid;

        if(!contacto){
            res.status(404).json({
                ok: false,
                msg: "El contacto no existe"
            })
        }

        if(contacto.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene prilegio de editar este contacto"
            })
        }

        const nuevoContacto = {
            ...req.body,
            user: uid
        }

        const contactoActualizado = await Contacto.findByIdAndUpdate( contactoId, nuevoContacto, { new: true } );

        res.status(200).json({
            ok: true,
            contactoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}

const eliminarContacto = async ( req, res = response ) => {

    const contactoId = req.params.id

    try {
        const contacto = await Contacto.findById(contactoId);
        const uid = req.uid;

        if(!contacto){
            res.status(404).json({
                ok: false,
                msg: "El contacto no existe"
            })
        }

        if(contacto.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene prilegio de eliminar este contacto"
            })
        }

        await Contacto.findByIdAndDelete( contactoId );


        return res.status(200).json({
            ok: true
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Comuniquese con el administrador"
        })
    }

}

module.exports = {
    getContactos,
    crearContacto,
    actualizarContacto,
    eliminarContacto
}
// {
//     ok: true,
//     msg: "obtener contactos"
// }

// {
//     ok: true,
//     msg: "crear contactos"
// }

// {
//     ok: true,
//     msg: "actualizar contactos"
// }