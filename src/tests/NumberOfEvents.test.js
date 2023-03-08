import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents />', () => {
  let NumberOfEventsWrapper, numInput;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
    numInput = NumberOfEventsWrapper.find('input.num-input');
  });

  test('renders the components', () => {
    expect(NumberOfEventsWrapper).toBeDefined();
    expect(numInput).toBeDefined();
  });

  test('render default number 32', () => {
    expect(numInput.prop('type')).toBe('number');
    expect(NumberOfEventsWrapper.state('num')).toBe(32);
  });

  test('user cha  nges value for rendered number of events', () => {
    expect(NumberOfEventsWrapper.state('num')).toBe(32);
    numInput.simulate('change', { target: { value: 24 } });
    expect(NumberOfEventsWrapper.state('num')).toBe(24);
  });
});
