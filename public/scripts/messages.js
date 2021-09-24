const messages = document.getElementsByClassName('message');

for (let i = 0; i < messages.length; i++) {
  let message = messages[i];

  message.addEventListener('click', () => {
    axios
      .post(`http://localhost:3000/message/read/${message.id}`)
      .then((res) => console.log('Success'))
      .catch((error) => console.error(error));
  });
}
