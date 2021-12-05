const boom = require('@hapi/boom');
const { ObjectId } = require('mongodb');
const { getBD } = require('../DB/conexion.js');

class usersServices {
	constructor() {
	}

	async create(data) {
		const connection = getBD();
		const object = {
			Nombres: data.Nombres,
			Apellidos: data.Apellidos,
			Cedula: data.Cedula,
			Correo: data.Correo,
			Direccion: data.Direccion,
			Ciudad: data.Ciudad,
			Celular: data.Celular
		}

		if (!data) {
			throw boom.badData('No se puede crear este objeto');
		}
		await connection.collection("Users").insertOne(object);
	}

	async find() {
		const conexionBd = getBD();
		//implementar el codigo paa crar el producto en la BD
		const resultado = await conexionBd.collection('Users').find({}).toArray();
		if (resultado.length === 0) {
			throw boom.notFound('No se encuentran usuarios');
		}
		return resultado;
	}

	async findOne(_idSite) {
		const connection = getBD(); //conexion a la db

		const id = {_id: ObjectId(_idSite)};
		const res = await connection.collection('Users').findOne(id);
		if(res === null){
			throw boom.notFound('Usuario no encontrado');
		}
		return res;
	}

	async update(id, changes) {
		const conexionBd = getBD();
		const filtrarSite = { _id: ObjectId(id) };
		const user = await conexionBd.collection('Users').find(filtrarSite).toArray();
		if (user.length === 0) {
			throw boom.notFound('Usuario no encontrado');
		} else {
			const operacion = { $set: changes, };
			const updated = await conexionBd.collection('Users').updateOne(filtrarSite, operacion, { upsert: false, returnOriginal: true });
			const resultado = await conexionBd.collection('Users').find(filtrarSite).toArray();
			return resultado;
		}
	}

	async delete(id) {
		const conexionBd = getBD();
		const filtrarSite = { _id: ObjectId(id) };
		const user = await conexionBd.collection('Users').find(filtrarSite).toArray();
		if (user.length === 0) {
			throw boom.notFound('Usuario no encontrado');
		} else {
			const remove = await conexionBd.collection('Users').deleteOne(filtrarSite);
			return { id };
		}
	}
}

module.exports = usersServices;
