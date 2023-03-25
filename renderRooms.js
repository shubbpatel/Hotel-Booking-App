$(document).ready(function () {
  var roomLoading  = $("#roomsLoading");
  roomLoading.text = "Rooms Loading...";
  $.getJSON("http://localhost:3000/api/rooms", function (data) {
    roomLoading.empty();
    var roomList = $("#roomList");
    console.log(data);
    var cardDeck = $('<div class="row" style="x">');
    $.each(data, function (index, room) {
      var roomCard = '<div class="card my-3" style="width:350px; margin:2px;">';
      roomCard += '<div class="card-body">';
      roomCard +=
        '<img src="' +
        room.image +
        '" alt="' +
        room.name +
        '" style="width: 100%; height: auto;">';
      roomCard += '<h5 class="card-title style=">' + room.name + "</h5>";

      roomCard += '<p class="card-text">' + room.description + "</p>";
      roomCard += '<p class="card-text">' + room.price + "rs. per night</p>";
      roomCard +=
        '<button class="btn btn-primary bookRoom" data-room-id="' +
        room.id +
        '" style="margin:5px;">Book Now</button>';
      roomCard +=
        '<button class="btn btn-primary bookRoom" data-room-id="' +
        room.id +
        '">Add to cart</button>';
      roomCard += "</div>";
      roomCard += "</div>";

      cardDeck.append(roomCard);

      // roomList.append(roomCard);
    });
    roomList.append(cardDeck);
  });
});
