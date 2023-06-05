require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe } = require('../db');

const url = 'https://api.spoonacular.com/recipes';
const getRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeApi = await axios(`${url}/${id}/information`);
    const recipeDB = await Recipe.findByPk({ where: { id } });
    if (recipeApi) return res.status(200).json(recipeApi);
    else return res.status(200).json(recipeDB);
  } catch (error) {
    return res.status(500).json(error.message);
  };
};

const postRecipe = async (req, res) => {
  try {
    const { name } = req.query;
    const recipeApi = await axios.get(`${url}/search?query=${name}&apiKey=${API_KEY}`);
  } catch (error) {

  }
};

const detailRecipe = () => {
  try {

  } catch (error) {

  }
};

module.exports = { getRecipes, postRecipe, detailRecipe };
