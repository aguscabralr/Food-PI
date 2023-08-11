// Import utilities;
import axios from 'axios';
// Import actions types;
import { ACTIVE, FILTER_DIET, FILTER_ORDER, FILTER_ORIGIN, FIND_RECIPES, GET_DETAIL, GET_DIETS, GET_RECIPES } from './actions-type';

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

export const findRecipes = (title) => {
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

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      if (id === 'none') return dispatch({ type: GET_DETAIL, payload: {} });
      else {
        const { data } = await axios(`/recipes/id/${id}`);
        return dispatch({ type: GET_DETAIL, payload: data });
      };
    } catch (error) {
      console.log(error);
    };
  };
};

export const filterOrder = (order) => {
  return { type: FILTER_ORDER, payload: order };
};

export const filterOrigin = (origin) => {
  return { type: FILTER_ORIGIN, payload: origin };
};

export const filterDiet = (checked) => {
  return { type: FILTER_DIET, payload: checked };
};

export const active = (filter, value) => {
  return { type: ACTIVE, payload: [filter, value] };
};