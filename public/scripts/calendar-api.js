const fetchUserEventsHTTP = () => {
  return axios.get(`${ROOT_URL}/event/`);
};

const fetchPetsHTTP = (id) => {
  return axios.get(`${ROOT_URL}/pet/`, id);
};

const fetchPetEventsHTTP = (id) => {
  return axios.get(`${ROOT_URL}/pet/events`);
};

const createEventHTTP = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ROOT_URL}/event/create`, data)
      .then((res) => {
        resolve('POST: event was resolved');
      })
      .catch((error) => console.error(data, error));
  });
};

const updateEventHTTP = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ROOT_URL}/event/update`, data)
      .then((res) => {
        resolve(`POST: event was edited`);
      })
      .catch((error) => console.error(error));
  });
};

const deleteEventHTTP = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ROOT_URL}/event/delete`, { id })
      .then((res) => {
        resolve(`POST: event was deleted`);
      })
      .catch((error) => console.error(error));
  });
};
