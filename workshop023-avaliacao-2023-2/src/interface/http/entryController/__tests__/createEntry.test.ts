import { Model } from 'objection';
import { EntryModel } from '../../../../infra/database/models/EntryModel';
import { LedgerModel } from '../../../../infra/database/models/LedgerModel';
import { setupIntegrationTest, IntegrationTestControls } from '../../../../testing';

describe('HTTP / Entry / Create', () => {
  let testControls: IntegrationTestControls;

  const getEntityCount = (entityModel: typeof Model) => () => entityModel.query().resultSize();

  const getEntryCount = getEntityCount(EntryModel);
  const getLedgerCount = getEntityCount(LedgerModel);

  beforeAll(async () => {
    testControls = await setupIntegrationTest();
  });

  beforeEach(async () => {
    await testControls.prepareEach();
  });

  afterAll(async () => {
    await testControls.cleanup();
  });

  describe('when sending valid entry data', () => {
    const createEntry = async () =>
      testControls.request.post('/api/entries').send({
        amount: 20,
        type: 'in',
        ledger: 'Book A',
        currency: 'USD',
      });

    describe('when the ledger does not exist', () => {
      it('creates a new entry', async () => {
        const { status, body } = await createEntry();

        expect(status).toEqual(201);
        expect(body).toEqual({
          success: {
            message: 'New entry added to Book A ledger',
          },
        });
        expect(await getEntryCount()).toEqual(1);
      });

      it('creates a new ledger', async () => {
        const initialCount = await getLedgerCount();
        await createEntry();
        const finalCount = await getLedgerCount();

        expect(initialCount).toBeLessThan(finalCount);
      });
    });

    describe('when adding an entry to an existing ledger', () => {
      const createEntry = async () =>
        await testControls.request.post('/api/entries').send({
          amount: 20,
          type: 'in',
          ledger: 'Book A',
          currency: 'USD',
        });

      beforeEach(async () => {
        await createEntry();
      });

      it('does not create a new ledger', async () => {
        const initialCount = await getLedgerCount();
        await createEntry();
        const finalCount = await getLedgerCount();

        expect(initialCount).toEqual(finalCount);
        expect(await getEntryCount()).toEqual(2);
      });
    });

    describe('floating point amount', () => {
      const createEntry = async (amount: number) =>
        testControls.request.post('/api/entries').send({
          amount: amount,
          type: 'in',
          ledger: 'Book A',
          currency: 'USD',
        });

      it('accepts floating point amount', async () => {
        const { status, body } = await createEntry(20.5);

        expect(status).toEqual(201);
        expect(body).toEqual({
          success: {
            message: 'New entry added to Book A ledger',
          },
        });
        expect(await getEntryCount()).toEqual(1);
      });

      it('rounds if there are more than two decimals', async () => {
        const { status, body } = await createEntry(20.555);

        expect(status).toEqual(201);
        expect(body).toEqual({
          success: {
            message: 'New entry added to Book A ledger',
          },
        });
        expect(await getEntryCount()).toEqual(1);
      });
    });

    describe('currency case insensitivity', () => {
      it('accepts uppercase currency', async () => {
        const { status } = await testControls.request.post('/api/entries').send({
          amount: 20,
          type: 'in',
          ledger: 'Book A',
          currency: 'USD',
        });

        expect(status).toEqual(201);
        expect(await getEntryCount()).toEqual(1);
      });
    });
  });

  describe('when sending invalid data', () => {
    describe('invalid currency', () => {
      it('returns an Unprocessable Entity error', async () => {
        const { status, body } = await testControls.request.post('/api/entries').send({
          amount: 20,
          type: 'in',
          ledger: 'Book A',
          currency: 'invalid',
        });

        expect(status).toEqual(422);
        expect(body).toEqual({
          error: {
            details: ['Invalid currency'],
            message: 'Validation Error',
            type: 'ValidationError',
          },
        });
        expect(await getEntryCount()).toEqual(0);
      });
    });

    describe('invalid type', () => {
      it('returns an Unprocessable Entity error', async () => {
        const { status, body } = await testControls.request.post('/api/entries').send({
          amount: 20,
          type: 'invalid',
          ledger: 'Book A',
          currency: 'usd',
        });

        expect(status).toEqual(422);
        expect(body).toEqual({
          error: {
            details: ['Invalid entry type'],
            message: 'Validation Error',
            type: 'ValidationError',
          },
        });
        expect(await getEntryCount()).toEqual(0);
      });
    });

    describe('invalid amount', () => {
      it('returns an Unprocessable Entity error', async () => {
        const { status, body } = await testControls.request.post('/api/entries').send({
          amount: -5,
          type: 'in',
          ledger: 'Book A',
          currency: 'usd',
        });

        expect(status).toEqual(422);
        expect(body).toEqual({
          error: {
            details: ['Amount should be a positive number'],
            message: 'Validation Error',
            type: 'ValidationError',
          },
        });
        expect(await getEntryCount()).toEqual(0);
      });
    });

    describe('required fields', () => {
      describe('currency not provided', () => {
        it('returns an Unprocessable Entity error', async () => {
          const { status, body } = await testControls.request.post('/api/entries').send({
            amount: 20,
            type: 'in',
            ledger: 'Book A',
          });

          expect(status).toEqual(422);
          expect(body).toEqual({
            error: {
              details: ['Currency cannot be empty'],
              message: 'Validation Error',
              type: 'ValidationError',
            },
          });
          expect(await getEntryCount()).toEqual(0);
        });
      });

      describe('type not provided', () => {
        it('returns an Unprocessable Entity error', async () => {
          const { status, body } = await testControls.request.post('/api/entries').send({
            amount: 20,
            ledger: 'Book A',
            currency: 'usd',
          });

          expect(status).toEqual(422);
          expect(body).toEqual({
            error: {
              details: ['Type cannot be empty'],
              message: 'Validation Error',
              type: 'ValidationError',
            },
          });
          expect(await getEntryCount()).toEqual(0);
        });
      });

      describe('amount not provided', () => {
        it('returns an Unprocessable Entity error', async () => {
          const { status, body } = await testControls.request.post('/api/entries').send({
            type: 'in',
            ledger: 'Book A',
            currency: 'usd',
          });

          expect(status).toEqual(422);
          expect(body).toEqual({
            error: {
              details: ['Amount cannot be empty'],
              message: 'Validation Error',
              type: 'ValidationError',
            },
          });
          expect(await getEntryCount()).toEqual(0);
        });
      });

      describe('ledger not provided', () => {
        it('returns an Unprocessable Entity error', async () => {
          const { status, body } = await testControls.request.post('/api/entries').send({
            amount: 20,
            type: 'in',
            currency: 'usd',
          });

          expect(status).toEqual(422);
          expect(body).toEqual({
            error: {
              details: ['Ledger name cannot be empty'],
              message: 'Validation Error',
              type: 'ValidationError',
            },
          });
          expect(await getEntryCount()).toEqual(0);
        });
      });
    });
  });
});
