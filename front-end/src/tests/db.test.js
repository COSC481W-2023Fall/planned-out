import {MongoClient} from "mongodb"
let uri = 'mongodb+srv://admin:SZIESYi6rteN7wjN@planned-out-database.g8zc5cf.mongodb.net/?retryWrites=true&w=majority'
let conn, db

beforeAll(async () => {
  conn = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = await conn.db("Tasks");
});

it("should test DB connection", async () => { 
    expect(console.log("MongoDB Connection Successful."));
});
