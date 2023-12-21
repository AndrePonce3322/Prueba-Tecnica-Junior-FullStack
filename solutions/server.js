import express from 'express';
export const app = express();

app.use(express.json());

const list = [{ id: 1, content: 'Item 1' }];
const port = 3000;

app.get('/items', (_, res) => {
  res.json(list);
});

app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const item = list.find((item) => item.id === +id);
  return res.json(item);
});

app.post('/items', (req, res) => {
  const { content } = req.body;
  const id = list.length + 1;

  const newItem = { id, content };
  list.push(newItem);
  res.json(newItem);
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const item = list.find((item) => item.id === +id);
  item.content = content;
3
  return res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = list.findIndex((item) => parseInt(item.id) == parseInt(id));
  list.splice(index, 1);
  res.status(200).json();
});

export const server = app.listen(port, () => {
  console.log(`Open in the por http://localhost:${port}`);
});
