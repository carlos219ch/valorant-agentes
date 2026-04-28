require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');

const authRoutes = require('./src/routes/auth');
const agenteRoutes = require('./src/routes/agentes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/agentes', agenteRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'Valorant Agentes API v1.0', estado: 'activo' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos sincronizada');
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err.message);
});
