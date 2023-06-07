const { Schema, model } = require( "mongoose" );

const ContactoSchema = Schema({
    name: {
        type: String,
        required: true
    },

    number: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
});

ContactoSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model("Contacto", ContactoSchema)