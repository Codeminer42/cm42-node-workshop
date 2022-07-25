const Recipe = require('../Recipe');
const Id = require('../../Id');

describe('Domain / Recipe / Recipe', () => {
  describe('#create', () => {
    describe('when valid data is passed with id', () => {
      it('creates a recipe', () => {
        const recipe = Recipe.create({
          id: '588ca576-de31-45a1-8e9c-1e0184507887',
          name: 'Bacon pancakes',
          preparationTime: 5,
          steps: [
            {
              description: 'Make some bacon',
              position: 1,
            },
            {
              description: 'Appreciate the sound of frying bacon',
              position: 2,
            },
            {
              description: 'Put it in a pancake',
              position: 3,
            },
          ],
          ingredients: [
            {
              name: 'Vegetable oil',
              amount: 5,
              unit: 'l',
            },
            {
              name: 'Bacon',
              amount: 200,
              unit: 'g',
            },
          ],
        });

        expect(recipe).toEqual({
          id: '588ca576-de31-45a1-8e9c-1e0184507887',
          name: 'Bacon pancakes',
          preparationTime: 5,
          steps: [
            { id: expect.stringMatching(Id.regex), description: 'Make some bacon', position: 1 },
            {
              id: expect.stringMatching(Id.regex),
              description: 'Appreciate the sound of frying bacon',
              position: 2,
            },
            {
              id: expect.stringMatching(Id.regex),
              description: 'Put it in a pancake',
              position: 3,
            },
          ],
          ingredients: [
            { id: expect.stringMatching(Id.regex), name: 'Vegetable oil', amount: 5, unit: 'l' },
            { id: expect.stringMatching(Id.regex), name: 'Bacon', amount: 200, unit: 'g' },
          ],
        });
      });
    });

    describe('when valid data is passed without an id', () => {
      it('throws an error', () => {
        expect(() => {
          Recipe.create({
            name: 'Bacon pancakes',
            preparationTime: 5,
            steps: [
              {
                description: 'Make some bacon',
                position: 1,
              },
              {
                description: 'Appreciate the sound of frying bacon',
                position: 2,
              },
              {
                description: 'Put it in a pancake',
                position: 3,
              },
            ],
            ingredients: [
              {
                name: 'Vegetable oil',
                amount: 5,
                unit: 'l',
              },
              {
                name: 'Bacon',
                amount: 200,
                unit: 'g',
              },
            ],
          });
        }).toThrow('"id" is required');
      });
    });

    describe('when invalid data is passed', () => {
      it('throws a BusinessError', () => {
        expect(() => {
          Recipe.create({
            id: '588ca576-de31-45a1-8e9c-1e0184507887',
            name: 'Bacon pancakes',
            preparationTime: -1,
            steps: [
              {
                description: 'Make some bacon',
                position: 1,
              },
              {
                description: 'Appreciate the sound of frying bacon',
                position: 2,
              },
              {
                description: 'Put it in a pancake',
                position: 3,
              },
            ],
            ingredients: [
              {
                name: 'Vegetable oil',
                amount: 5,
                unit: 'l',
              },
              {
                name: 'Bacon',
                amount: 200,
                unit: 'g',
              },
            ],
          });
        }).toThrow(/positive/g);
      });
    });

    describe('when steps are not consecutive', () => {
      it('throws a BusinessError', () => {
        expect(() => {
          Recipe.create({
            id: '588ca576-de31-45a1-8e9c-1e0184507887',
            name: 'Bacon pancakes',
            preparationTime: 5,
            steps: [
              {
                description: 'Make some bacon',
                position: 1,
              },
              {
                description: 'Appreciate the sound of frying bacon',
                position: 2,
              },
              {
                description: 'Put it in a pancake',
                position: 4,
              },
            ],
            ingredients: [
              {
                name: 'Vegetable oil',
                amount: 5,
                unit: 'l',
              },
              {
                name: 'Bacon',
                amount: 200,
                unit: 'g',
              },
            ],
          });
        }).toThrow(/consecutive/g);
      });
    });
  });
});
