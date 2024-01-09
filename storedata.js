const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const dbName = 'Mydata';
const collectionName = 'Product Data';

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

async function main() {
  console.log('Connecting to MongoDB database...');

  const client = new MongoClient(uri);

  try {
    console.log('Connected to MongoDB database.');

    console.log('Inserting documents...');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(data);

    console.log(`Inserted ${result.insertedCount} documents`);
  } catch (err) {
    console.error('Error inserting documents:', err);
  } finally {
    console.log('Closing MongoDB connection...');

    await client.close();

    console.log('MongoDB connection closed.');
  }
}

main().catch(console.error);