let colors;
fetchUserEventsHTTP()
  .then((res) => {
    colors = res.data.colors;
    return calendarInstance.setEvents(res.data.authorizedEvents);
  })
  .then(() => {
    const events = document.querySelectorAll('.event');
    if (colors) {
      events.forEach((event) => {
        event.style.background = colors[event.classList[1]];
      });
    }
  })
  .catch((error) => console.log(error));
