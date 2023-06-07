
const express = require('express');
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require('./database/config');

const app = express();

dbConnection();

app.use( cors() );

app.use( express.static( "public" ) );

app.use( express.json() );

app.use( "/api/auth", require( "./routes/auth" ) );

app.use( "/api/contacts", require( "./routes/contacts" ) );

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puesto ${process.env.PORT}`);
})
