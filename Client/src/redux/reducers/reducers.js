export const findRecipesRd = (state, actions) => {
  return {
    ...state,
    finders: [...actions.payload]
  };
};

export const getRecipesRd = (state, actions) => {
  return {
    ...state,
    recipes: [...actions.payload],
    filters: [...actions.payload]
  };
};

export const getDietsRd = (state, actions) => {
  return {
    ...state,
    diets: [...actions.payload]
  };
};

export const filterDietRd = (state, actions) => {
  const dietFilter = state.recipes.filter(recipe => actions.payload.every(diet => recipe.diets.includes(diet)));
  return {
    ...state,
    filters: dietFilter,
  };
};

export const filterOriginRd = (state, actions) => {
  const originFilter = state.recipes.filter(recipe => typeof recipe.id === actions.payload);
  return {
    ...state,
    filters: originFilter,
  };
};