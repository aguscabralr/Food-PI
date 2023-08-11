// Import actions-type
import { ACTIVE, FILTER_DIET, FILTER_ORDER, FILTER_ORIGIN, FIND_RECIPES, GET_DETAIL, GET_DIETS, GET_RECIPES } from './actions-type';
// Import reducers;
import { activeRd, filterDietRd, filterOrderRd, filterOriginRd, findRecipesRd, getDetailRd, getDietsRd, getRecipesRd } from './reducers/reducers';

const initialState = {
  recipes: [],
  recipesDB: [],
  recipesAPI: [],

  detail: [],

  diets: [],

  finders: [],
  filters: [],
  active: {
    order: "A",
    origin: "",
  }
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FIND_RECIPES:
      return findRecipesRd(state, actions);
    case GET_RECIPES:
      return getRecipesRd(state, actions);
    case GET_DIETS:
      return getDietsRd(state, actions);
    case GET_DETAIL:
      return getDetailRd(state, actions);
    case FILTER_ORDER:
      return filterOrderRd(state, actions);
    case FILTER_ORIGIN:
      return filterOriginRd(state, actions);
    case FILTER_DIET:
      return filterDietRd(state, actions);
    case ACTIVE:
      return activeRd(state, actions);
    default:
      return { ...state };
  };
};

export default reducer;