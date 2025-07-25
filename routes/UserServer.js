
// const mongoose = require('mongoose');
// const express = require("express");
// const User = require("./UserSchema"); // Import the User model
// const cors = require('cors'); // CORS middleware
// const bodyParser = require('body-parser'); // Body parser middleware

// const app = express();




// const axios = require('axios');
// const port = 3001;



// // Middleware to parse JSON bodies
// app.use(express.json());
// app.use(bodyParser.json());

// app.use(cors());



// // Connect to MongoDB and start server
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds instead of hanging
//   })
//     .then(() => {
//       console.log('✅ MongoDB Connected to users_db');
//       app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
//     })
//     .catch(error => {
//       console.error('❌ MongoDB connection error:', error);
//       process.exit(1); // Exit process on DB failure
//     });

// app.post('/users', async (req, res) => {
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password // Fix: Access password from req.body
//   });

//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser); // Send created user as a response
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

const mongoose = require('mongoose');
const express = require("express");
const User = require("../UserSchema"); // Import the User model
const cors = require('cors'); // CORS middleware
const bodyParser = require('body-parser'); // Body parser middleware
const bcrypt = require("bcryptjs")
const router = express.Router();
// const port = 3001; // Update port to avoid conflict with frontend

// MongoDB URI with specified database name (users_db)
// const uri = 'mongodb+srv://stevekoulas:asfalisa1@wrotit.mxylu.mongodb.net/users_db?retryWrites=true&w=majority&appName=wrotit&ssl=true';

// Use CORS to allow requests from frontend
// app.use(cors());
// const uri = 'mongodb+srv://stevekoulas:asfalisa1@cluster0.pyikc.mongodb.net/MyTODOs_db?retryWrites=true&w=majority';
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3001;
// Use body parser to parse JSON request bodies
router.use(bodyParser.json());

// Connect to MongoDB and start server
// mongoose.connect(uri)
//   .then(() => {
//     console.log('MongoDB Connected to users_db!');
//     app.listen(port, () => {
//       console.log(`Node server is running on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.log('MongoDB connection error:', error);
//   });

router.post('/users', async (req, res) => {
const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword // Fix: Access password from req.body
  });

  try {
  
  
    
    const newUser = await user.save();
    console.log("user saved!")
    res.status(201).json({
  _id: newUser._id,
  name: newUser.name,
  email: newUser.email
});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

router.get('/users/:id', getUser, (req, res) => {
  res.json(res.user);
});
router.get('/users/:name', getUser, (req, res) => {
  res.json(res.user);
});
router.get('/users/:email', getUser, (req, res) => {
  res.json(res.user);
});
router.get('/users/:password', getUser, (req, res) => {
  res.json(res.user);
});
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).send('Invalid credentials');
  }

  res.status(200).json({
    message: "skpowje[f",
    name: user.name,
    email: user.email,
    _id: user._id,
  });
});
module.exports = router;
