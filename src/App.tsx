import { useEffect } from "react";
import { CarVisitors } from "./scripts/car-visitors";
import "./App.css";

function App() {
  useEffect(() => {
    const container = document.getElementById("my-street");
    if (container) {
      CarVisitors.render(container);
    }
  }, []);

  return (
    <>
      <h1>Car Visitors Demo</h1>

      <div
        id="my-street"
        style={{
          width: "100%",
          position: "fixed",
          left: 0,
          bottom: 0,
          zIndex: 10,
        }}
      />
    </>
  );
}

export default App;
