import { MongoClient } from "mongodb";

const username = encodeURIComponent("admin");
const password = encodeURIComponent("SZIESYi6rteN7wjN")
let uri = 'mongodb+srv://admin:SZIESYi6rteN7wjN@planned-out-database.g8zc5cf.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri)

let conn;
try{
  conn = await client.connect();
  
  console.log("MongoDB Connection Successful.")
}catch(e){
  console.error(e)
}

let db = conn.db("Tasks")

export default db;