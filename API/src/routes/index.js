const { Router } = require('express');
const { getRecipes } = require('../controllers/recipes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes/:idRecipe', getRecipes);

module.exports = router;