import React from 'react';
import Event from './Event';

const EventList = ({ events }) => {
  return (
    <div>
      <ul className='EventList'>
        {events.map((event) => (
          <li key={event.id}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
