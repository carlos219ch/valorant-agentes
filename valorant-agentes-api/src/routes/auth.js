const router = require('express').Router();
const { register, login } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validate');

router.post('/register', validarCampos(['nombre', 'email', 'password']), register);
router.post('/login', validarCampos(['email', 'password']), login);

module.exports = router;
