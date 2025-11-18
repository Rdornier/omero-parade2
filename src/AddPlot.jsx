import { makeClient } from "@uwdata/mosaic-core";
import { count, Query } from "@uwdata/mosaic-sql";
import { useState, useEffect } from "react";

export function AddPlot(props) {
  const { coordinator, table, selection, addPlot } = props;

  const [numberColNames, setNumberColNames] = useState([]);
  const [stringColNames, setStringColNames] = useState([]);

  useEffect(() => {
    // Note that the identity of `table` and `selection` is captured below.
    // If they are replaced with a new instances, the client will get recreated as well.

    const client = makeClient({
      coordinator,
      selection,
      prepare: async () => {
        // We setup the <select> elements with column names...
        coordinator.query("describe " + table).then((data) => {
          let col_info = data.toArray();
          console.log("col_info", col_info);
          let number_col_names = col_info
            .filter(
              (d) => d.column_type === "BIGINT" || d.column_type === "DOUBLE"
            )
            .map((d) => d.column_name);
          setNumberColNames(number_col_names);
          let string_col_names = col_info
            .filter((d) => d.column_type === "VARCHAR")
            .map((d) => d.column_name);
          setStringColNames(string_col_names);
        });
      },
      query: (predicate) => {
        console.log("AddPlot query()", predicate);
        // We don't actually need to run any queries here....
        // But IF we don't implement this, we get "null" errors.
        return Query.from(table).select({ count: count() }).where(predicate);
      },
      // queryResult: (data) => {
      //   console.log("AddPlot queryResult()", data);
      //   // The query result is available.
      //   // setFilteredCount(data.get(0).count);
      //   // setIsError(false);
      //   // setIsPending(false);
      // },
      // queryPending: () => {
      //   console.log("AddPlot queryPending()");
      //   // The query is pending.
      //   // setIsPending(true);
      //   // setIsError(false);
      // },
      // queryError: () => {
      //   console.log("AddPlot queryError()");
      //   // There is an error running the query.
      //   // setIsPending(false);
      //   // setIsError(true);
      // },
    });

    return () => {
      // Destroy the client on effect cleanup.
      client.destroy();
    };
  }, [coordinator, table, selection]);

  return (
    <div>
      <label>X-axis:</label>
      <select id="xaxis-select">
        {numberColNames.map((colName) => (
          <option key={colName} value={colName}>
            {colName}
          </option>
        ))}
      </select>

      <label>Y-axis:</label>
      <select id="yaxis-select">
        {numberColNames.map((colName) => (
          <option key={colName} value={colName}>
            {colName}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          let plotId = `scatter-plot-${Date.now()}`;
          const xAxis = document.getElementById("xaxis-select").value;
          const yAxis = document.getElementById("yaxis-select").value;
          addPlot({ xAxis, yAxis, plotId, type: "scatter" });
        }}
      >
        Add Scatter Plot
      </button>
    </div>
  );
}
