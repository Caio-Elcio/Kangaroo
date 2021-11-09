'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
	let Usuario = sequelize.define('Usuario', {
		idUsuario: {
			field: 'idUsuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nomeUsuario: {
			field: 'nomeUsuario',
			type: DataTypes.STRING,
			allowNull: false,
		},
		cpf: {
			field: 'cpf',
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
	},
		{
			tableName: 'usuario',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		},


	);

	return Usuario;
};