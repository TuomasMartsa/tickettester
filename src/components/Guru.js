import React, { useEffect, useState } from 'react';

function Guru(props) {
    const [ticks, setTicks] = useState([])

    useEffect(() => {
        fetchGurus();
      }, []); 
    
      const fetchGurus = () => {
        fetch('https://hot-ticketguru.herokuapp.com/api/tickets')
        .then(response => response.json())
        .then(data => setTicks(data))
        .catch(err => console.error(err))
        
      };
console.log(ticks)
    return (
        <div>
            Guru
        </div>
    );
}

export default Guru;