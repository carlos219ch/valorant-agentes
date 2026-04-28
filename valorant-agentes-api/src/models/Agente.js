const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agente = sequelize.define('Agente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('duelista', 'iniciador', 'controlador', 'centinela'),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pais_origen: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  habilidad_ultimate: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  imagen_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  // Mejora propia 1: soft delete (paranoid)
}, {
  tableName: 'agentes',
  timestamps: true,
  paranoid: true, // activa deletedAt para soft delete
});

module.exports = Agente;
