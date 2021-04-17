import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

function Tickets() {
  const [orders, setOrders] = useState([])
  const [username, setUsername] = useState('admin') 
  const [password, setPassword] = useState('password')
  const [code, setCode] = useState()
  const [ticket, setTicket] = useState([])
  const [uri, setUri] = useState()

  const inputChanged = (event) => {
    setUri('https://ticketguru.codecache.eu/api/soldtickets?code=' + event.target.value)
    setCode(event.target.value)
  }
  
  useEffect(() => {
    fetchEvents();
    }, []);

  const fetchEvents = () => {
    axios({
      baseURL: 'https://ticketguru.codecache.eu/api/orders',
      auth: {
          username: username,
          password: password
        },
    })
    .then(response => {
      const data = response.data;
      setOrders(data)
      console.log(response + 'Authenticated');
    })
    .catch(function(error) {
      console.log('Error on Authentication');
    });
  }
  console.log(orders)

  const submited = (event) => {
    event.preventDefault();
    console.log(uri);
    axios({
      baseURL: uri,
      auth: {
          username: username,
          password: password
        },
    })
    .then(response => {const data = response.data;
     setTicket(data)
    })
    .catch(err => console.error(err))
  }
  console.log(ticket)
 
  
  const addUsed = () => {
    console.log('addUsed')
    axios({
      baseURL: uri,
      method: 'PATCH',
      auth: {
        username: username,
        password: password
      },
      data: {
        "code": code
      }
    })
  }

    return (
        <div>
          <h3>Lippuntarkastustestaaja</h3>
          <form onSubmit={submited}>
            <label htmlFor="code">Koodi: </label>
            <input type="text" name="code" 
            onChange={inputChanged}/>
            <input type="submit" value="Send" />
          </form>
          <div style={{textAlign: 'center'}}>
            <p>Tapahtuma: {ticket.eventName}</p>
            <p>Koodi: {ticket.code}</p>
            <p>Lipputyyppi: {ticket.ticketType}</p>
            <p>Käytetty: {ticket.used}</p>
          </div>
          <button onClick={addUsed}>Käytä</button>
        </div>
    );
}

export default Tickets;