const express = require("express");
const MenuController = require("../controllers/menu");
const middlewareAuth = require('../middleware/authenticated');

const api = express.Router();

api.post("/menu", [middlewareAuth.asureAuth], MenuController.createMenu);
api.get("/menu", MenuController.getMenus);
api.patch("/menu/:id", [middlewareAuth.asureAuth], MenuController.updateMenu);
api.delete("/menu/:id", [middlewareAuth.asureAuth], MenuController.deleteMenu);

module.exports = api;