import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = { num: 32 };

  changeNum(value) {
    this.setState({ num: value });
  }

  render() {
    const { num } = this.state;

    return (
      <div className='NumverOfEvents'>
        <input
          className='num'
          type='number'
          value={num}
          onChange={(event) => {
            this.changeNum(event.target.value);
          }}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
