const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mongodb:3nYH8uOZTozuTNK8@cluster0.c7q1k.mongodb.net/LMS?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log("Connected to the DB");
    const database = client.db('LMS');
    // code for creating indexes...
    // client.db('LMS').collection('syllabuses').createIndex('subjects.subject.code')
    // .then(response => {
    //   console.log(response);
    // });
    collections = await database.listCollections().toArray();

    console.log("Collections :");
    collections.forEach(collections => console.log(` - ${collections.name}`));
  } catch (err) {
    console.error(err);
    console.log("Error connecting db");
    collection = client.db('LMS').listCollections().toArray();
    console.log("Collections :",collection);
  }
};

module.exports.connect = connect;
module.exports.database = client.db('LMS');