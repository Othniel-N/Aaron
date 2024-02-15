const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Add this line for JSON body parsing

// Your existing routes
app.get('/api/aaron', (req, res) => {
  const result = {
    users: 50
  };
  res.json(result);
});

app.get('/api/test', (req, res) => {
  res.send("working");
});


const tasks = [
  { id: 1, name: 'Tamil' },
  { id: 2, name: 'English' },
  { id: 3, name: 'Maths' },
  { id: 4, name: 'Science' },
  { id: 5, name: 'Social science' }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
