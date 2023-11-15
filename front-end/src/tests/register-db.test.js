import {MongoClient} from "mongodb";

let uri = 'mongodb+srv://admin:SZIESYi6rteN7wjN@planned-out-database.g8zc5cf.mongodb.net/?retryWrites=true&w=majority';
let conn, db, results;


beforeAll(async () => {
  conn = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = await conn.db("Tasks");
  let collection = await db.collection("RegistrationTest");
  results = await collection.find({ "pwd": "$2a$10$CwTycUXWue0Thq9StjUM0uCZsf8JAaTWSLtv7sVGzBbZsx96M0pcK" }).toArray();

});

it("check that registration user exists", async () => { 
    expect(console.log(results));
});
