import {MongoClient} from "mongodb";

let uri = 'mongodb+srv://admin:SZIESYi6rteN7wjN@planned-out-database.g8zc5cf.mongodb.net/?retryWrites=true&w=majority';
let conn, db;


beforeAll(async () => {
  conn = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = await conn.db("Tasks");

});

it("check that registration user exists", async () => {
    let test = "";
    let names = await db.listCollections({}, { nameOnly: true }).toArray();
    for(let i = 0; i < names.length; i++){
      if(names[i].name == "RegistrationTest"){
        test = "User Exists";
        break;
      }else{
        test = "User Does Not Exist";
        
      }
    }
    expect(test).toBe("User Exists")
});
