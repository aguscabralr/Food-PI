const validate = (data) => {
  let error = {};
  // Name
  if (!data.name) error.name = 'Complete this field';
  if (data.name.length > 40) error.name = 'Less than 40 characters';
  // Image
  if (!data.image.includes('jpg')) error.image = 'Only jpg format';
  if (!data.image) error.image = 'Paste the URL of an image';
  // Summary
  if (!data.summary) error.summary = 'Complete this field';
  if (data.summary.length > 255) error.summary = 'Less than 255 characters';
  // Health Score
  if (!data.healthScore) error.healthScore = 'Set the score';
  if (data.healthScore === '0') error.healthScore = 'Higher than 0';
  // Instructions
  error.analyzedInstructions = [];
  for (let i = 0; i < data.analyzedInstructions.length; i++) {
    if (data.analyzedInstructions[i].length === 0) {
      error.analyzedInstructions = [...error.analyzedInstructions, `Complete the step ${i + 1}`];
    };
  };
  return error;
};

export default validate;