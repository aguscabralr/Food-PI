// Import utilities;
import axios from 'axios';
// Necesary actions;
import { FILTER_DIET, FILTER_ORIGIN, FIND_RECIPES, GET_DIETS, GET_RECIPES } from './actions-type';
// Extra actions;
import { ANIMATE } from './actions-type';

export const findRecipes = (title) =>  {
  return async (dispatch) => {
    try {
      if (title === 'none') return dispatch({ type: FIND_RECIPES, payload: [] });
      else {
        const { data } = await axios(`/recipes/name?name=${title}`);
        return dispatch({ type: FIND_RECIPES, payload: data });
      }
    } catch (error) {
      console.log(error);
    };
  };
};

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/recipes`);
      return dispatch({ type: GET_RECIPES, payload: data });
    } catch (error) {
      console.log(error);
    };
  };
};

export const getDiets = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/diets`);
      return dispatch({ type: GET_DIETS, payload: data });
    } catch (error) {
      console.log(error);
    };
  };
};

export const filterDiet = (checked) => {
  return { type: FILTER_DIET, payload: checked };
};

export const filterOrigin = (origin) => {
  return { type: FILTER_ORIGIN, payload: origin };
};

// Extra;
export const animate = (boolean) => {
  return { type: ANIMATE, payload: boolean };
};