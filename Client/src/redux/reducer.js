// Import actions-type
import { ANIMATE, FILTER_DIET, FILTER_ORIGIN, FIND_RECIPES, GET_DIETS, GET_RECIPES } from './actions-type';
// Import reducers;
import { filterDietRd, filterOriginRd, findRecipesRd, getDietsRd, getRecipesRd, } from './reducers/reducers';
// Import extra reducers;
import { animateRd } from './reducers/extra';

const initialState = {
  recipes: [],
  diets: [],
  finders: [],
  filters: [],
  animation: false,
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FIND_RECIPES:
      return findRecipesRd(state, actions);
    case GET_RECIPES:
      return getRecipesRd(state, actions);
    case GET_DIETS:
      return getDietsRd(state, actions);
    case FILTER_DIET:
      return filterDietRd(state, actions);
    case FILTER_ORIGIN:
      return filterOriginRd(state, actions);
    // Extra;
    case ANIMATE:
      return animateRd(state, actions);
    default:
      return { ...state };
  };
};

export default reducer;