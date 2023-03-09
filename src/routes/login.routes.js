const express = require('express');
const app = express.Router();

const middleWare = require('../middlewares/validator.middleware');
const schemas = require('../schemas/schemas');
const loginUserController = require('../controllers/loginUser.controller');
app.route('/login')
    .post(
        middleWare.bodyValidator(schemas.newUserSchema),
        loginUserController.handleLogin
    );

module.exports = app;