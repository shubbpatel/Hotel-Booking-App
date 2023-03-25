const express = require('express');
const router = express.Router();
const Booking = require('../model/booking');

exports.createBooking = function(req, res) {
  // Validate user input
  const { name, email, phone, address, rooms } = req.body;
  if (!name || !email || !phone || !address || !rooms) {
    return res.status(400).send({ message: 'Please provide all required information.' });
  }

  // Create new booking
  const booking = new Booking({
    name: name,
    email: email,
    phone: phone,
    address: address,
    rooms: rooms
  });

  // Save booking to database
  booking.save(function(err, booking) {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'An error occurred while saving the booking.' });
    }
    res.send({ message: 'Booking successfully created!' });
  });
};
