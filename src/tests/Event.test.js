import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import Event from '../Event';

describe('Event /> component', () => {
  let EventWrapper;
  const event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });

  test('renders the component', () => {
    expect(EventWrapper).toBeDefined();
  });

  test('renders the summary as a h1', () => {
    const summary = EventWrapper.find('h1.summary');
    expect(summary).toHaveLength(1);
    expect(summary.text()).toBe(event.summary);
  });

  test('renders the start details', () => {
    const eventStart = EventWrapper.find('p.event-start');
    expect(eventStart).toHaveLength(1);
    expect(eventStart.text()).toBe(new Date(event.start.dateTime).toString());
  });

  test('renders location details', () => {
    const eventLocation = EventWrapper.find('p.event-location');
    expect(eventLocation).toHaveLength(1);
    expect(eventLocation.text()).toBe(`@${event.summary} | ${event.location}`);
  });

  test('renders button show details, when details collapsed', () => {
    const detailsButton = EventWrapper.find('button.details-button');
    expect(detailsButton).toHaveLength(1);
    expect(detailsButton.text()).toBe('show details');
  });

  test('renders collapsed state as default', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
  });
});
