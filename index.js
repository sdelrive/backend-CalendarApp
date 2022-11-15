const express = require("express");
const { dbConnection } = require("./database/config");
// Configurar variables de entorno
require("dotenv").config();
// console.log(process.env);

// Creamos el servidor de express
const app = express();

// base de datos
// dbConnection();

// Directorio publico
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

//  Rutas
app.use("/api/auth", require("./routes/auth"));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${4000}`);
});
