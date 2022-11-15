/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

// controllers
const {
  createUser,
  loginUser,
  renewToken,
} = require("../controllers/authController");

// register
router.post(
  "/new",
  // middlewares de validacion
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener mas de 5 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

// login
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener mas de 5 caracteres").isLength({
      min: 6,
    }),

    validateFields,
  ],
  loginUser
);
// renew token
router.get("/renew", renewToken);

module.exports = router;
