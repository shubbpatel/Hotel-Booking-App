const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const roomController = require('./controllers/roomContollers');
const bookingController = require('./controllers/bookingConrollers');
const roomsData = require('./api/rooms.json')
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const bookings = require('./api/bookings.json')



// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'ejs');

// app.use((req, res, next) => {
//   res.setHeader('Content-Type', 'text/javascript');
//   next();
// });


// API endpoint for retrieving available rooms
app.get('/api/bookings', (req, res) => {

  res.json(bookings);
});
app.get('/api/rooms', (req, res) => {

  res.json(roomsData);
});

app.get('/', (req, res) => {
  res.render()
})
// API endpoint for booking a room
app.post('/api/bookings', (req, res) => {
  // Get the booking details from the request body
  const { name, email, phone, address, rooms } = req.body;

  // Validate the booking details
  if (!name || !email || !phone || !address || !rooms || !Array.isArray(rooms)) {
    return res.status(400).json({ message: 'Invalid booking details' });
  }

  // Calculate the total price of the booking
  const totalPrice = rooms.reduce((acc, room) => acc + parseInt(room.price), 0);

  // Load existing booking data from the JSON file
  const filePath = path.join(__dirname, 'api', '/bookings.json');
  let bookingsData;
  try {
    bookingsData = fs.readFileSync(filePath, 'utf-8');

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to load existing booking data' });
  }

  var bookingsArray;
  if (bookingsData.trim() === '') {
    // If the file is empty, create an empty bookings array
    bookingsArray = [];
  } else {
    // Parse the existing JSON data to get the bookings array
    try {
      bookingsArray = JSON.parse(bookingsData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to parse existing booking data' });
    }
  }

  // Add the new booking details to the bookings array
  const newBooking = { name, email, phone, address, rooms, totalPrice };
  if (!Array.isArray(bookingsArray)) {
    bookingsArray = [];
}
 bookingsArray.push(newBooking);
  

  // Save the updated bookings array back to the JSON file
  try {
    fs.writeFileSync(filePath, JSON.stringify(bookingsArray, null, 2));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to save updated booking data' });
  }

  // Make the booking and send a confirmation email to the customer
  // ...

  // Return a success message
  res.json({ message: 'Booking successful' });
});



// app.post('/api/bookings', (req, res) => {
//   // Get the booking details from the request body
//   const { name, email, phone, address, rooms } = req.body;

//   // Validate the booking details
//   if (!name || !email || !phone || !address || !rooms || !Array.isArray(rooms)) {
//   // if (!name || !email || !phone || !address || !rooms || !rooms) {
//     return res.status(400).json({ message: 'Invalid booking details' });
//   }

//   // Calculate the total price of the booking
//   const totalPrice = rooms.reduce((acc, room) => acc + parseInt(room.price), 0);

//   // Save the booking details in a JSON file
//   const bookingDetails = { name, email, phone, address, rooms, totalPrice };
//   const filePath = path.join(__dirname, 'api','/bookings.json');

//   fs.appendFile(filePath, JSON.stringify(bookingDetails)+ '\n', (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Failed to save booking details' });
//     }
//   });

//   // Make the booking and send a confirmation email to the customer
//   // ...

//   // Return a success message
//   res.json({ message: 'Booking successful' });
// });







app.listen(3000, () => {
  console.log('Server listening on port 3000');

});


