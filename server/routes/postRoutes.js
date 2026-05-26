const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE POST
router.post("/", authMiddleware, async (req, res) => {

  try {

    const { title, content } = req.body;

    const newPost = new Post({
      title,
      content,
      author: req.user.id,
    });

    await newPost.save();

    res.status(201).json(newPost);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});


// GET ALL POSTS
router.get("/", async (req, res) => {

  try {

    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});


// GET SINGLE POST
router.get("/:id", async (req, res) => {

  try {

    const post = await Post.findById(req.params.id)
      .populate("author", "username email");

    res.json(post);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});


// UPDATE POST
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    post.title = req.body.title;
    post.content = req.body.content;

    await post.save();

    res.json(post);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});


// DELETE POST
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await post.deleteOne();

    res.json({
      message: "Post deleted",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;