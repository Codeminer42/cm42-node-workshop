const { setupIntegrationTest } = require('../../../../testing');

describe('HTTP / Recipes / Search', () => {
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
  })
});
