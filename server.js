const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');

const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const metricsRoutes = require('./routes/metricsRoutes');
const formRoutes = require('./routes/formRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userDataRoutes = require('./routes/userDataRoutes');

dotenv.config();
db.setup();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/form', formRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/userData', userDataRoutes);

// Serve static files
const pathToBuild = path.join(__dirname, 'client', 'build');
app.use(express.static(pathToBuild));
app.get('/*', function (req, res) {
  res.sendFile(path.join(pathToBuild, 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`.yellow.bold);
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
});
