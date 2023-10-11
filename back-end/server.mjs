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
    res.send("Welcome to the Server!").status(200)
});

app.get("/hello-world", async (req, res) => {
    res.send(data);
    console.log(data.message);
});