const { Router } = require("express");
const { Post } = require("../entities/Post");
const router = Router();

module.exports = (DI) => {
  router.post("/", async (req, res) => {
    // console.log("DI object:", Object.keys(DI)); // See what's available
    // console.log("postRepository:", DI.postRepository); // Check if it exists
    // console.log(
    //   "Available methods on postRepository:",
    //   Object.getOwnPropertyNames(Object.getPrototypeOf(DI.postRepository))
    // );

    const { title, author, content, tags, isPublished = false } = req.body;

    if (!title || !author || !content || !tags) {
      return res.status(400).send({
        success: false,
        message: "One of `title, author`  or `content` is missing",
      });
    }
    try {
      const post = new Post(title, author, content, tags, isPublished);
      await DI.em.persistAndFlush(post); // for inserts
      res
        .status(200)
        .send({ success: true, message: "post successfully created", post });
    } catch (e) {
      return res.status(400).send({ success: false, message: e.message });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const posts = await DI.postRepository.findAll();
      // Alternative: DI.em.find(Post, {})
      res.status(200).send({ success: true, posts });
    } catch (e) {
      res.status(500).send({ success: false, message: e.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const post = await DI.postRepository.findOne({ id: req.params.id });
      if (!post) {
        return res
          .status(404)
          .send({ success: false, message: "Post not found" });
      }
      res.status(200).send({ success: true, post });
    } catch (e) {
      res.status(500).send({ success: false, message: e.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const post = await DI.postRepository.findOne({ id: req.params.id });
      if (!post) {
        return res
          .status(404)
          .send({ success: false, message: "Post not found" });
      }
      Object.assign(post, req.body); // Update all fields at once
      await DI.em.flush();
      res.status(200).send({ success: true, post });
    } catch (e) {
      res.status(500).send({ success: false, message: e.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const post = await DI.postRepository.findOne({ id: req.params.id });
      if (!post) {
        return res
          .status(404)
          .send({ success: false, message: "Post not found" });
      }
      await DI.em.removeAndFlush(post);
      res.status(200).send({ success: true, message: "Post deleted" });
    } catch (e) {
      res.status(500).send({ success: false, message: e.message });
    }
  });

  return router;
};
