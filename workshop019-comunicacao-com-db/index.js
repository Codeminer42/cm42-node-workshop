const db = require('./db');
const knex = require('./knex');

async function main() {
  //   await db.query(
  //     'CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(255))'
  //   );

  const name = `user-${Date.now()}`;

  //   await db.query('SELECT * FROM users').then((rows) => console.log(rows));
  //   await db.query('INSERT INTO users (name) VALUES($1)', [name]);

  await knex('users').insert({ name });
  const result = await knex('users').select();

  console.log(result);
}

main();
