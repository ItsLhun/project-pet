const calendarInstance = new calendarJs('calendar', {
  manualEditingEnabled: true
});

fetchEventsHTTP()
  .then((res) => calendarInstance.setEvents(res.data))
  .catch((error) => console.log(error));
