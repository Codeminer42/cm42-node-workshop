const { createRecipe } = require('../../../../application/CreateRecipe');
const { setupIntegrationTest } = require('../../../../testing');
const { recipeFixtures } = require('./recipesFixtures');
const Id = require('../../../../domain/Id');

describe('HTTP / Recipes / Search', () => {
  let testControls;

  const setup = ({ ingredients, operator } = {}) => {
    return testControls
      .request()
      .get('/api/recipes/search')
      .query({ 'ingredients[]': ingredients, operator });
  };

  beforeAll(async () => {
    testControls = await setupIntegrationTest();
  });

  beforeEach(async () => {
    await testControls.prepareEach();
  });

  afterAll(async () => {
    await testControls.cleanup();
  });

  describe('when valid params are sent', () => {
    beforeEach(async () => {
      const createRecipePromises = recipeFixtures.map((recipe) => {
        return createRecipe(recipe);
      });

      await Promise.all(createRecipePromises);
    });

    describe('operator is ANY', () => {
      describe('when there are no matching recipes', () => {
        it('resolves empty list', async () => {
          const response = await setup({ ingredients: ['eggs'], operator: 'ANY' }).expect(200);

          expect(response.body).toEqual({ data: [], count: 0 });
        });
      });

      describe('when there are matching recipes', () => {
        it('resolves recipes that have at least one of the ingredients', async () => {
          const response = await setup({
            ingredients: ['shrimp', 'seaweed'],
            operator: 'ANY',
          }).expect(200);

          expect(response.body).toEqual({
            data: [
              { id: expect.stringMatching(Id.regex), name: 'Shrimp Sushi' },
              { id: expect.stringMatching(Id.regex), name: 'Rice with shrimp' },
            ],
            count: 2,
          });
        });
      });
    });

    describe('operator is ALL', () => {
      describe('when there are no matching recipes', () => {
        it('resolves empty list', async () => {
          const response = await setup({ ingredients: ['eggs'], operator: 'ALL' }).expect(200);

          expect(response.body).toEqual({ data: [], count: 0 });
        });
      });

      describe('when there are matching recipes', () => {
        it('resolves recipes that have all of the ingredients', async () => {
          const response = await setup({
            ingredients: ['shrimp', 'seaweed'],
            operator: 'ALL',
          }).expect(200);

          expect(response.body).toEqual({
            data: [{ id: expect.stringMatching(Id.regex), name: 'Shrimp Sushi' }],
            count: 1,
          });
        });
      });
    });

    describe('when there is no operator', () => {
      it('behaves like ANY operator', async () => {
        const response = await setup({
          ingredients: ['shrimp', 'seaweed'],
        }).expect(200);

        expect(response.body).toEqual({
          data: [
            { id: expect.stringMatching(Id.regex), name: 'Shrimp Sushi' },
            { id: expect.stringMatching(Id.regex), name: 'Rice with shrimp' },
          ],
          count: 2,
        });
      });
    });
  });

  describe('when invalid params are sent', () => {
    describe('when ingredients are not provided', () => {
      it('rejects with 400', async () => {
        await setup().expect(400);
      });
    });

    describe('when operator is invalid', () => {
      it('rejects with 400', async () => {
        await setup({ ingredients: ['shrimp', 'seaweed'], operator: 'INVALID_OPERATOR' }).expect(
          400
        );
      });
    });
  });
});
