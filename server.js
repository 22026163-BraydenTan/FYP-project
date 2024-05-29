const express = require('express');
const app = express();
const port = 8080;

// Serve the test.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/test.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
