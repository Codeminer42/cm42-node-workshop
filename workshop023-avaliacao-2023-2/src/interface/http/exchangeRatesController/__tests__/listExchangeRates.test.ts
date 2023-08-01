import { setupIntegrationTest, IntegrationTestControls } from '../../../../testing';

describe('HTTP / Exchange Rates / List', () => {
  let testControls: IntegrationTestControls;

  beforeAll(async () => {
    testControls = await setupIntegrationTest();
  });

  afterAll(async () => {
    await testControls.cleanup();
  });

  it('returns the exchange rates', async () => {
    const { status, body } = await testControls.request.get('/api/exchange_rates');

    expect(status).toBe(200);
    expect(body).toEqual({
      'BRL-EUR': 0.18,
      'USD-BRL': 5.33,
      'USD-EUR': 0.95,
    });
  });
});
