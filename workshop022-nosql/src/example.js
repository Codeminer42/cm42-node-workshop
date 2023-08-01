const main = async () => {
  const { MongoClient } = require("mongodb");

  const client = new MongoClient("mongodb://foo:bar@localhost:27017");

  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Failed to connect:\n\n", e);
  }

  const db = client.db("test_mongo");

  const collection = db.collection("ex_collection");

  await collection.insertOne({
    username: "foo",
    email: "foo@bar.com",
    age: 28,
    address: {
      street: "Sesame street",
      country: "Brazil",
    },
    posts: [
      {
        title: "Post 1",
        content: "Post 1 content",
      },
      {
        title: "Post 2",
        content: "Post 2 content",
      },
    ],
  });

  await client.close();
};

main();
