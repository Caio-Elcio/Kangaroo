'use strict';

module.exports = (sequelize, DataTypes) => {
	let Dependente = sequelize.define('Dependente', {
		idDependente: {
			field: 'idDependente',
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nomeDependente: {
			field: 'nomeDependente',
			type: DataTypes.STRING,
			allowNull: false,
		},
		dataNascimento: {
			field: 'dataNascimento',
			type: DataTypes.STRING,
			allowNull: false
		},
		sexo: {
			field: 'sexo',
			type: DataTypes.STRING,
			allowNull: false
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
	},
		{
			tableName: 'dependente',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		});

	return Dependente;
};