import { Id } from '../../../domain/Id';
import { IntegrationTestControls, setupIntegrationTest } from '../../../testing';
import { balanceSnapshotFactory } from '../../../testing/factories/BalanceSnapshotFactory';
import { ledgerFactory } from '../../../testing/factories/LedgerFactory';
import { makeObjectionGetLedgerBalanceSnapshot } from '../ObjectionGetLedgerBalanceSnapshot';

describe('Infra / Balance / GetLedgerBalanceSnapshot', () => {
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

  describe('when the ledger has a snapshot', () => {
    describe('and the snapshot has one entry', () => {
      it('should return the snapshot with only that entry', async () => {
        const getLedgerBalanceSnapshot = makeObjectionGetLedgerBalanceSnapshot();

        const ledger = await ledgerFactory();
        const snapshot = await balanceSnapshotFactory({ ledger_id: ledger.id, balance: { USD: 123 } });
        const result = await getLedgerBalanceSnapshot(ledger.id);

        expect(result).toEqual({
          createdAt: snapshot.created_at,
          balance: {
            USD: 123,
          },
        });
      });
    });

    describe('and the snapshot has many entries', () => {
      it('should return the snapshot with all the entries', async () => {
        const getLedgerBalanceSnapshot = makeObjectionGetLedgerBalanceSnapshot();

        const ledger = await ledgerFactory();
        const snapshot = await balanceSnapshotFactory({
          ledger_id: ledger.id,
          balance: { USD: 123, BRL: -456, EUR: 789 },
        });
        const result = await getLedgerBalanceSnapshot(ledger.id);

        expect(result).toEqual({
          createdAt: snapshot.created_at,
          balance: {
            USD: 123,
            BRL: -456,
            EUR: 789,
          },
        });
      });
    });
  });

  describe('when no ledger id is provided', () => {
    it('should return the general balance snapshot', async () => {
      const getLedgerBalanceSnapshot = makeObjectionGetLedgerBalanceSnapshot();

      const snapshot = await balanceSnapshotFactory({ ledger_id: null, balance: { USD: 110, BRL: -500, EUR: 300 } });
      const result = await getLedgerBalanceSnapshot();

      expect(result).toEqual({
        createdAt: snapshot.created_at,
        balance: { USD: 110, BRL: -500, EUR: 300 },
      });
    });
  });

  describe('when the ledger does not have a snapshot', () => {
    it('should return null', async () => {
      const getLedgerBalanceSnapshot = makeObjectionGetLedgerBalanceSnapshot();

      const ledger = await ledgerFactory();
      const result = await getLedgerBalanceSnapshot(ledger.id);

      expect(result).toBeNull();
    });
  });

  describe("when there isn't ledger with the specified id", () => {
    it('should return null', async () => {
      const getLedgerBalanceSnapshot = makeObjectionGetLedgerBalanceSnapshot();

      const fakeLedgerId = Id.create();
      const result = await getLedgerBalanceSnapshot(fakeLedgerId);

      expect(result).toBeNull();
    });
  });
});
