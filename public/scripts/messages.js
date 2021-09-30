const messages = document.getElementsByClassName('message-wrapper');
const checkAllMessages = document.getElementById('check-all-messages');
const checkMessageBoxes = document.getElementsByClassName('check-message');
const deleteAllButton = document.getElementById('delete-all-messages');
const deleteMessagesForm = document.getElementById('delete-messages');

checkAllMessages?.addEventListener('click', () => {
  for (let i = 0; i < checkMessageBoxes.length; i++) {
    const messageCheckBox = checkMessageBoxes[i];
    if (checkAllMessages.checked) {
      messageCheckBox.checked = true;
    } else {
      messageCheckBox.checked = false;
    }
  }
});

for (let i = 0; i < messages.length; i++) {
  const messageElement = messages[i];
  const message = messageElement.querySelector('.collapsible');

  message.addEventListener('click', () => {
    message.classList.toggle('active');
    const content = message.nextElementSibling;
    const checkbox = messageElement.querySelector('.check-message');

    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }

    if (checkbox.style.display === 'none') {
      checkbox.style.display = 'block';
    } else {
      checkbox.style.display = 'none';
    }

    axios
      .post(`${ROOT_URL}message/read/${message.id}`)
      .then((res) => {})
      .catch((error) => console.error(error));
  });
}

deleteAllButton?.addEventListener('click', () => {
  const messages = [];
  for (let i = 0; i < checkMessageBoxes.length; i++) {
    const checkbox = checkMessageBoxes[i];
    if (checkbox.checked) {
      const messageId = checkbox.parentElement.parentElement.id;
      messages.push(messageId);
    }
  }
  axios
    .post(`${ROOT_URL}message/delete/`, { messages })
    .then((res) => {
      window.location.reload();
    })
    .catch((error) => console.error(error));
});
