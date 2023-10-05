const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
    API_VERISION
} = require('./constants');

const app = express();

// TODO: Importamos las rutas
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const menuRoutes = require('./router/menu');
const courseRoutes = require('./router/course');
const postRoutes = require('./router/post');
const newsletterRoutes = require('./router/newsletter');

// TODO: Configuramos body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO: Configurar la carpeta estática
app.use(express.static('uploads'));

// TODO: Configurar los HTTP-CORS
app.use(cors());

// TODO: Configuramos las rutas
app.use(`/api/${API_VERISION}`, authRoutes);
app.use(`/api/${API_VERISION}`, userRoutes);
app.use(`/api/${API_VERISION}`, menuRoutes);
app.use(`/api/${API_VERISION}`, courseRoutes);
app.use(`/api/${API_VERISION}`, postRoutes);
app.use(`/api/${API_VERISION}`, newsletterRoutes);

module.exports = app;