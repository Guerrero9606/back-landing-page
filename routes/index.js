const express = require('express');
const usersRouter = require('./usersRouter');

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/Users', usersRouter);
}

module.exports = routerApi;
