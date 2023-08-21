const express = require('express');
const Router = require('./src/features/router/Router');
const connectDB = require('./src/common/db/connect');
const notFound = require('./src/common/middleware/notfound');
const ScheduledJobs = require('./src/features/utils/index')
const app = express();
const cors = require('cors');
require('dotenv').config();
const path = require('path')

const PORT = process.env.PORT || 8001
connectDB(process.env.LOCAL_MONGO_URI)
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Could not connect to the database', error);
  });

app.use(cors());
// ScheduledJobs.initScheduledJobs();

app.use(express.json());
app.use('/api/v1/supaodds', Router);
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
  res.send('Welcome to Supaodds API');
});
app.use(notFound);
