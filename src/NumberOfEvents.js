import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = { num: 32 };

  handleInputChanged = (event, props) => {
    let inputValue = event.target.value;
    if (inputValue < 0) inputValue = 0;
    this.props.updateEvents(null, inputValue);
    this.setState({
      num: inputValue
    });
  };

  render() {
    const { num } = this.state;
    return (
      <div className='NumverOfEvents'>
        <h3># of Events:</h3>
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
