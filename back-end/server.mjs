import express from "express";
import cors from "cors";
import data from "./message.json" assert { "type": "json" };
import db from "./db/conn.mjs";
import bcrypt from 'bcryptjs'

const PORT = process.env.PORT || 5050;
const app = express();
const salt = bcrypt.genSaltSync(5);

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

// POST for registering user information
app.post("/register", async (req, res) => {
  // hash user password for secure storage in database
  const hashedPwd = bcrypt.hashSync(req.body.password, salt);

  // schema to store all user information in collection
  let userInfo = {
    user: req.body.username,
    pwd: hashedPwd,
    userFirst: req.body.fname,
    userLast: req.body.lname,
    userEmail: req.body.email
  };

  // create collection named "user-email"
  db.createCollection(userInfo.user);
  let collection = await db.collection(userInfo.user);
  let result = await collection.insertOne(userInfo);

  while(!result){
    res.status(500);
  }
  res.send(result).status(201); 
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

app.post("/login", async (req, res) => {
    // Get username and hased password from the front end.
    const username = req.body.username;
    const hashedPwd = await bcrypt.hashSync(req.body.password, salt);

    // Connect to the Users collection.
    let collection = await db.collection(username);
    // Get the information for the given user
    let results = await collection.find({}).toArray();

    console.log(results);
    console.log(hashedPwd);

});