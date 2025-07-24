// const uri = 'mongodb+srv://stevekoulas:asfalisa1@cluster0.pyikc.mongodb.net/MyTODOs_db?retryWrites=true&w=majority';
// const port = 3002;
const axios = require("axios")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser");


const router = express.Router();
// app.use(cors())
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
const List = require("../ListSchema");

console.log("ok")
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3002;


router.post('/list', async(req,res) => {
    const list = new List({
    
        list_title: req.body.title,
        u_id: req.body.uid,
        list_items: req.body.listItems,
        list_isDone: req.body.isDone
      });
    
      try {
      
      
        
        const newList = await list.save();
        console.log("user saved!")
        res.status(201).json(newList); // Send created user as a response
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

    // {list_title, list_items, u_id}

    // app.get('/listsById', async(req,res) => {
    //   const u_id = req.params.uid;
    //   const foundLists = List.find({u_id: {u_id}}, function(err, data){
    //     if(err){
    //         console.log(err);
    //         return
    //     }
    
    //     if(data.length == 0) {
    //         console.log("No record found")
    //         return
    //     }
    //     res.status(201).json(foundLists);
    
    //     console.log(data[0].name);
    // })
    // })

  router.post('/list/isDone/:lid', async (req, res) => {
  const { lid } = req.params;

  try {
    // First, find the list by ID
    const list = await List.findById(lid);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Toggle the isDone field
    list.list_isDone = !list.list_isDone;

    // Save the updated list
    const updatedList = await list.save();

    res.status(200).json(updatedList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/updateList/:lid', async(req,res) => {
  const listId = req.params.lid
  const title = req.body.title;
  const listItems = req.body.list_items;
  
  const editedList = await List.findByIdAndUpdate(
    listId,
    {
    list_title: title,
    list_items: listItems
  });
  if(!editedList) {
    return res.status(404).json({message: "no such list"});

  }
  return res.status(200).json(editedList)

})

    router.get('/listsById/:uid', async (req, res) => {
      const u_id = req.params.uid;
      const foundLists = await List.find({ u_id: u_id });
      if (!foundLists.length) {
          return res.status(404).json({ message: "No lists found" });
      }
      res.status(200).json(foundLists);
   });

   router.get('/list/:lid', async (req,res) => {
    const lid = req.params.lid;
      const selectedList = await List.find({ _id: lid });
      if (!selectedList) {
          return res.status(404).json({ message: "No such list" });
      }
      res.status(200).json(selectedList);
   })
   router.delete('/list/:lid', async (req, res) => {
  const lid = req.params.lid;
  try {
    const deletedList = await List.findByIdAndDelete(lid);
    if (!deletedList) {
      return res.status(404).json({ message: "No such list" });
    }
    res.status(200).json({ message: "List deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting list", error: err });
  }
});
module.exports = router;