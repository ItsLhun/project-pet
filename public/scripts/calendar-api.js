const hello = () => console.log('hello world');

const fetchEventsHTTP = () => {
  return axios.get('http://localhost:3000/event/');
};

const createEventHTTP = (data) => {
  axios
    .post('http://localhost:3000/event/create', data)
    .then((res) => {
      console.log(`POST: event was added`);
    })
    .catch((error) => console.error(error));
};

const updateEventHTTP = (data) => {
  axios
    .post('http://localhost:3000/event/update', data)
    .then((res) => {
      console.log(`POST: event was edited`);
    })
    .catch((error) => console.error(error));
};

const deleteEventHTTP = (id) => {
  axios
    .post('http://localhost:3000/event/delete', { id })
    .then((res) => {
      console.log(`POST: event was deleted`);
    })
    .catch((error) => console.error(error));
};
