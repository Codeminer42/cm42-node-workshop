const Ingredient = require('../Ingredient');
const Id = require('../../Id');

describe('Domain / Recipe / Ingredient', () => {
  describe('#create', () => {
    describe('when valid data is passed with id', () => {
      it('creates a ingredient', () => {
        const ingredient = Ingredient.create({
          id: '21cea63a-b2f0-4ea0-a9dd-bce3e1efa3c1',
          name: 'Bacon',
          amount: 200,
          unit: 'g',
        });

        expect(ingredient).toEqual({
          id: '21cea63a-b2f0-4ea0-a9dd-bce3e1efa3c1',
          name: 'Bacon',
          amount: 200,
          unit: 'g',
        });
      });
    });

    describe('when valid data is passed without an id', () => {
      it('creates a ingredient with a generated id', () => {
        const ingredient = Ingredient.create({
          name: 'Bacon',
          amount: 200,
          unit: 'g',
        });

        expect(ingredient).toEqual({
          id: expect.stringMatching(Id.regex),
          name: 'Bacon',
          amount: 200,
          unit: 'g',
        });
      });
    });

    describe('when invalid data is passed', () => {
      it('throws a BusinessError', () => {
        expect(() => {
          Ingredient.create({ unit: 'invalidUnit' });
        }).toThrow(/required.*length/g);
      });
    });
  });
});
