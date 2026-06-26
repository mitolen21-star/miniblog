//configuración de servidor, rutas y documentación

const express = require('express');
const app = express();
app.set('json spaces', 2);

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

// ¡Permite recibir datos en formato JSON! Siempre debe ir antes de las rutas.
app.use(express.json()); 

// --- Importar Rutas ---
const authorsRoutes = require('./routes/authorsRoutes');
const postsRoutes = require('./routes/postsRoutes');
const commentsRoutes = require("./routes/commentsRoutes");

// --- Usar Rutas ---
app.use('/autores', authorsRoutes);
app.use('/posts', postsRoutes);
app.use("/comments", commentsRoutes);

// --- Configurar Documentación ---
const swaggerDocument = YAML.load(path.join(__dirname, "../openapi.yaml"));
console.log("RUTA ABSOLUTA:", path.resolve(__dirname, "../openapi.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Servidor ---
if (require.main === module) {
  app.listen(3000, () => console.log('Servidor encendido en el puerto 3000'));
}



module.exports = app;