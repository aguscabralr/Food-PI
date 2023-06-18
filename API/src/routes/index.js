// Import Router;
const { Router } = require('express');
// Import controllers;
const { getRecipes, getRecipesById, getRecipesByName, postRecipe } = require('../controllers/recipes');
const { allDiets } = require('../controllers/diets');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes', getRecipes);
router.post('/recipes', postRecipe);
router.get('/recipes/id/:id', getRecipesById);
router.get('/recipes/name', getRecipesByName);
router.get('/diets', allDiets);


module.exports = router;