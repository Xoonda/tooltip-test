import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './App.css';
import { Tooltip } from "@mui/material";

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
//@ts-ignore
const Cell = (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    const blockRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (blockRef.current && textRef.current) {
            const blockWidth = blockRef.current.getBoundingClientRect().width
            const textWidth = textRef.current.getBoundingClientRect().width
            console.log(blockWidth, textWidth)
        }
    }, [])

    return (
        <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}} ref={blockRef}>
          <Tooltip title={'hello'} followCursor={true}>
              <span ref={textRef}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid, aut consequuntur, cumque delectus deserunt dicta distinctio dolore</span>
          </Tooltip>
       </div>
    );
}

function App() {

    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row



    const [columnDefs, setColumnDefs] = useState([
        {field: 'make', filter: true, cellRenderer: Cell},
        {field: 'model', filter: true},
        {field: 'price'}
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo( ()=> ({
        sortable: true
    }), []);

    // Example load data from sever
    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);



  return (
    <div className='App'>

        <div className="ag-theme-alpine" style={{width: 650, height: 500}}>

            <AgGridReact
                //@ts-ignore
                ref={gridRef} // Ref for accessing Grid's API
                rowData={rowData} // Row Data for Rows

                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties

                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='multiple' // Options - allows click selection of rows

            />
        </div>

    </div>
  );
}

export default App;
