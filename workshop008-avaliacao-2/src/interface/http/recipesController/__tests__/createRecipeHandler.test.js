const { setupIntegrationTest } = require('../../../../testing');

describe('HTTP / Recipes / Create', () => {
  let testControls;

  beforeAll(async () => {
    testControls = await setupIntegrationTest();
  });

  beforeEach(async () => {
    await testControls.prepareEach();
  });

  afterAll(async () => {
    await testControls.cleanup();
  });

  describe('when valid data is sent', () => {
    it('creates a recipe', async () => {
      const response = await testControls
        .request()
        .post('/api/recipes')
        .set('Accept', 'application/json')
        .send({
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
        })
        .expect(201);

      expect(response.body).toEqual({
        data: {
          id: expect.any(String),
          name: 'Bacon pancakes',
          preparationTime: 5,
          steps: [
            { description: 'Make some bacon', position: 1 },
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
            { name: 'Vegetable oil', amount: 5, unit: 'l' },
            { name: 'Bacon', amount: 200, unit: 'g' },
          ],
        },
      });
    });
  });
});
