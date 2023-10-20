import express from "express";
import cors from "cors";
import data from "./message.json" assert { "type": "json"}
import db from "./database/conn.mjs";


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.get("/", async (req, res) => {
//   const url = ""; // replace with API url 

// const fetchTasks = async () => {
//   try {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch Tasks');
//   }
//   const tasks = await response.json();
//   counsole.log('Fetched tasks', tasks);
//   return tasks;
//   } catch(error) {
//     console.error('Error when fetching tasks', error);
//   }
// }
    console.log("Hi");
    let collection = await db.collection("Tasks");
    let results = await collection.find({}).toArray();
    // for(let result of results){

    //     console.log(result);    // calling the object
    // }
    for(var i = 0; i < results.length; i++){
        console.log(results[i].taskDate);
        results[i] = results[i].taskDate;
    }
    console.log("GET / request")
    res.send("Welcome to the Server!").status(200)
});

app.get("/hello-world", async (req, res) => {
    res.send(data);
    console.log(data.message);
});

