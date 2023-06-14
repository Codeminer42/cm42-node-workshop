const db = require('../db');

async function run() {
  const name = 'User Pg';
  const {
    rows: [{ id: insertedUserId }],
  } = await db.query('INSERT INTO users (name) VALUES($1) RETURNING *', [name]);

  const content = 'some pg post content';
  const post = await db.query(
    'INSERT INTO posts (content, user_id) VALUES ($1, $2)',
    [content, insertedUserId]
  );

  const usersPosts = await db.query(
    'SELECT * FROM users INNER JOIN posts ON users.id = posts.user_id'
  );

  console.log(usersPosts.rows);
}

run();
