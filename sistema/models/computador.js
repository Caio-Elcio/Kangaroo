'use strict';

module.exports = (sequelize, DataTypes) => {
	let Computador = sequelize.define('Computador', {
		idComputador: {
			field: 'idComputador',
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
        fkUsuario: {
			field: 'fkUsuario',
			allowNull: false,
			type: DataTypes.INTEGER,
			references: {
				model: 'usuario',
				key: 'idUsuario'
			}
		},
        sistemaOperacional: {
			field: 'sistemaOperacional',
			type: DataTypes.STRING,
			allowNull: false
		},
        apelidoComputador: {
			field: 'apelidoComputador',
			type: DataTypes.STRING,
			allowNull: false
		},
	},
		{
			tableName: 'computador',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		});

	return Computador;
};