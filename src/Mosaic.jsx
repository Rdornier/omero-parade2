
import { useState, useEffect } from 'react'

import { coordinator, Selection, DuckDBWASMConnector } from '@uwdata/mosaic-core';
import { loadCSV } from '@uwdata/mosaic-sql';
import * as vg from '@uwdata/vgplot';


import { Count } from './TableCount';


const TABLE_NAME = "my_table";


function Mosaic() {

    const [selection, setSelection] = useState(null);

    // when this component mounts, set up the mosaic environment...
    useEffect(() => {
        async function setupMosaic() {
            console.log("Setting up Mosaic...");
            // set up DuckDB connector
            const wasm = new DuckDBWASMConnector({ log: false });
            coordinator().databaseConnector(wasm);
    
            await vg.coordinator().exec([loadCSV(TABLE_NAME, `${window.location}omero_table.csv`)]);

            const newSelection = Selection.intersect();
            // trigger a re-render with the new selection
            setSelection(newSelection);

            // debug - html table output
            let html = vg.table({from: TABLE_NAME, filterBy: newSelection, height: 300, width: 1000});
            console.log("html:", html);
        }
        setupMosaic();
    }, []);

  return (
    <>
        <h1>Mosaic Component</h1>

        <Count coordinator={coordinator()} table={TABLE_NAME} selection={selection} />
    </>
  )
}

export default Mosaic
