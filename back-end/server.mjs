import express from "express";
import cors from "cors";
import data from "./message.json" assert { "type": "json" };
import db from "./db/conn.mjs";
import bcrypt from 'bcryptjs'

const PORT = process.env.PORT || 5050;
const app = express();
const salt = '$2a$10$CwTycUXWue0Thq9StjUM0u';

app.use(cors());
app.use(express.json());

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

app.get("/hello-world", async (req, res) => {
    res.send(data);
    //console.log(data.message);
});

// POST for registering user information
app.post("/register", async (req, res) => {
    // get username to test to see if it exists in database
    const username = req.body.username;
    // hash user password for secure storage in database
    const hashedPwd = bcrypt.hashSync(req.body.password, salt);

    let userInfo = {
        user: username,
        pwd: hashedPwd,
        userFirst: req.body.fname,
        userLast: req.body.lname,
        userEmail: req.body.email
    };

    // make collections = a search of all collections with username as the name of the collection
    const collections = await db.listCollections().toArray();
    const existingCollection = collections.find(collection => collection.name === username);

    //console.log(existingCollection);

    // check collections length
    if (!existingCollection) {
        db.createCollection(userInfo.user);
        let collection = await db.collection(userInfo.user);
        let result = await collection.insertOne(userInfo);
        res.status(200);
        res.send(result);
        //console.log("Super Unique")
    } else {
        res.status(500);
        res.send({ "Error": "User already exists" });
        //console.log("Not so unique")
    }
});

app.post("/add", async (req, res) => {
    let newDocument = {
        taskName: req.body.name,
        taskDate: req.body.date,
        taskDesc: req.body.desc,
        taskStatus: "Incomplete",
        user: req.body.user
    };
    let collection = await db.collection("Tasks");
    let result = await collection.insertOne(newDocument);
    // Wait until the new task has reached the database
    while (!result) {
        res.status(500);
    }
    res.send(result).status(201);
    //console.log("ADDED TASK")
});

app.put("/updatetask/:id", async (req, res) => {
    let collection = await db.collection("Tasks");
    const taskID = req.body.id;
    let newStatus = req.body.status;

    if (newStatus != null) {
        const result = await db.collection("Tasks").updateOne(
            { "taskName": req.body.name },
            { $set: { "taskStatus": newStatus } }
        );

        res.send(result).status(204);
        //console.log(result);
    }
    else {
        //console.log("ERROR: The new status is null");
    }
    //console.log("ID: " + taskID + " New Status: " + newStatus);
});

app.post("/login", async (req, res) => {
    // Get username and hased password from the front end.
    const username = req.body.username;
    const hashedPwd = await bcrypt.hashSync(req.body.password, salt);

    // Connect to the Users collection.
    let collection = await db.collection(username);
    // Get the information for the given user
    let results = await collection.find({ "pwd": hashedPwd }).toArray();

    // Send user's info to frontend if successful
    if (results.length > 0) {
        //console.log(results.length);
        res.status(200);
        res.send({ "username": username });
    } // if unsuccessful, send error
    else {
        //console.log("ERROR: The new status is null");
        res.status(403);
        res.send({ "Status": "Error" });
    }
    //console.log(results);
});

app.post("/:username", async (req, res) => {
    // Grabbing our username from the URL
    const username = req.body.username;
    //console.log(username)

    // Select tasks collection to find our user's tasks specifically
    let collection = await db.collection("Tasks");

    // Narrow down collection to only user's tasks
    let results = await collection.find({ "user": username }).toArray();

    // display results for testing
    //console.log("results: ", results);

    res.send(results).status(200);
});

