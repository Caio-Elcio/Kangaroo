'use strict';

module.exports = (sequelize, DataTypes) => {
	let navegacao = sequelize.define('navegacao', {
		idNavegacao: {
			field: 'idNavegacao',
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		titulo: {
			field: 'titulo',
			type: DataTypes.STRING,
			allowNull: false,
		},
		url: {
			field: 'url',
			type: DataTypes.STRING,
			allowNull: false
		},
		contagemVisitas: {
			field: 'contagemVisitas',
			type: DataTypes.INTEGER,
			allowNull: false
		},
        fkDependente: {
			field: 'fkDependente',
			allowNull: false,
			type: DataTypes.INTEGER,
			references: {
				model: 'dependente',
				key: 'idDependente'
			}
		},
	},
		{
			tableName: 'navegacao',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		});

	return navegacao;
};