const recipe1 = {
  name: 'Shrimp Sushi',
  preparationTime: 5,
  steps: [
    {
      description: 'Aqueça o óleo numa frigideira',
      position: 1,
    },
    {
      description: 'Quebre os ovos',
      position: 2,
    },
  ],
  ingredients: [
    {
      name: 'shrimp',
      amount: 1,
      unit: 'un',
    },
    {
      name: 'rice',
      amount: 1,
      unit: 'un',
    },
    {
      name: 'seaweed',
      amount: 1,
      unit: 'un',
    },
  ],
};

const recipe2 = {
  name: 'Rice with shrimp',
  preparationTime: 5,
  steps: [
    {
      description: 'Aqueça o óleo numa frigideira',
      position: 1,
    },
    {
      description: 'Quebre os ovos',
      position: 2,
    },
  ],
  ingredients: [
    {
      name: 'shrimp',
      amount: 1,
      unit: 'un',
    },
    {
      name: 'rice',
      amount: 1,
      unit: 'un',
    },
  ],
};

const recipe3 = {
  name: 'Rice',
  preparationTime: 5,
  steps: [
    {
      description: 'Aqueça o óleo numa frigideira',
      position: 1,
    },
    {
      description: 'Quebre os ovos',
      position: 2,
    },
  ],
  ingredients: [
    {
      name: 'rice',
      amount: 1,
      unit: 'un',
    },
  ],
};

const recipeFixtures = [recipe1, recipe2, recipe3];
module.exports = { recipeFixtures };
