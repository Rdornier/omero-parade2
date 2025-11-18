import { useState } from "react";
import omeLogo from "./assets/ome-logomark.svg";
import "./App.css";
import Mosaic from "./Mosaic";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1><img
          src={omeLogo}
          className="logo"
          alt="OME logo"
        />OMERO parade 2</h1>

      <Mosaic />
    </>
  );
}

export default App;
