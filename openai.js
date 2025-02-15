const express = require("express");
const {
  chatbotController,
  jsconverterController,
} = require("../controllers/openai");

const router = express.Router();

//route
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);


module.exports = router;
