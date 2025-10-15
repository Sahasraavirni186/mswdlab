const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://admin:Sahasra18@cluster0.stuyl3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    // Insert sample books if collection is empty
    const database = client.db('bookstore');
    const collection = database.collection('books');

    const count = await collection.countDocuments();
    if (count === 0) {
      const sampleBooks = [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", price: 10.99 },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", price: 12.99 },
        { id: 3, title: "1984", author: "George Orwell", genre: "Dystopian", price: 9.99 },
        { id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", price: 11.99 },
        { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", price: 8.99 }
      ];

      await collection.insertMany(sampleBooks);
      console.log("Sample books inserted!");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectDB();

// API endpoint to get books
app.get('/api/books', async (req, res) => {
  try {
    const database = client.db('bookstore'); // Replace with your database name
    const collection = database.collection('books'); // Replace with your collection name

    const books = await collection.find({}).toArray();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});