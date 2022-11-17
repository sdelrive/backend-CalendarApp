// Configuro el express para que me tire la ayuda de codigo. No es necesario requerirlo.
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = express.response) => {
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

    // encriptar contrasena
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // generar token
    const token = await generateJWT(user.id, user.name);

    //   manejo de errores: lo lleve para el middlewre.

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error.",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese correo",
      });
    }

    // confirmar los passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "incorrecto",
      });
    }

    // recuperar jwt> me permite manejar el estado de usuario de forma pasiva
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error.",
    });
  }
};

const renewToken = async (req, res) => {
  const uid = req.uid;
  const name = req.name;

  //generar nuevo JWT y retornarlo en la peticion
  const token = await generateJWT(uid, name);

  console.log(uid);
  res.json({
    ok: true,
    token,
  });
};

module.exports = { createUser, loginUser, renewToken };
