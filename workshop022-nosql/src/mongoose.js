const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  age: Number,
  address: {
    street: String,
    country: String,
  },
  posts: [{ title: String, content: String }],
});

const User = new mongoose.model("User", userSchema);

const main = async () => {
  try {
    await mongoose.connect(
      "mongodb://foo:bar@localhost:27017/test_mongoose?authSource=admin"
    );
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Failed to connect:\n\n", e);
  }

  const user = new User();

  user.username = "bar";
  user.email = "bar@foo.com";
  user.age = 22;
  user.address = {
    street: "Sesame street",
    country: "Brazil",
  };
  user.posts = [
    {
      title: "Post 1",
      content: "Post 1 content",
    },
    {
      title: "Post 2",
      content: "Post 2 content",
    },
  ];

  await savedUser.save();

  const savedUser = await User.findOne({ username: "bar" });

  savedUser.posts[1].title = "Post 2 updated";

  await savedUser.save();

  await savedUser.findOneAndUpdate(
    { username: "bar" },
    { $set: { "posts.0.title": "Post 1 foi?" } }
  );

  await mongoose.connection.close();
};

main();
