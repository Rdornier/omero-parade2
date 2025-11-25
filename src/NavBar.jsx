
// React Component for navigation bar
import React from "react";

export default function NavBar() {

    const styles = {
        navbar: {
            flex: "0 0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            boxSizing: "border-box",
            background: "#333",
            color: "#fff",
        }
    };

  return (
    <nav style={styles.navbar}>
      OMERO.parade2
    </nav>
  );
}
