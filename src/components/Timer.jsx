import React, { useState, useEffect } from 'react';

function TimeandDate() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(new Date());
    };

    const intervalId = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  const formattedTime = currentDateTime.toLocaleTimeString();
  const formattedDate = currentDateTime.toLocaleDateString();

  return (
    <div style={{display: 'flex', justifyContent: 'space-around', marginRight: '30px', fontSize: '20px'}}>
      <p>{formattedTime}</p>
      <p>{formattedDate}</p>
    </div>
  );
}

export default TimeandDate;