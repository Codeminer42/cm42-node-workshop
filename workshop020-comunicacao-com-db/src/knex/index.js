const knex = require('./knex');

async function run() {
  const name = 'User';
  const [{ id: insertedUserId }] = await knex('users')
    .insert({ name })
    .returning('id');

  const content = 'Some post content';

  await knex('posts').insert({ content, user_id: insertedUserId });

  const userPosts = await knex('users')
    .join('posts', { 'users.id': 'posts.user_id' })
    .select();

  console.log(userPosts);

  knex.destroy();
}

run();
