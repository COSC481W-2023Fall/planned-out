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