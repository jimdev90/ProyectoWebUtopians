const express = require('express');
const multiparty = require('connect-multiparty')
const UserController = require('../controllers/user');
const middlewareAuth = require('../middleware/authenticated');

const middelwareUpload = multiparty({ uploadDir: 'uploads/avatar'});
const api = express.Router();


api.get('/user/me',[middlewareAuth.asureAuth], UserController.getMe);
api.get('/users',[middlewareAuth.asureAuth], UserController.getUsers);
api.post('/user',[middlewareAuth.asureAuth, middelwareUpload], UserController.createUser);
api.patch('/user/:id',[middlewareAuth.asureAuth, middelwareUpload], UserController.updateUser);
api.delete('/user/:id',[middlewareAuth.asureAuth], UserController.deleteUser);

module.exports = api;

