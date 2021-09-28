const messages = document.getElementsByClassName('user-message');

for (let i = 0; i < messages.length; i++) {
  let message = messages[i];

  message.addEventListener('click', () => {
    const collapsible = message.querySelector('.collapsible');
    collapsible.classList.toggle('active');

    let content = collapsible.nextElementSibling;

    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }

    axios
      .post(`http://localhost:3000/message/read/${message.id}`)
      .then((res) => {})
      .catch((error) => console.error(error));
  });
}
