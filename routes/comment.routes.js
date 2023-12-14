const router = require("express").Router();

const User = require("../models/User.model");
const Actuacio = require("../models/Actuacio.model");
const Comment = require("../models/Comment.model");

// ****************************************************************************************
// POST route - create a comment of a specific actuacio
// ****************************************************************************************

// /actuacions/{{id}}/comment
router.post('/:id/comment', (req, res) => {
  
  const { id } = req.params;
  const { author, content } = req.body;

  Comment.create({
    author: author,
    content: content 
  }).then( newComment => {
    return Actuacio.findByIdAndUpdate(id, { $push: { comments: newComment._id } })
  }).then( () => {
    res.redirect(`/actuacions/${id}`)
  })

});

router.post('/:id/delete-comment', (req, res) => {
    Comment.findByIdAndDelete()
    .then( () => {
        res.redirect(`/actuacions/${id}`)
      })
})

module.exports = router;