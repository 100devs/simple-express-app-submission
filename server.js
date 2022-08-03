const express = require('express');
const app = express();
const cors = require('cors');
const { application } = require('express');
const PORT = 5500;

app.use(cors());
app.use(express.static('public'));

const products = {
  buffalo: {
    name: 'Buffalo Style Seasoned Almonds',
    price: '3.99',
    category: 'Nuts, Dried Fruits, Seeds',
    sku: '73689',
    size: '8oz',
    tasteProfile: 'spicy, zippy, bold, tangy',
    ingredients: 'almonds, vinegar, red pepper, salt, garlic, paprika',
  },
  brookie: {
    name: 'Brookie',
    price: '4.49',
    category: 'Sweet Stuff',
    sku: '61281',
    size: '11oz',
    tasteProfile: 'fudgy, chewy, rich, sweet',
    ingredients: 'cookie batter, brownie batter, love',
  },
  caius: {
    name: 'Caius Rigsby',
    price: '666.66',
    category: 'Sweet Stuff',
    sku: '42069',
    size: '3821oz',
    tasteProfile: 'spicy, zippy, poor (not too bad tho), cute-tho, good-friend',
    ingredients: 'just a bunch of sh*t that was kind of there',
  },
  unknown: {
    name: 'Unknown',
    price: 'unknown',
    category: 'unknown',
    sku: 'unknown',
    size: 'n/a',
    tasteProfile: 'unknown',
    ingredients: 'do not eat this',
  },
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api', (req, res) => {
  res.json(products);
});

app.get('/api/:product', (req, res) => {
  const productName = req.params.product.toLowerCase();

  if (products[productName]) {
    // console.log(res.json(products[productName]));
    res.json(products[productName]);
  }
  res.json(products['unknown']);
});

app.listen(process.env.PORT || 5500, (req, res) => {
  console.log(`Server is running on PORT: ${PORT}`);
});
