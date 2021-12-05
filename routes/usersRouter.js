const { Router } = require("express");
const express = require("express");
const usersServices = require('../services/usersServices');
const validatorHandler = require('../middlewares/validator.handler');
const { createUsersSchema, updateUsersSchema, getUsersSchema } = require('../schemas/users.schema');

const router = express.Router();
const service = new usersServices();

router.get('/', async (req, res, next) => {
	try {
		const users = await service.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

router.get('/:id',
	validatorHandler(getusersSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const site = await service.findOne(id);
			res.json(site);
		} catch (error) {
			next(error);
		}
	}
);

router.post('/',
	validatorHandler(createusersSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newSite = await service.create(body);
			res.status(201).json(newSite);
		} catch (error) {
			next(error);
		}
	});

router.patch('/:id',
	validatorHandler(getusersSchema, 'params'),
	validatorHandler(updateusersSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const users = await service.update(id, body);
			res.json(users);
		} catch (error) {
			next(error);
		}
	});

router.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const rta = await service.delete(id);
		res.status(500).json(rta);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
