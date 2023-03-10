const express = require('express');
const app = express.Router();

const middleWare = require('../middlewares/validator.middleware');
// const schemas = require('../schemas/schemas');
const validateTokenController = require('../controllers/validateToken.controller');

app.route('/token/validate')
    .post(middleWare.authHeaderValidator, validateTokenController.validateToken);

module.exports = app;