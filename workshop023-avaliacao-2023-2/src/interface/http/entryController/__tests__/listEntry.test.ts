import { setupIntegrationTest, IntegrationTestControls } from '../../../../testing';
import { entryFactory } from '../../../../testing/factories/EntryFactory';

describe('HTTP / Entry / List', () => {
  let testControls: IntegrationTestControls;

  beforeAll(async () => {
    testControls = await setupIntegrationTest();
  });

  beforeEach(async () => {
    await testControls.prepareEach();
  });

  afterAll(async () => {
    await testControls.cleanup();
  });

  describe('indexing', () => {
    describe('when there are no entries', () => {
      it('returns an empty array', async () => {
        const response = await testControls.request.get('/api/entries');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });
    });

    describe('when there are entries', () => {
      beforeEach(async () => {
        await entryFactory(30);
      });

      it('returns an array of entries', async () => {
        const response = await testControls.request.get('/api/entries');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(30);
      });
    });
  });

  describe('pagination', () => {
    const stringToUnixTimestamp = (date: string) => new Date(date).getTime();

    describe('passing a valid page', () => {
      it('returns 7 entries per page', async () => {
        await entryFactory(10);

        const response = await testControls.request.get('/api/entries?page=0');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(7);
      });

      it('returns ordered by created_at', async () => {
        await entryFactory(10);

        const { body: body1 } = await testControls.request.get('/api/entries?page=0');
        const { body: body2 } = await testControls.request.get('/api/entries?page=1');

        expect(body1.length).toEqual(7);
        expect(body2.length).toEqual(3);
        expect(stringToUnixTimestamp(body1[body1.length - 1].date)).toBeLessThan(stringToUnixTimestamp(body2[0].date));
      });

      describe('when there are no more pages', () => {
        it('returns an empty array', async () => {
          await entryFactory(10);

          const response = await testControls.request.get('/api/entries?page=2');

          expect(response.status).toBe(200);
          expect(response.body).toEqual([]);
        });
      });
    });

    describe('page parameter validation', () => {
      describe('when page is not a number', () => {
        it('returns a validation error', async () => {
          const response = await testControls.request.get('/api/entries?page=not-a-number');

          expect(response.status).toBe(422);
          expect(response.body).toEqual({
            error: {
              message: 'Validation Error',
              type: 'ValidationError',
              details: ['Page should be a positive integer'],
            },
          });
        });
      });

      describe('when page is negative', () => {
        it('returns a validation error', async () => {
          const response = await testControls.request.get('/api/entries?page=-1');

          expect(response.status).toBe(422);
          expect(response.body).toEqual({
            error: {
              message: 'Validation Error',
              type: 'ValidationError',
              details: ['Page should be a positive integer'],
            },
          });
        });
      });
    });
  });

  describe('currency conversion', () => {
    const requestInCurrency = (currency: string) => testControls.request.get(`/api/entries?in_currency=${currency}`);

    describe('converting to USD', () => {
      it('returns the amount in USD', async () => {
        await entryFactory(1, { amount: 100_00, currency_symbol: 'EUR' });

        const response = await requestInCurrency('USD');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
          {
            id: expect.any(String),
            amount: 105.26,
            currency: 'USD',
            date: expect.any(String),
            ledger: expect.any(String),
            type: expect.any(String),
          },
        ]);
      });

      it('returns all entries in USD', async () => {
        await entryFactory(50);

        const response = await requestInCurrency('USD');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(50);
        response.body.map((entry: { currency: string }) => {
          expect(entry.currency).toEqual('USD');
        });
      });
    });

    describe('converting to EUR', () => {
      it('returns the amount in EUR', async () => {
        await entryFactory(1, { amount: 100_00, currency_symbol: 'USD' });

        const response = await requestInCurrency('EUR');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
          {
            id: expect.any(String),
            amount: 95,
            currency: 'EUR',
            date: expect.any(String),
            ledger: expect.any(String),
            type: expect.any(String),
          },
        ]);
      });

      it('returns all entries in EUR', async () => {
        await entryFactory(50);

        const response = await requestInCurrency('EUR');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(50);
        response.body.map((entry: { currency: string }) => {
          expect(entry.currency).toEqual('EUR');
        });
      });
    });
  });

  describe('paginating and converting', () => {
    it('accepts both query parameter', async () => {
      await entryFactory(10);

      const response = await testControls.request.get('/api/entries?page=1&in_currency=USD');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);
    });
  });
});
