import * as omezarr from "https://cdn.jsdelivr.net/npm/ome-zarr.js@latest/+esm";
import { useState } from "react";

/** Show the number of rows in the table.
 * Example from https://idl.uw.edu/mosaic/web-clients/ 
 * If a `selection` is provided, show the filtered number of rows as well. */
export default function SidePanel(props) {
  const { selectedRows } = props;
  const ROW_ID = "File Path";

  const [imageUrl, setImageUrl] = useState(
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  );

  if (selectedRows.length == 1) {
    let row = selectedRows[0]
    if (row[ROW_ID]){
      omezarr.renderThumbnail(row[ROW_ID]).then((src) => {
        setImageUrl(src)
      });
    }else{
      let obj_id = null;
      let obj_col = null;
      // Check for ROI ID first, then Image ID...
      for (let imgCol of ["roi_id", "ROI","image_id", "Image", "Image ID"]) {
        console.log("Checking imgCol:", imgCol, row[imgCol]);
        if (row[imgCol] && Number.isInteger(row[imgCol])) {
          obj_id = row[imgCol];
          obj_col = imgCol;
          break;
        }
      }
      if (obj_id) {
        
        const isRoi = (obj_col.toLowerCase().startsWith("roi"))
        let url = `${window.OMEROWEB_INDEX}webgateway/render${ isRoi ? "_roi_" : "_" }thumbnail/${obj_id}/`;
        setImageUrl(url)
      }
    }

    return (

      <div style={{height: "200px"}}>
        <img
        src={imageUrl}
        alt="Thumbnail"
        style={{
            borderRadius: "10px",
            width: "100%",
            maxHeight: "500px",
            display: "block",
            marginBottom: "20px",
        }}
      />

        {Object.entries(selectedRows[0]).map(([key, value]) => {
          return(<div class="detail">
            <p><strong>{key}:</strong>
              {value}</p>
          </div>
          );
        })}
      </div>
    );
  }else{
    return (
      <div>{selectedRows.length} selected objects</div>
    )
  }

}