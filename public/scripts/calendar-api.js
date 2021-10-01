const fetchUserEventsHTTP = () => {
  return axios.get('/event/');
};
const fetchProfEventsHTTP = () => {
  return axios.get('/event/professional');
};
const fetchPetsHTTP = (id) => {
  return axios.get('/pet/', id);
};

const createEventHTTP = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/event/create', data)
      .then((res) => {
        resolve('POST: event was resolved');
      })
      .catch((error) => console.error(data, error));
  });
};

const updateEventHTTP = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/event/update', data)
      .then((res) => {
        resolve(`POST: event was edited`);
      })
      .catch((error) => console.error(error));
  });
};

const deleteEventHTTP = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/event/delete', { id })
      .then((res) => {
        resolve(`POST: event was deleted`);
      })
      .catch((error) => console.error(error));
  });
};
