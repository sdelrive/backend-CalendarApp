// Configuro el express para que me tire la ayuda de codigo. No es necesario requerirlo.
const express = require("express");
const User = require("../models/User");

const createUser = async (req, res = express.response) => {
  // me imprime el body de la peticion
  //   console.log(req.body);

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese correo",
      });
    }
    user = new User(req.body);
    await user.save();

    //   manejo de errores: lo lleve para el middlewre.

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error.",
    });
  }
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
