import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// will look in the public directory so CSS/JS links don't need "/public" only "/style.css"
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/log', (req, res) => {
  res.redirect('/');
});

const PORT = 3000;
app.listen(process.env.PORT || PORT, (err) => {
  console.log(`Server is listening on ${process.env.PORT || PORT}`);
});
