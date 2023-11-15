import { MongoClient } from "mongodb";
import bcrypt from 'bcryptjs'

let uri = 'mongodb+srv://admin:SZIESYi6rteN7wjN@planned-out-database.g8zc5cf.mongodb.net/?retryWrites=true&w=majority';
let conn, db, results;
const salt = '$2a$10$CwTycUXWue0Thq9StjUM0u';

beforeAll(async () => {
    conn = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const username = "testuserforlogin";
    const password = "asdfasdf";
    const hashedPwd = await bcrypt.hashSync(password, salt);

    db = await conn.db("Tasks");

    // Connect to the Users collection.
    let collection = await db.collection(username);
    // Get the information for the given user
    results = await collection.find({ "pwd": hashedPwd }).toArray();

});

it("check that registration user exists", async () => {
    expect(results.length > 0).toBeTruthy();
});