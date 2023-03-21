import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = { num: 32 };

  handleInputChanged = (event, props) => {
    let inputValue = event.target.value;
    let errorText;

    // don't even allow negative numbers; come on now.
    if (inputValue < 0 || inputValue === 0 || inputValue === '0')
      inputValue = 0;
    if (!inputValue) errorText = 'Select at least 1 event';
    else if (inputValue >= 51) {
      errorText = '50 max. events per page';
      inputValue = 50;
    }

    this.props.updateEvents(null, inputValue);
    this.setState({ num: inputValue, errorText: errorText });
  };

  render() {
    const { num } = this.state;
    return (
      <div className='NumverOfEvents'>
        <ErrorAlert text={this.state.errorText} />
        <h3 className='event-num'>Events list:</h3>
        <input
          className='num-input'
          type='number'
          value={num}
          onChange={(event) => {
            this.handleInputChanged(event);
          }}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
