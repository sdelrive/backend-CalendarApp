const express = require("express");

const validateJWS = (req, res = express.response, next) => {
  const token = req.header("x-token");
  console.log(token);

  next();
};

module.exports = {
  validateJWS,
};
