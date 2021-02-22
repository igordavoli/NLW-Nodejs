import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({ message: 'hello' })
});

app.post('/', (req, res) => {
  return res.json({ message: 'dados salvos' })
});

app.listen(3333, () => console.log('server online'));

