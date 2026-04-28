const router = require('express').Router();
const { listar, obtener, crear, actualizar, eliminar, stats } = require('../controllers/agenteController');
const { verificarToken } = require('../middlewares/auth');
const { validarCampos } = require('../middlewares/validate');

// Rutas públicas (solo lectura)
router.get('/stats', stats);
router.get('/', listar);
router.get('/:id', obtener);

// Rutas protegidas (requieren JWT)
router.post('/', verificarToken, validarCampos(['nombre', 'rol', 'descripcion', 'pais_origen', 'habilidad_ultimate']), crear);
router.put('/:id', verificarToken, actualizar);
router.delete('/:id', verificarToken, eliminar);

module.exports = router;
