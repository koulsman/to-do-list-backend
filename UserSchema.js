const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  password: String,
  uid: String
}, { 
    collection: 'users' // Specify the collection name explicitly
  });

const User = mongoose.model('User', UserSchema);
console.log("database:MyTODOs_db, collection:users")
module.exports = User;



