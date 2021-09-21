const searchUser = (searchTerm) => {
  axios
    .post('http://localhost:3000/user/search', { searchTerm })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => console.error(error));
};
