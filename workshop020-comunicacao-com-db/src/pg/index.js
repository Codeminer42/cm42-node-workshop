const db = require('./db');

async function run() {
  await db.query('DROP TABLE IF EXISTS users, posts;');

  await db.query('CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);');
  await db.query('CREATE TABLE posts (content TEXT, user_id INT, FOREIGN KEY (user_id) REFERENCES users(id));');

  const name = 'User Pg';
  const result = await db.query('INSERT INTO users (name) VALUES($1) RETURNING *', [name]);

  const insertedUserId = result.rows[0].id;

  const content = 'some pg post content';
  await db.query(
    'INSERT INTO posts (content, user_id) VALUES ($1, $2)',
    [content, insertedUserId]
  );

  const usersPosts = await db.query(
    'SELECT * FROM users INNER JOIN posts ON users.id = posts.user_id'
  );

  console.log(usersPosts.rows);

  db.end();
}

run();
