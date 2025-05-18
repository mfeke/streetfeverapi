const express = require('express');
const app = express();
const PORT = process.env.PORT 

app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;