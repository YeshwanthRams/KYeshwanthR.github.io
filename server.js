// Import MongoClient
const MongoClient = require('mongodb').MongoClient;

// Create a MongoClient object
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

// Connect to the database
client.connect().then(() => {
  // Get a handle to the database
  const db = client.db("Mydata");

  // Get a handle to the collection
  const col = db.collection("Product Data");

  // Perform CRUD operations on the collection
  col.find({}).toArray().then(docs => {
    // Display the documents
    docs.forEach(doc => {
      console.log(doc);
    });
  }).catch(err => {
    // Handle errors
    console.error(err);
  }).finally(() => {
    // Close the connection
    client.close();
  });
}).catch(err => {
  // Handle errors
  console.error(err);
}).finally(() => {
  // Close the connection
  client.close();
});