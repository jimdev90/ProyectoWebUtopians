const express = require("express");
const NewsletterController = require("../controllers/newsletter");
const middlewareAuth = require('../middleware/authenticated');

const api = express.Router();

api.post("/newsletter", NewsletterController.suscribeEmail);
api.get("/newsletter", [middlewareAuth.asureAuth], NewsletterController.getEmails);
api.delete("/newsletter/:id",[middlewareAuth.asureAuth],NewsletterController.deleteEmail);

module.exports = api;