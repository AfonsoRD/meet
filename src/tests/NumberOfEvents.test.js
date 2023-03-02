import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('renders the component', () => {
    expect(NumberOfEventsWrapper).toBeDefined();
  });

  test('render default number 32', () => {
    expect(NumberOfEventsWrapper.find('input.num').prop('type')).toBe('number');
    expect(NumberOfEventsWrapper.state('num')).toBe(32);
  });
});
