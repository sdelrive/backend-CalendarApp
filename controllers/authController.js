// Configuro el express para que me tire la ayuda de codigo. No es necesario requerirlo.
const express = require("express");
// const User = require("../models/User");
const createUser = async (req, res = express.response) => {
  // me imprime el body de la peticion
  //   console.log(req.body);

  const { name, email, password } = req.body;

  // const user = new User(req.body);

  // await user.save();

  console.log("epale");

  //   manejo de errores: lo lleve para el middlewre.

  res.status(201).json({
    ok: true,
    msg: "Registro",
    name,
    email,
    password,
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const renewToken = (req, res) => {
  res.json({
    ok: true,
    msg: "renew token",
  });
};

module.exports = { createUser, loginUser, renewToken };
