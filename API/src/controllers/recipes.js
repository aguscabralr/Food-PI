// Environment variables;
require('dotenv').config();
const { API_KEY } = process.env;
// Import utilities;
const axios = require('axios')
// Import model from DB;
const { Recipes, Diets, DietRecipe } = require('../db');

const url = 'https://api.spoonacular.com/recipes';
const aK = `apiKey=${API_KEY}`;
console.log(aK);

const dietsDB = async (id) => {
  const dietsRecipeDB = await DietRecipe.findAll({ where: { RecipeId: `${id}` } });
  if (dietsRecipeDB) {
    let dietsArray = [];
    for (let i = 0; i < dietsRecipeDB.length; i++) {
      const dietName = await Diets.findOne({ where: { id: dietsRecipeDB[i].DietId, } });
      dietsArray.push(dietName.name);
    };
    return dietsArray;
  } else return []
};

const getRecipes = async (req, res) => {
  try {
    const responseDB = await Recipes.findAll();

    const recipesDB = await Promise.all(responseDB.map(async (recipe) => {
      const dietsArray = await dietsDB(recipe.id);
      return ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        analyzedInstructions: recipe.analyzedInstructions,
        diets: dietsArray,
      });
    }));

    const { data } = await axios(`${url}/complexSearch?addRecipeInformation=true&number=100&${aK}`);
    const { results } = data;
  
    const recipes = recipesDB.concat(results);

    const allRecipes = recipes.map((recipe) => {
      return ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        analyzedInstructions: recipe.analyzedInstructions,
        diets: recipe.diets,
      });
    });

    if (recipes.length) return res.status(200).json(allRecipes);
    else return res.status(404).send('Recipes Not Found');
  } catch (error) {
    return res.status(500).json(error.message);
  };
};

const getRecipesById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.includes('-')) {
      const responseDB = await Recipes.findAll({ where: { id: `${id}` } });
      
      const recipeDB = await Promise.all(responseDB.map(async (recipe) => {
        const dietsArray = await dietsDB(recipe.id);
        return ({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          summary: recipe.summary,
          healthScore: recipe.healthScore,
          analyzedInstructions: recipe.analyzedInstructions,
          diets: dietsArray,
        });
      }));
      if (recipeDB) return res.status(200).json(recipeDB[0]);
      else throw Error(`<${id}> didn´t match any recipe`);
    } else {
      const { data } = await axios(`${url}/${id}/information?${aK}&includeNutrition=false`);
      const { title, diets, image, summary, healthScore, analyzedInstructions } = data;
      const recipe = { id, title, diets, image, summary, healthScore, analyzedInstructions };
      if (!recipe) throw Error(`<${id}> didn´t match any recipe`);
      return res.status(200).json(recipe);
    };
  } catch (error) {
    return res.status(500).json(error);
  };
};

const getRecipesByName = async (req, res) => {
  try {
    const { name } = req.query;
    const { data } = await axios(`${url}/complexSearch?query=${name}&addRecipeInformation=true&${aK}`);
    const { results } = data;
    if (results.length) return res.status(200).json(results);
    else {
      const nameRecipeDB = await Recipes.findAll({ where: { name } });
      if (!nameRecipeDB.length) throw Error(`<${name}> didn´t match any recipe`);
      return res.status(200).json(nameRecipeDB);
    };
  } catch (error) {
    return res.status(404).json(error.message);
  };
};

const postRecipe = async (req, res) => {
  try {
    const { title, image, summary, healthScore, analyzedInstructions, diets } = req.body;

    const formatInstructions = [{ "name": "", "steps": [] }];
        
    for (let i = 0; i < analyzedInstructions.length; i++) {
      const newStep = {};
      newStep.number = i + 1;
      newStep.step = analyzedInstructions[i];
      newStep.ingredients = [];
      formatInstructions[0].steps.push(newStep);
    };
    const newRecipe = {
      title,
      image,
      summary,
      healthScore,
      analyzedInstructions: formatInstructions,
    };
    console.log(newRecipe);
    
    if (diets.length) {
      const newRecipeDB = await Recipes.create(newRecipe);
      const dietsPromises = diets.map(async (diet) => {
        const dietsMatch = await Diets.findOne({ where: { name: diet } });
        return { id: dietsMatch.id, name: dietsMatch.name };
      });

      const dietsRecipe = await Promise.all(dietsPromises);
      await newRecipeDB.addDiets(dietsRecipe.map(diet => diet.id));

      return res.status(200).send('Recipe created');
    } else {
      newRecipe.diets = diets;
      const newRecipeDB = await Recipes.create(newRecipe);
      newRecipeDB.addDiets(diets)
      return res.status(200).json(newRecipe);
    };
  } catch (error) {
    return res.status(500).json(error.message);
  };
};

module.exports = { getRecipes, getRecipesById, getRecipesByName, postRecipe };
