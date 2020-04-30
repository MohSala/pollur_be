import express = require('express');
import bodyParser = require('body-parser');
import { serviceLocate } from '../config/di';
const userController = serviceLocate.get('userController');
const pollController = serviceLocate.get('pollController');
export const userRouter = express.Router();
const upload = require("../services/imageUpload")


userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: false }));


userRouter.post('/register',
	(req, res) => {
		return userController.registerUser(req, res)
	})

userRouter.post('/login',
	(req, res) => {
		return userController.login(req, res)
	})

userRouter.post('/addCandidate',
	(req, res) => {
		return userController.addCandidate(req, res)
	})

userRouter.get('/loadCandidates',
	(req, res) => {
		return userController.loadCandidates(req, res)
	})

userRouter.post('/createPoll',
	(req, res) => {
		return pollController.createPoll(req, res)
	})

userRouter.get('/myPolls',
	(req, res) => {
		return pollController.viewMyPolls(req, res)
	})
