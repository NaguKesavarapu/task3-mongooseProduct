const express = require('express');
const mongoose = require('mongoose');
const Product = require('./Product');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Server is running');
});


app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  return res.status(201).json({ message: 'User registered successfully', user: { name, email } });
});


app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({ category: 'Electronics', price: { $gt: 500 } })
      .sort({ price: -1 }); 
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
