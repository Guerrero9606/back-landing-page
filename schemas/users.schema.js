const joi = require('joi');

const id = joi.string().hex();
const Nombres = joi.string().min(3).max(50);
const Apellidos = joi.string().min(3).max(50);
const Cedula = joi.number().min(3).max(5000000000);
const Correo = joi.string().email();
const Direccion = joi.string().min(3).max(50);
const Ciudad = joi.string().min(3).max(20)
const Celular = joi.number().min(10).max(3600000000);

const createUsersSchema = joi.object({
	Nombres: Nombres.required(),
	Apellidos: Apellidos.required(),
	Cedula: Cedula.required(),
	Correo: Correo.required(),
	Direccion: Direccion.required(),
	Ciudad: Ciudad.required(),
	Celular: Celular.required()
});

const updateUsersSchema = joi.object({
	Nombres: Nombres,
	Apellidos: Apellidos,
	Cedula: Cedula,
	Correo: Correo,
	Direccion: Direccion,
	Ciudad: Ciudad,
	Celular: Celular
});

const getUsersSchema = joi.object({
	id: id.required()
});

module.exports = { createUsersSchema, updateUsersSchema, getUsersSchema };
