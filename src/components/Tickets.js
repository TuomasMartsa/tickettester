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

  const submitted = () => {
   // event.preventDefault();
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

  const addUsed = () => {
    axios({
      baseURL: 'https://ticketguru.codecache.eu/api/soldtickets/'+ticket.ticketID,
      method: 'PATCH',
      auth: {
        username: username,
        password: password
      },
      data: {
        "code": code
      }
    })
    .then(response =>{
      if(response.status === 200){
        alert('Käytetty');
        submitted();
      }
      else  
        alert('Epäonnistui')
    })
  }

    return (
        <div>
          <h3>Lippuntarkastustestaaja</h3>
            <label>Koodi: </label>
            <input type="text" name="code" 
            onChange={inputChanged}/>
            <button onClick={submitted}>Hae</button>
          
          <div style={{textAlign: 'center'}}>
            <p>Id: {ticket.ticketID}</p>
            <p>Tapahtuma: {ticket.eventName}</p>
            <p>Koodi: {ticket.code}</p>
            <p>Lipputyyppi: {ticket.ticketType}</p>
            <p>Käytetty: {ticket.usedDate}</p>
          </div>
          <button onClick={addUsed}>Käytä</button>
        </div>
    );
}

export default Tickets;