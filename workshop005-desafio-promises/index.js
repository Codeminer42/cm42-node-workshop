const fetch = require("node-fetch");

function buildPostsUrl(page, limit) {
  return `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
}

function buildCommentsUrl(postId) {
  return `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
}

function buildUsersUrl(userId) {
  return `https://jsonplaceholder.typicode.com/users/${userId}`;
}

function fetchPosts(page, batch) {
  return fetch(buildPostsUrl(page, batch)).then((response) => response.json());
}

function fetchCommentsForPosts(postsArr) {
  return Promise.all(
    postsArr.map((post) => {
      return fetch(buildCommentsUrl(post.id)).then((response) =>
        response.json()
      );
    })
  );
}

function fetchUsersByIds(userIds) {
  return Promise.all(
    userIds.map((userId) =>
      fetch(buildUsersUrl(userId)).then((response) => response.json())
    )
  );
}

function assembleCommentsToPosts(posts, comments) {
  return posts.map((post, index) => ({
    ...post,
    comments: comments[index],
  }));
}

async function main() {
  const batch = 20;
  const goal = 95;
  const maxSteps = Math.ceil(goal / batch);
  let postsAcc = [];

  for (let page = 1; page <= maxSteps; page++) {
    const posts = await fetchPosts(page, batch);
    const comments = await fetchCommentsForPosts(posts);
    const postsWithComments = assembleCommentsToPosts(posts, comments);
    postsAcc = [...postsAcc, ...postsWithComments];
  }

  const uniqueUserIds = [...new Set(postsAcc.map((post) => post.userId))];
  const users = await fetchUsersByIds(uniqueUserIds);
}

main();
