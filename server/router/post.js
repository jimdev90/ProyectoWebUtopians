const express = require("express");
const multiparty = require("connect-multiparty");
const PostController = require("../controllers/post");
const middlewareAuth = require('../middleware/authenticated');
const middelwareUpload = multiparty({ uploadDir: 'uploads/blog'});

const api = express.Router();

api.post("/post", [middlewareAuth.asureAuth, middelwareUpload], PostController.createPost);
api.get("/post", PostController.getPosts);
api.patch("/post/:id",[middlewareAuth.asureAuth, middelwareUpload],PostController.updatePost);
api.delete("/post/:id", [middlewareAuth.asureAuth], PostController.deletePost);
api.get("/post/:path", PostController.getPost);

module.exports = api;


module.exports = api;