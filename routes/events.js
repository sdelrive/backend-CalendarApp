// Aqui se encuentra el CRUD del proyecto.
// /api/events

const express = require("express");
const { Router } = require("express");
const { validateJWS } = require("../middlewares/validate-jws");

const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isDate } = require("../helpers/isDate");
const {
  getEvents,
  postEvents,
  putEvents,
  deleteEvents,
} = require("../controllers/eventsController");
const { validate } = require("../models/User");
// Todas las peticiones deben pasar por la validacion del JWT
// Peticion de obtener eventos

const router = Router();

router.use(validateJWS);

router.get(
  "/",

  getEvents
);

// Crear eventos
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha de finalizacion es obligatorio").custom(isDate),
  ],
  validateFields,
  postEvents
);

// Actualizar evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha de finalizacion es obligatorio").custom(isDate),
  ],
  validateFields,
  putEvents
);

// Borrar evento
router.delete("/:id", deleteEvents);

module.exports = router;
