import express from 'express';
import { db } from './firebase'; // Import the Firestore instance

const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON bodies

// Example endpoint to add data to Firestore
app.post('/addUser', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Add user to Firestore
    const userRef = db.collection('users').doc();
    await userRef.set({ name, email });

    res.status(200).send('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Error adding user');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
