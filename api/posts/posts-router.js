// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: "The posts information could not be retrieved",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be retrieved",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post",
      });
    } else {
      const { id } = await Posts.insert(req.body);
      const post = await Posts.findById(id);
      res.status(201).json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post",
      });
    } else {
      const updatedPostId = await Posts.update(id, req.body);
      const updatedPost = await Posts.findById(updatedPostId);
      if (!updatedPostId) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else {
        res.status(200).json(updatedPost);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be modified",
    });
  }
});

module.exports = router;
