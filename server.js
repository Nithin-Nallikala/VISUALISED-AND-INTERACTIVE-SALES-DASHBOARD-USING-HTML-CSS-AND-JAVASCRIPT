const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '23MBMA14',
  database: 'salestoday'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.get('/primary_data', (req, res) => {
  db.query('SELECT * FROM salestoday.sales_data', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/secondary_data', (req, res) => {
  db.query('SELECT * FROM salestoday.secondary_data', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
