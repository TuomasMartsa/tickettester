import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Guru(props) {
    const [ticks, setTicks] = useState([])

    useEffect(() => {
        fetchGurus();
      }, []); 
    
/*       const fetchGurus = () => {
        fetch('https://hot-ticketguru.herokuapp.com/api/tickets')
        .then(response => response.json())
        .then(data => setTicks(data))
        .catch(err => console.error(err))
      }; */
      const fetchGurus = () => {
        axios({
          baseURL: 'https://hot-ticketguru.herokuapp.com/api/tickets',
          auth: {
              username: 'user',
              password: 'user'
            },
        })
        .then(response => {
          const data = response.data;
          setTicks(data)
          console.log(response + 'Authenticated');
        })
        .catch(function(error) {
          console.log('Error on Authentication');
        });
      }
 
console.log(ticks)
    return (
        <div>
            Guru
        </div>
    );
}

export default Guru;