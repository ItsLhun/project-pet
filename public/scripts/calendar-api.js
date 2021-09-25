const fetchUserEventsHTTP = () => {
  return axios.get('http://localhost:3000/event/');
};

const fetchPetsHTTP = (id) => {
  return axios.get('http://localhost:3000/pet/', id);
};

const fetchPetEventsHTTP = (id) => {
  return axios.get('http://localhost:3000/pet/events');
};

const createEventHTTP = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:3000/event/create', data)
      .then((res) => {
        resolve('POST: event was resolved');
      })
      .catch((error) => console.error(data, error));
  });
};

const updateEventHTTP = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:3000/event/update', data)
      .then((res) => {
        resolve(`POST: event was edited`);
      })
      .catch((error) => console.error(error));
  });
};

const deleteEventHTTP = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:3000/event/delete', { id })
      .then((res) => {
        resolve(`POST: event was deleted`);
      })
      .catch((error) => console.error(error));
  });
};
