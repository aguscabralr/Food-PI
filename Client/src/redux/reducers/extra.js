export const animateRd = (state, actions) => {
  return {
    ...state,
    animation: actions.payload,
  };
};