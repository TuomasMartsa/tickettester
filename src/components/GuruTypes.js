import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

function GuruTypes(props) {
    const [types, setTypes] = useState([])

    const fetchTypes = () => {
        console.log(props.link)
        fetch(props.link)
        .then(response => response.json())
        .then(data => setTypes(data._embedded.types))
        .catch(err => console.error(err))
    }
    const columns = [
        { field: 'typename'},
        { field: 'price'}
    ]
    console.log(types)

    return (
        <div>
            <button onClick={fetchTypes}>
                Lipputyypit
            </button>
            <div className="ag-theme-material" style={{ height: 600, width: '95%', margin: 'auto', marginTop: 10 }}>
                <AgGridReact 
                rowData={types}
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

export default GuruTypes;