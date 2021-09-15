const calendarInstance = new calendarJs('calendar', {
  manualEditingEnabled: true
});

const event = {
  from: new Date(),
  to: new Date(),
  id: 'test',
  title: 'A New Event',
  description: 'A description of the event'
};

calendarInstance.addEvent(event);
