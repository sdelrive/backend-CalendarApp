const express = require("express");
const { events } = require("../models/Event");
const Event = require("../models/Event");

const getEvents = async (req, res = express.response) => {
  const events = await Event.find().populate("user", "name");
  try {
    res.json({
      ok: true,
      events: events,
    });
  } catch (error) {
    console.log(error);
  }
};

const postEvents = async (req, res = express.response) => {
  //   const { _id, title, note } = req.body;

  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const savedEvent = await event.save();

    res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error: Hable con el admin",
    });
  }
};

const putEvents = async (req, res = express.response) => {
  // consigo el id de la url
  const eventID = req.params.id;
  // el id del usuario
  const uid = req.uid;
  try {
    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    // solo el usuario creador del evento puede modificarlo
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio para editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    // el tercer parametro new:true es para que me regrese el evento actualizado, pro defecto me regresa el evento antes de actualizar
    const actEvent = await Event.findByIdAndUpdate(eventID, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: actEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "no se pibe",
    });
  }
};

const deleteEvents = async (req, res = express.response) => {
  // consigo el id de la url
  const eventID = req.params.id;
  // el id del usuario
  const uid = req.uid;
  try {
    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    // solo el usuario creador del evento puede modificarlo
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio para editar este evento",
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventID);

    res.json({
      ok: true,
      event: deletedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "no se pibe",
    });
  }
};

module.exports = {
  getEvents,
  postEvents,
  putEvents,
  deleteEvents,
};
