const express = require('express')
const app = express()
const cors = require("cors");
const connectToDatabse = require('./db');
const port = 5000

const path = require('path');
const uploadsPath = path.join(__dirname, 'uploads');

// Use express.static to serve the files
app.use('/uploads', express.static(uploadsPath));

connectToDatabse();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./routes/auth'));
app.use('/task', require('./routes/task'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})