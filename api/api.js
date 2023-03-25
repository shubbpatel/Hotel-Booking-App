const API_URL = 'https://localhost:3000/api';

function fetchAvailableRooms() {
  const url = `${API_URL}/rooms`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch available rooms');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
      throw new Error('Failed to fetch available rooms');
    });
}

function bookRoom(data) {
  const url = `${API_URL}/bookings`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to book room');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
      throw new Error('Failed to book room');
    });
}

export { fetchAvailableRooms, bookRoom };
