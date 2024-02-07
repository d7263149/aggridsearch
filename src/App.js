import logo from './logo.svg';
import './App.css';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, {
  StrictMode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createRoot } from 'react-dom/client';
function App() {
    const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' ,padding:'20px'}), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'age', minWidth: 100 },
    { field: 'gold', minWidth: 100 },
    { field: 'silver', minWidth: 100 },
    { field: 'bronze', minWidth: 100 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      'quickFilterText',
      document.getElementById('filter-text-box').value
    );
  }, []);


  return (
       <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <span>Quick Filter:</span>
          <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
        </div>

        <div
          style={gridStyle}
          className={
            "ag-theme-quartz"
          }
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            domLayout='autoHeight'
            pagination={true}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
