const calendarInstance = new calendarJs('calendar', {
  manualEditingEnabled: true
});

const event = {
  from: new Date(),
  to: new Date(),
  title: 'A New Event',
  description: 'A description of the event'
};

calendarInstance.addEvent(event, true, true, true);
