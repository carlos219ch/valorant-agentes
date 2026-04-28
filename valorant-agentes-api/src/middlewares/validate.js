const validarCampos = (campos) => (req, res, next) => {
  for (const campo of campos) {
    const valor = req.body[campo];
    if (valor === undefined || valor === null || String(valor).trim() === '') {
      return res.status(400).json({ error: `El campo '${campo}' es obligatorio` });
    }
  }
  next();
};

module.exports = { validarCampos };