app.put("/update", async (req, res) => {    // update user password
    //console.log("update: " + req.body.username);
    const username = req.body.username;
    const hashedPwd = await bcrypt.hashSync(req.body.password, salt);   // hash user password
    //console.log(username);
    //console.log(hashedPwd);
    // Connect to the Users collection.
    let collection = await db.collection(username);
    // Get the information for the given user
    let results = await collection.find({ "pwd": hashedPwd }).toArray();
    //console.log(results.length);
    const newPwd = await bcrypt.hashSync(req.body.newPassword, salt);
    //console.log(newPwd);
    if (results.length > 0) {   // check if password is correct

        let updatePassword = await db.collection(username).updateOne(
            { "user": username },
            { $set: { "pwd": newPwd } }
        )
        res.status(200);
        res.send({ "username": username });   // send new password
    }
    else {
        //console.log("ERROR: The new status is null");
        res.status(403);
        res.send({ "Status": "Error" });
    }
    //console.log(results);
});

app.put("/delete-all-tasks", async (req, res) => {
    // Get the username
    const username = req.body.username;

    //console.log("DELETE TASKS USERNAME IS ",username);
    // Get the Tasks collection
    let collection = await db.collection("Tasks");
    // Delete all of that user's tasks
    let result = await collection.deleteMany({ "user": username });

    // Send result and log
    res.send(result).status(201);
    //console.log("ALL TASKS FOR", username, "DELETED");
});

app.put("/delete-account", async (req, res) => {
    // Get the username
    const username = req.body.username;

    // Get the user's collection
    let collection = await db.collection(username);
    // Drop the user's collection
    let result = await collection.drop();

    // Send result and log
    res.send(result).status(201);
    //console.log("ACCOUNT", username, "DELETED");
});

app.put("/get-profile-picture", async (req, res) => {
    // Get the username
    const username = req.body.username;
    // Get the user's collection
    let collection = await db.collection(username);
    // Get the profile pic type
    let result = await collection.findOne({ user: username }, { $get: "profile_picture" });

    // Send result and log
    res.send(result).status(201);
    //console.log("FETCHED PROFILE PIC");
});

function convertDateForDb(dateToBeConverted) {
    let month = dateToBeConverted.getMonth() + 1;
    let date = dateToBeConverted.getDate();
    if (date < 10) {
        date = "0" + date;
    }
    let year = dateToBeConverted.getFullYear();
    return month + "-" + date + "-" + year;
}

