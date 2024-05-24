const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());

let rentals = [];

app.get('/rentals', (req, res) => {
  res.json(rentals);
});

app.post('/rentals', (req, res) => {
  const newRental = req.body;
  rentals.push(newRental);
  res.status(201).json(newRental);
});

app.put('/rentals/:id', (req, res) => {
  const { id } = req.params;
  const updatedRental = req.body;
  rentals = rentals.map(rental => (rental.id === id ? { ...rental, ...updatedRental } : rental));
  res.json(updatedRental);
});

app.delete('/rentals/:id', (req, res) => {
  const { id } = req.params;
  rentals = rentals.filter(rental => rental.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
