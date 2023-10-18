import express from "express";
import cors from "cors";
import data from "./message.json" assert { "type": "json"}
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
    console.log("GET / request")

    console.log("Hello")
    let collection = await db.collection("Tasks");
    console.log("Hello1")
    let results = await collection.find( {} ).toArray();
    console.log("Hello2")
    for (var i = 0; i < results.length; i++) {
      results[i] = results[i].taskName;
      console.log(results);
    }

    res.send(results).status(200)
});

app.get("/hello-world", async (req, res) => {
    res.send(data);
    console.log(data.message);
});