import express = require('express');
import bodyParser = require('body-parser');
import { serviceLocate } from '../config/di';
const userController = serviceLocate.get('userController');
const { userValidationRules, validate } = require('../middleware/validator')
export const userRouter = express.Router();

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: false }));


userRouter.post('/register',
    // userValidationRules(), 
    // validate, 
    (req, res) => {
        return userController.registerUser(req, res)
    })

userRouter.post('/login',
    (req, res) => {
        return userController.login(req, res)
    })
