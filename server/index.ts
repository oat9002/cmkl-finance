import express = require('express');

// Create a new express application instance
const app: express.Application = express();
const port: Number = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
}); 