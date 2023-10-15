import express from "express";
import cors from "cors";
import data from "./message.json" assert { "type": "json"}


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.get("/", async (req, res) => {
    console.log("GET / request")
    res.send("Welcome to the Server!").status(200)
});

app.get("/hello-world", async (req, res) => {
    res.send(data);
    console.log(data.message);
});

app.post("/add", async (req, res) => {
    let newDocument = {
        taskName: req.body.name,
        taskDate: req.body.date,
        taskDesc: req.body.desc
      };
      let collection = await db.collection("Tasks");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
});