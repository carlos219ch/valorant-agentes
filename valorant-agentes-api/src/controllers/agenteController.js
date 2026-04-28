const { Agente, Usuario } = require('../models');
const { Op } = require('sequelize');

// GET /agentes — listar con filtros y paginación (Mejora propia 2 y 3)
const listar = async (req, res) => {
  try {
    const { nombre, rol, page = 1, limit = 10, inactivos, orderBy = 'createdAt', orderDir = 'DESC' } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const ALLOWED_ORDER   = ['nombre', 'createdAt', 'rol'];
    const ALLOWED_DIR     = ['ASC', 'DESC'];
    const safeOrder  = ALLOWED_ORDER.includes(orderBy)               ? orderBy              : 'createdAt';
    const safeDir    = ALLOWED_DIR.includes(orderDir.toUpperCase())  ? orderDir.toUpperCase() : 'DESC';

    const where = {};
    if (nombre) where.nombre = { [Op.like]: `%${nombre}%` };

    if (inactivos === 'true') {
      where.activo = false;
    } else {
      where.activo = true;
      if (rol) where.rol = rol;
    }

    const { count, rows } = await Agente.findAndCountAll({
      where,
      include: [{ model: Usuario, as: 'creadoPor', attributes: ['id', 'nombre', 'email'] }],
      limit: parseInt(limit),
      offset,
      order: [[safeOrder, safeDir]],
    });

    res.json({
      total: count,
      pagina: parseInt(page),
      totalPaginas: Math.ceil(count / parseInt(limit)),
      agentes: rows,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al listar agentes', detalle: err.message });
  }
};

// GET /agentes/:id
const obtener = async (req, res) => {
  try {
    const agente = await Agente.findByPk(req.params.id, {
      include: [{ model: Usuario, as: 'creadoPor', attributes: ['id', 'nombre', 'email'] }],
    });
    if (!agente) return res.status(404).json({ error: 'Agente no encontrado' });
    res.json(agente);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener agente', detalle: err.message });
  }
};

// POST /agentes
const crear = async (req, res) => {
  try {
    const { nombre, rol, descripcion, pais_origen, habilidad_ultimate, imagen_url } = req.body;

    const rolesValidos = ['duelista', 'iniciador', 'controlador', 'centinela'];
    if (!rolesValidos.includes(rol)) {
      return res.status(400).json({ error: `Rol inválido. Opciones: ${rolesValidos.join(', ')}` });
    }

    const existe = await Agente.findOne({ where: { nombre } });
    if (existe) {
      return res.status(409).json({ error: `Ya existe un agente con el nombre "${nombre}"` });
    }

    const agente = await Agente.create({
      nombre,
      rol,
      descripcion,
      pais_origen,
      habilidad_ultimate,
      imagen_url: imagen_url || null,
      usuarioId: req.usuario.id,
    });

    res.status(201).json({ mensaje: 'Agente creado correctamente', agente });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear agente', detalle: err.message });
  }
};

// PUT /agentes/:id
const actualizar = async (req, res) => {
  try {
    const agente = await Agente.findByPk(req.params.id);
    if (!agente) return res.status(404).json({ error: 'Agente no encontrado' });

    const { nombre, rol, descripcion, pais_origen, habilidad_ultimate, imagen_url, activo } = req.body;

    if (rol) {
      const rolesValidos = ['duelista', 'iniciador', 'controlador', 'centinela'];
      if (!rolesValidos.includes(rol)) {
        return res.status(400).json({ error: `Rol inválido. Opciones: ${rolesValidos.join(', ')}` });
      }
    }

    await agente.update({ nombre, rol, descripcion, pais_origen, habilidad_ultimate, imagen_url: imagen_url ?? agente.imagen_url, activo });
    res.json({ mensaje: 'Agente actualizado correctamente', agente });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar agente', detalle: err.message });
  }
};

// DELETE /agentes/:id — soft delete gracias a paranoid: true
const eliminar = async (req, res) => {
  try {
    const agente = await Agente.findByPk(req.params.id);
    if (!agente) return res.status(404).json({ error: 'Agente no encontrado' });

    await agente.destroy(); // solo marca deletedAt, no borra la fila
    res.json({ mensaje: `Agente '${agente.nombre}' eliminado correctamente` });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar agente', detalle: err.message });
  }
};

const stats = async (req, res) => {
  try {
    const activos   = await Agente.count({ where: { activo: true } });
    const inactivos = await Agente.count({ where: { activo: false } });
    const porRol    = {};
    for (const rol of ['duelista', 'iniciador', 'controlador', 'centinela']) {
      porRol[rol] = await Agente.count({ where: { activo: true, rol } });
    }
    res.json({ activos, inactivos, total: activos + inactivos, porRol });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener estadísticas', detalle: err.message });
  }
};

module.exports = { listar, obtener, crear, actualizar, eliminar, stats };
