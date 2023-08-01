import { Knex } from 'knex';
import { Model } from 'objection';
import { makeEntryFactoryWithSeed } from '../../../testing/factories/EntryFactory';

export async function seed(knex: Knex): Promise<void> {
  Model.knex(knex);

  const factory = makeEntryFactoryWithSeed(42);

  // Deletes ALL existing entries
  await knex('entries').del();

  // Inserts seed entries
  await factory(1000);
}
