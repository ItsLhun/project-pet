fetchUserEventsHTTP()
  .then((res) => {
    calendarInstance.setEvents(res.data);
  })
  .then(() => {
    const events = document.querySelectorAll('.event');
    events.forEach((event) => {
      event.style.background = event.color;
    });
  })
  .catch((error) => console.log(error));
