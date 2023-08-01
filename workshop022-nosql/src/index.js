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

  const collection = db.collection("test_collection");

  await collection.drop();

  await collection.insertMany([
    { foo: "bar", x: 1, baz: [1, 2, 3] },
    { bar: ["foo"], x: 9 },
    { bar: "bar", x: 3, baz: 5 },
  ]);

  const records = collection.find({ x: { $lt: 5 } });

  for await (const record of records) {
    console.log(record);
  }

  await client.close();
};

main();
