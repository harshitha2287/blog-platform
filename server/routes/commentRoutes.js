const express = require("express");

const Comment = require("../models/Comment");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();


// ADD COMMENT
router.post("/:postId", authMiddleware, async (req, res) => {

  try {

    const newComment = new Comment({
      text: req.body.text,
      user: req.user.id,
      post: req.params.postId,
    });

    await newComment.save();

    const populatedComment = await Comment.findById(
      newComment._id
    ).populate("user", "username");

    res.status(201).json(populatedComment);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});


// GET COMMENTS FOR A POST
router.get("/:postId", async (req, res) => {

  try {

    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});


// DELETE COMMENT
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await comment.deleteOne();

    res.json({
      message: "Comment deleted",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;