require('dotenv').config();
console.log('Mongo URI:', process.env.MONGODB_URI);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://to-do-list-esdn.onrender.com'
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`CORS policy: Origin ${origin} not allowed.`), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.json());

// Import routes (from the old UserServer/PostServer/CommunityServer)
const userRoutes = require('./routes/UserServer');
const listRoutes = require('./routes/ListServer');
// const communityRoutes = require('./routes/CommunityServer');
// const communityRoutes = require('./routes/communities');

// Mount routes
app.use('/UserServer', userRoutes);
app.use('/ListServer', listRoutes);

// app.use('/communities', communityRoutes);

app.get('/', (req, res) => {
  res.send('🌍 To-do-list unified backend is running');
});


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});