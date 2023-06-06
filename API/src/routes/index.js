const { Router } = require('express');
const { getRecipesById, getRecipesByName, postRecipe } = require('../controllers/recipes');
const { allDiets } = require('../controllers/diets');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipe/:id', getRecipesById);
router.get('/recipes/name', getRecipesByName);
router.post('/recipes', postRecipe);
router.get('/diets', allDiets);

module.exports = router;