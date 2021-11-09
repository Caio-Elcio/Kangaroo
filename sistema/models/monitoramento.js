'use strict';

module.exports = (sequelize, DataTypes) => {
	let Monitoramento = sequelize.define('Monitoramento', {
		idMonitoramento: {
			field: 'idMonitoramento',
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		processadorLogico: {
			field: 'processadorLogico',
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		processadorFisico: {
			field: 'processadorFisico',
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		usandoCpu: {
			field: 'usandoCpu',
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		totalDisco: {
			field: 'totalDisco',
			type: DataTypes.DOUBLE,
			allowNull: false
		},
        livreDisco: {
			field: 'livreDisco',
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		usandoDisco: {
			field: 'usandoDisco',
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		totalRam: {
			field: 'totalRam',
			type: DataTypes.DOUBLE,
			allowNull: false
		},
        livreRam: {
			field: 'livreRam',
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		usandoRam: {
			field: 'usandoRam',
			type: DataTypes.DOUBLE,
			allowNull: false
		},
	},
		{
			tableName: 'monitoramento',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		});

	return Monitoramento;
};