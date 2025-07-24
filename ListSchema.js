const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListSchema = new Schema({
  u_id: String,
  list_title: String,
  list_items: Array,
  list_isDone: {type: Boolean , default: false}
}, { 
    collection: 'lists' // Specify the collection name explicitly
  });

const List = mongoose.model('lists', ListSchema);
console.log("database:MyTODOs_db, collection:lists")
module.exports = List;