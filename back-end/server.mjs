import express from "express";
import cors from "cors";
import data from "./message.json" assert { "type": "json" };
import db from "./db/conn.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.get("/", async (req, res) => {
  let collection = await db.collection("Tasks");
  let results = await collection.find({}).toArray();
  console.log("results: ", results);
  res.send(results).status(200);
});

app.get("/hello-world", async (req, res) => {
  res.send(data);
  console.log(data.message);
});

app.post("/add", async (req, res) => {
  let newDocument = {
      taskName: req.body.name,
      taskDate: req.body.date,
      taskDesc: req.body.desc,
      taskStatus: "Incomplete"
    };
    let collection = await db.collection("Tasks");
    let result = await collection.insertOne(newDocument);
    // Wait until the new task has reached the database
    while (!result) {
        res.status(500)
    }
    res.send(result).status(201);
});

app.put("/updatetask/:id", async (req, res) => {
  let collection = await db.collection("Tasks");
  const taskID = req.body.id;
  let newStatus = req.body.status;

  if (newStatus != null) {
    const result = await db.collection("Tasks").updateOne(
      { "taskName": req.body.name},
      { $set: { "taskStatus": newStatus } }
    );

    res.send(result).status(204);
    console.log(result);
  }
  else {
    console.log("ERROR: The new status is null");
  }
  console.log("ID: " + taskID + " New Status: " + newStatus);
});

app.get("/login/:username", async (req, res) => {
    // Get username and hased password from the front end.
    const username = req.body.username;
    const hashedPW = req.body.password;

    // Connect to the Users collection.
    let collection = await db.collection("Users");
    // Get the information for the given user
    let results = await collection.find({username}).toArray();

    // Check if the database user password matches the hashed password from the front end
    if (results.password === hashedPW) {
        // TO DO: Send the confirmation to the front end so it can call the users home page.
        res.send()
    }
});