app.put("/get-friend-info", async (req, res) => {
    // Get the username
    const username = req.body.username;
    // Get the date range
    const dateRange = req.body.dateRange;

    // Get the user's collection
    let collection = await db.collection(username);
    // Get the profile pic type
    let result = await collection.findOne({ user: username }, { $get: "profile_picture" });

    let tasksCollection = await db.collection("Tasks");

    let numOfTasksCompleted = 0;
    let numOfTasks = 0;
    let percentOfTasks = 0;

    // If the date range is daily
    if (dateRange == 'daily') {
        // Get today's date and convert it for db
        let today = new Date();
        let dateToSend = convertDateForDb(today);

        // Get the user's number of completed tasks
        numOfTasksCompleted = await tasksCollection.countDocuments({ "user": username, "taskStatus": "Complete", "taskDate": dateToSend });
        // Get the user's number of total tasks
        numOfTasks = await tasksCollection.countDocuments({ "user": username, "taskDate": dateToSend });
        // Calculate the completed task percentage
        percentOfTasks = Math.round((numOfTasksCompleted / numOfTasks) * 100);
    }

    // If the date range is weekly
    if (dateRange == 'weekly') {
        // Get today's date
        let dateToday = new Date();
        // Convert today's date into db date format
        let dateTodayToSend = convertDateForDb(dateToday);

        // Week ago date
        let weekAgoDate = dateToday;
        weekAgoDate.setDate(weekAgoDate.getDate() - 7);
        // Conver week ago date into db date format
        let weekAgoDateToSend = convertDateForDb(weekAgoDate);

        // Get the user's number of completed tasks
        numOfTasksCompleted = await tasksCollection.countDocuments({
            "user": username, "taskStatus": "Complete", "taskDate": {
                $gte: weekAgoDateToSend,
                $lte: dateTodayToSend
            }
        });
        // Get the user's number of total tasks
        numOfTasks = await tasksCollection.countDocuments({
            "user": username, "taskDate": {
                $gte: weekAgoDateToSend,
                $lte: dateTodayToSend
            }
        });
        // Calculate the completed task percentage
        percentOfTasks = Math.round((numOfTasksCompleted / numOfTasks) * 100);
    }

    // If the date range is monthly
    if (dateRange == 'monthly') {
        // Get today's date
        let dateToday = new Date();
        // Convert today's date into db date format
        let dateTodayToSend = convertDateForDb(dateToday);

        // Month ago date
        let monthAgoDate = dateToday;
        monthAgoDate.setDate(monthAgoDate.getDate() - 31);
        // Conver week ago date into db date format
        let monthAgoDateToSend = convertDateForDb(monthAgoDate);

        // Get the user's number of completed tasks
        numOfTasksCompleted = await tasksCollection.countDocuments({
            "user": username, "taskStatus": "Complete", "taskDate": {
                $gte: monthAgoDateToSend,
                $lte: dateTodayToSend
            }
        });
        // Get the user's number of total tasks
        numOfTasks = await tasksCollection.countDocuments({
            "user": username, "taskDate": {
                $gte: monthAgoDateToSend,
                $lte: dateTodayToSend
            }
        });
    }

    // If the date range is total of all tasks
    if (dateRange == 'total') {
        // Get the user's number of completed tasks
        numOfTasksCompleted = await tasksCollection.countDocuments({ "user": username, "taskStatus": "Complete" });
        // Get the user's number of total tasks
        numOfTasks = await tasksCollection.countDocuments({ "user": username });
    }

    // Calculate the completed task percentage
    percentOfTasks = Math.round((numOfTasksCompleted / numOfTasks) * 100);

    if (isNaN(percentOfTasks)) {
        percentOfTasks = 0;
    }

    let userAndTasksCompleted = {
        firstName: result['userFirst'],
        lastName: result['userLast'], 
        username: result['user'],
        profilePic: result['profile_picture'],
        numOfTasksCompleted: numOfTasksCompleted,
        numOfTasks: numOfTasks,
        percentOfTasks: percentOfTasks
    }

    // Send result
    res.send(userAndTasksCompleted).status(201);
});

app.put("/update-profile-picture", async (req, res) => {
    // Get the username
    const username = req.body.username;
    // Get the profile pic
    const profilePic = req.body.profilePic;

    // Get the user's collection
    let collection = await db.collection(username);
    // Update the profile picture type
    let result = collection.updateOne({ "user": username }, { $set: { "profile_picture": profilePic } });

    // Send result and log
    res.send(result).status(201);
});

app.put("/add-friend", async (req, res) => {
    let result = null;
    // Get the user's username
    const username = req.body.username;
    // Get the potential friend's username
    const friendUsername = req.body.friendUsername;

    // Get the user's collection
    let userCollection = await db.collection(username);

    // Get all collections and attempt to find the friend's collection
    const collections = await db.listCollections().toArray();
    const existingUser = await collections.find(collection => collection.name === friendUsername);

    // If the friend's username actually exists
    if (existingUser) {
        // Check if the friend is already in the collection
        const friendExists = await userCollection.findOne({ "friends": friendUsername });
        if (!friendExists) {
            // If the user doesn't already have the incoming friend as a friend
            result = await userCollection.updateOne({ "user": username }, { "$push": { "friends": friendUsername } });
            res.send(result).status(201);
        }
        else {
            res.statusMessage = "The friend was already in the collection";
            res.status(400).end();
        }
    }
    else {
        res.statusMessage = "The friend's username was not found in the database.";
        res.status(400).end();
    }
});

app.put("/get-friends", async (req, res) => {
    // Get the username
    const username = req.body.username;

    // Get the user's collection
    let collection = await db.collection(username);

    // Only try to get the profile picture if the user exists 
    if (collection) {
        // Get the profile pic type
        let result = await collection.findOne({ user: username }, { $get: "profile_picture" });
        res.send(result).status(201);
    }
    else {
        res.status(400);
    };
});
