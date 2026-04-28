const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Agente = require('./Agente');

// Mejora propia 1: relación entre tablas — un usuario puede registrar muchos agentes
Usuario.hasMany(Agente, { foreignKey: 'usuarioId', as: 'agentes' });
Agente.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'creadoPor' });

module.exports = { sequelize, Usuario, Agente };
