import express from "express";
import cors from "cors";


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