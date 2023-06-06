const axios = require('axios')
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe } = require('../db');

const url = 'https://api.spoonacular.com/recipes';
const aK = `apiKey=${API_KEY}`;

const getRecipesById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios(`${url}/${id}/information?${aK}&includeNutrition=false`);
    const { title, diets, image, summary, healthScore, analyzedInstructions } = data;
    const recipe = { id, title, diets, image, summary, healthScore, analyzedInstructions };
    if (data) return res.status(200).json(recipe);
    else {
      const recipeDB = await Recipe.findByPk({ where: { id } });
      if (!recipeDB) throw Error(`<${id}> didn´t match any recipe`);
      return res.status(200).json(recipeDB);
    };
  } catch (error) {
    return res.status(500).json(error.message);
  };
};

const getRecipesByName = async (req, res) => {
  try {
    const { name } = req.query;
    const { data } = await axios(`${url}/complexSearch?query=${name}&${aK}`);
    const { results } = data;
    if (results.length) return res.status(200).json(results);
    else {
      const nameRecipeDB = await Recipe.findAll({ where: { name } });
      if (!nameRecipeDB.length) throw Error(`<${name}> didn´t match any recipe`);
      return res.status(200).json(nameRecipeDB);
    };
  } catch (error) {
    return res.status(404).json(error.message);
  };
};

const postRecipe = async (req, res) => {
  try {
    const { title, image, summary, healthScore, analyzedInstructions } = req.body;
    if (!title || !image || !summary || !healthScore || !analyzedInstructions) return res.status(404).send('Missing Data');
    const newRecipe = await Recipe.create({ title, image, summary, healthScore, analyzedInstructions });
    return res.status(200).json(newRecipe);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { getRecipesById, getRecipesByName, postRecipe };
