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
    const { content } = req.body;
    const comment = {
        content: content
    }
    const { _id } = req.session.currentUser
    comment.author = _id

    // console.log({content, author: _id})
    // return
    Comment.create(comment)
    .then( (newComment) => {
        return Actuacio.findByIdAndUpdate(id, { $push: { comments: newComment._id } })
    })
    .then( () => {
     res.redirect(`/actuacions/${id}`)
     })

});

// router.post('/:id/:commentId/delete-comment', (req, res) => {
//     const { id } = req.params;
//     const {commentId} = req.params.comments
//     // actuacioFromDB.comments                                           ??????????
//     console.log(req.params)
//     Comment.findByIdAndDelete(commentId)
//     .then( () => {
//         res.redirect(`/actuacions/${id}`)
//       })
// })

module.exports = router;