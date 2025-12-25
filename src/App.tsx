import { useEffect } from "react";
import { CarVisitors } from "./scripts/car-visitors";
import "./App.css";
import { useTrackVisitor } from "./hooks/useTrackVisitor";

function App() {
  const { uniqueVisitors, totalVisitors } = useTrackVisitor();
  useEffect(() => {
    const container = document.getElementById("my-street");
    if (container) {
      CarVisitors.render(container);
    }
  }, []);

  return (
    <>
      <h1>Car Visitors Demo</h1>

      <p>Unique Visitors: {uniqueVisitors}</p>
      <p>Total Visitors: {totalVisitors}</p>

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
