import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import GuruTypes from './GuruTypes';
import{BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Guru(props) {
  const [ticks, setTicks] = useState([])
  const [code, setCode] = useState()

  const [uri, setUri] = useState()

  const inputChanged = (event) => {
    setUri('https://hot-ticketguru.herokuapp.com/api/tickets/' + event.target.value)
  }

  useEffect(() => {
      fetchGurus();
    }, []); 

  const fetchGurus = () => {
    axios({
      baseURL: 'https://hot-ticketguru.herokuapp.com/api/vents',
      auth: {
          username: 'user',
          password: 'user'
        },
    })
    .then(response => {
      const data = response.data;
      setTicks(data._embedded.vents)
      console.log(response + 'Authenticated');
    })
    .catch(function(error) {
      console.log('Error on Authentication');
    });
  }

    const guruById = () => {
    // event.preventDefault();
      console.log(uri);
      axios({
        baseURL: uri,
        auth: {
          username: 'user',
          password: 'user'
          },
      })
      .then(response => {const data = response.data;
      setTicks(data)
      })
      .catch(err => console.error(err))
    }

    const columns = [
      { field: 'performer'},
      { field: 'eventtime'},
      { field: 'eventname'},
      { headerName: '',
            field: '_links.types.href',
            width: 200,
            cellRendererFramework: params =>
                <Router>
                  <Link to="/types" component={GuruTypes} link={ params.value }>
                  </Link>
                </Router>
        }
    ]

    return (
        <div>
{/*           <h3>Guru</h3>
            <label>Id: </label>
            <input type="text" name="code" 
            onChange={inputChanged}/>
            <button onClick={guruById}>Hae</button> */}
            <div className="ag-theme-material" style={{ height: 600, width: '95%', margin: 'auto', marginTop: 10 }}>
                <AgGridReact 
                rowData={ticks}
                columnDefs={columns}
                defaultColDef={{
                    sortable: true,
                    resizable: true,
                    filter: true,
                  }}
                
                />
            </div>
        </div>
    );
}

export default Guru;