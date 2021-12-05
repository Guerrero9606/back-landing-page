const joi = require('joi');

const id = joi.string().hex();
const Nombres = joi.string().min(3).max(50);
const Apellidos = joi.string().min(3).max(50);
const Cedula = joi.number().min(3).max(11);
const Correo = joi.string().email();
const Direccion = joi.string().min(3).max(50);
const Ciudad = joi.string().min(3).max(20)
const Celular = joi.number().min(10).max(10);
const WhatsApp = joi.boolean();

const createUsersSchema = joi.object({
	Nombres: Nombres.required(),
	Apellidos: Apellidos.required(),
	Cedula: Cedula.required(),
	Correo: Correo.required(),
	Direccion: Direccion.required(),
	Ciudad: Ciudad.required(),
	Celular: Celular.required(),
	WhatsApp: WhatsApp.required()
});

const updateUsersSchema = joi.object({
	Nombres: Nombres,
	Apellidos: Apellidos,
	Cedula: Cedula,
	Correo: Correo,
	Direccion: Direccion,
	Ciudad: Ciudad,
	Celular: Celular,
	WhatsApp: WhatsApp
});

const getUsersSchema = joi.object({
	id: id.required()
});

module.exports = { createUsersSchema, updateUsersSchema, getUsersSchema };
