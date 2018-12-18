const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const mongodb_url = "mongob://localhost/node-app-test";

// Step 1 - Connect to mongodb using mongoose;
mongoose
  .connect(
    mongodb_url,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");

    // Step 2 - Define a schema
    const fellowSchema = mongoose.Schema({
      name: String,
      favoriteInstructor: String
    });

    // Step 3 - Define a Model
    const Fellow = mongoose.model("Fellow", fellowSchema);
  })
  .catch(console.error.bind(this));

// Middlewares
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("URL being retrieved:", req.originalUrl);
  if (["POST", "PUT"].includes(req.method)) {
    console.log("Request Body:", req.body);
  }
  next();
});

// Route (Get)
app.get("/fellows", function(req, res) {
  console.log("Getting all fellows");

  return Fellow.find()
    .exec()
    .then(function(result) {
      return res.json({ fellows: result });
    });
});

// Route (Create)
app.post("/fellows", function(req, res) {
  const fellowData = req.body;
  const newFellow = new Fellow(fellowData);

  return newFellow.save()
    .then(fellow => {
      console.log("Hey fellow created");
      return res.json({ message: "fellow created", fellow });
    });
});

app.listen(3001, () => console.log("App listening on port 3001"));
