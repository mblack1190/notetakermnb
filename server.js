const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.json('db');
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });

  