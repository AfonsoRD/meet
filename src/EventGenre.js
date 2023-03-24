import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  const colors = ['#40E0FD', '#fdd835', '#4ac00e', '#0066cc', '#f30611'];

  useEffect(() => {
    const getData = () => {
      const genres = [
        { label: 'React', regex: /React/i },
        { label: 'JavaScript', regex: /JavaScript/i },
        { label: 'Node', regex: /Node(\.js)?/i },
        { label: 'jQuery', regex: /jQuery/i },
        { label: 'Angular', regex: /Angular(JS)?(-Remote)?/i }
      ];
      // Compute the value (i.e., count) for each genre based on the events that match its regular expression
      const data = genres.map((genre) => {
        const value = events.filter((event) =>
          genre.regex.test(event.summary)
        ).length;
        // Return an object containing the genre's label and value
        return { name: genre.label, value };
      });
      return data;
    };
    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart
        width={400}
        height={400}
      >
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          outerRadius={120}
          fill='#8884d8'
          dataKey='value'
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {/* Create a cell for each data point and assign a color from the "colors" array */}
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index]}
            />
          ))}
        </Pie>
        {/* Add a legend to the chart */}
        <Legend
          verticalAlign='bottom'
          height={50}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
