const express = require('express');
const router = express.Router();

module.exports = () => {

  require("../rest/common-rest-handlers")
  return router;
};