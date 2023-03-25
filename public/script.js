// Wait for the page to load before running the JavaScript code
$(document).ready(function () {
  // Define variables for elements in the HTML file
  var roomList = $("#roomList");
  var roomCart = $("#cart");
  var bookingForm = $("#booking-form");
  var submitBtn = $("#bookingButton");
  var cartContainer = $("#cartContainer");

  // Display "Loading rooms..." message before sending AJAX request
  // roomList.html('<p style="color:red;">Loading rooms...</p>');

  // Send AJAX request to API for available rooms
  $.ajax({
    url: "http://localhost:3000/api/rooms",
    type: "GET",
    success: function (response) {
      // Populate the room list with available rooms returned by the API
      var rooms = response;
      console.log(rooms);
      var html = "";
      $.each(rooms, function (index, room) {
        html +=
          '<div class="card room" style="width:100%;" height:auto; display:flex; flex-direction:column; justify-content:space-around;">';
        html += '<img src="' + room.image + '" >';
        html += "<h3><b>" + room.name + "</b></h3>";
        html += "<p>" + room.description + "</p>";
        html += "<p>Price per night: " + room.price + "</p>";
        html += '<div class="d-flex flex-column; justify-content-around align-items-center">'
        html +=
          '<button class="add-to-cart-btn" style="border:none; width:49%;" data-name="' +
          room.name +
          '" data-price="' +
          room.price +
          '" >Add to Cart</button>';
        html +=
          '<button class="book-now" style="border:none; width:49%;" data-name="' +
          room.name +
          '" data-price="' +
          room.price +
          '" >Book NOW</button>';
          html += '</div>'
        html += "</div>";
      });
      roomList.html(html);
    },
    error: function () {
      // Display error message if the API returns an error
      roomList.html(
        '<p style="color:red;">Error loading rooms. Please try again later.</p>'
      );
    },
  });

  // Add room to cart when "Add to Cart" button is clicked
  var selectedRooms = [];
  
   roomList.on("click", ".add-to-cart-btn", function () {
    var name = $(this).data("name");
    var price = $(this).data("price");
    var cartItem = $(
      '<div class="cart-item">' + name + ": INR-" + price +'<button class="remove-item" style="background:#6606e3;color:white;border:none;border-radius:5px;padding:10px;">Remove item</button></div>'
    );

    selectedRooms.push({
      name: name,
      price: price,
    });
   
    var totalPrice = selectedRooms.reduce(
      (acc, room) => acc + parseInt(room.price),
      0
    );
    var total = $(
      '<div class="cart-total">' +
        "<h5>Total</h5> INR-" +
        totalPrice +
        "/-" +
        "</div>"
    );
    roomCart.append(cartItem);
    cartContainer.find(".cart-total").remove();
    cartContainer.append(total);
    cartItem.on('click', '.remove-item' , () => {
      cartContainer.find('.cart-item').remove();
    })
  });


roomList.on('click', '.book-now',()=>{
  window.location = "#cartContainer";

})
  
  // Handle form submission when "Book Now" button is clicked
  bookingForm.on("submit", function (event) {
    if (selectedRooms.length !== 0) {
      event.preventDefault();
      // Validate form data
      var name = $("#name").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var address = $("#address").val();
      if (name === "" || email === "" || phone === "" || address === "") {
        alert("Please fill in all fields.");
        return false;
      }
      // Disable "Book Now" button and display "Booking..." message
      submitBtn.prop("disabled", true);
      submitBtn.text("Booking...");
      // Send POST request to API with booking details
      $.ajax({
        url: "http://localhost:3000/api/bookings",
        type: "POST",
        data: {
          name: name,
          email: email,
          phone: phone,
          address: address,
          rooms: selectedRooms,
        },
        success: function () {
          // Display confirmation message if booking is successful
          alert("Booking successful!");

          // Reset the form and cart
          bookingForm.trigger("reset");
          roomCart.html("");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // Display error message if the API returns an error
          console.log("AJAX error: " + textStatus + " : " + errorThrown);

          alert("Booking failed. Please try again later.");
          // Enable "Book Now" button and reset text
          submitBtn.prop("disabled", false);
          submitBtn.text("Book Now");
        },
      });
    } else {
      alert("Cart or Form is empty");
    }
  });
});
