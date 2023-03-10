const express = require('express');
const addNewUserConrtoller = require('../controllers/userCreation.controller');
const app = express.Router();

const schemas = require('../schemas/schemas');
const middleWare = require('../middlewares/validator.middleware');

app.route('/user')
    .post(
        middleWare.bodyValidator(schemas.newUserSchema),
        addNewUserConrtoller.addNewUser
    );

module.exports = app;