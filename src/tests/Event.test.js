import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import Event from '../Event';

describe('<Event /> component', () => {
  let EventWrapper, event;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test('renders the component', () => {
    expect(EventWrapper).toBeDefined();
  });

  test('renders the summary as a h2', () => {
    const summary = EventWrapper.find('h2.summary');
    const summaryString = event.summary;
    expect(summary).toBeDefined();
    expect(summary.text()).toBe(summaryString);
  });

  test('renders the start details', () => {
    const eventStart = EventWrapper.find('.start');
    const dateString = new Date(event.start.dateTime).toString();
    expect(eventStart).toBeDefined();
    expect(eventStart.text()).toBe(dateString);
  });

  test('renders location details', () => {
    const eventLocation = EventWrapper.find('.location');
    const locationString = `@${event.summary} | ${event.location}`;
    expect(eventLocation).toBeDefined();
    expect(eventLocation.text()).toBe(`${locationString}`);
  });

  test('<Event /> details is initially collapsed, children hidden, details-button text is "show details"', () => {
    const detailsButton = EventWrapper.find('button.details-button');
    expect(EventWrapper.state('collapsed')).toBe(true);
    expect(detailsButton).toBeDefined();
    expect(detailsButton.text()).toBe('show details');
    expect(EventWrapper.find('h3.about')).toHaveLength(0);
    expect(EventWrapper.find('a.link')).toHaveLength(0);
    expect(EventWrapper.find('p.description')).toHaveLength(0);
  });

  test('<Event /> details is expanded (collapsed=false) on click', () => {
    const detailsButton = EventWrapper.find('button.details-button');
    detailsButton.simulate('click');
    expect(EventWrapper.find('h3.about')).toHaveLength(1);
    expect(EventWrapper.find('a.link')).toHaveLength(1);
    expect(EventWrapper.find('p.description')).toHaveLength(1);
    expect(EventWrapper.state('collapsed')).toBe(false);
  });
});
