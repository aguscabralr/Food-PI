export const getRecipesRd = (state, actions) => {
  const recipes = actions.payload.sort((a, b) => {
    if (a.title > b.title) return 1;
    if (a.title < b.title) return -1;
    return 0;
  })
  const recipesDB = recipes.filter(recipe => typeof recipe.id === 'string');
  const recipesAPI = recipes.filter(recipe => typeof recipe.id === 'number');
  return { ...state, recipes, recipesDB, recipesAPI, filters: recipes };
};

export const getDietsRd = (state, actions) => {
  return { ...state, diets: [...actions.payload] };
};

export const findRecipesRd = (state, actions) => {
  return { ...state, finders: [...actions.payload] };
};

export const getDetailRd = (state, actions) => {
  return { ...state, detail: actions.payload };
};

export const filterOriginRd = (state, actions) => {
  if (actions.payload === '') return { ...state, filters: [...state.recipes] };
  else {
    if (actions.payload === 'D') {
      return { ...state, filters: state.recipesDB }
    } else {
      return { ...state, filters: state.recipesAPI }
    }
  };
};

export const filterOrderRd = (state, actions) => {
  if (actions.payload === 'O') {
    if (origin.length) return { ...state, filters: [...state.origin] }
    else return { ...state, filters: [...state.recipes] }
  } else return {
    ...state,
    filters: actions.payload === 'A'
      ? state.filters.sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      })
      : actions.payload === 'Z'
        ? state.filters.sort((a, b) => {
          if (b.title > a.title) return 1;
          if (b.title < a.title) return -1;
          return 0;
        })
        : actions.payload === '0'
          ? state.filters.sort((a, b) => a.healthScore - b.healthScore)
          : state.filters.sort((a, b) => b.healthScore - a.healthScore),
  };
};

export const filterDietRd = (state, actions) => {
  if (state.active.origin === 'A') {
    const dietFilter = state.recipesAPI.filter(recipe => actions.payload.every(diet => recipe.diets.includes(diet)));
    return { ...state, filters: dietFilter };
  } else if (state.active.origin === 'D') {
    const dietFilter = state.recipesDB.filter(recipe => actions.payload.every(diet => recipe.diets.includes(diet)));
    return { ...state, filters: dietFilter };
  } else {
    const dietFilter = state.recipes.filter(recipe => actions.payload.every(diet => recipe.diets.includes(diet)));
    return { ...state, filters: dietFilter };
  };
};

export const activeRd = (state, actions) => {
  return {
    ...state, active: {
      ...state.active,
      [actions.payload[0]]: actions.payload[1],
    },
  };
};