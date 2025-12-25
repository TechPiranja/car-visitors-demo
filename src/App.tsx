import { useEffect } from "react";
import { CarVisitors } from "./scripts/car-visitors";
import "./App.css";
import { useCarVisitors } from "./hooks/useCarVisitors";
import { useTotalVisitors } from "./hooks/useTotalVisitors";

function App() {
  // Custom hook handles device ID, visit recording, and car fetching
  const { cars, loading, error } = useCarVisitors();
  const { totalVisitors } = useTotalVisitors();

  // Render cars when data changes
  useEffect(() => {
    const container = document.getElementById("my-street");
    if (container && cars.length > 0) {
      CarVisitors.render(container, cars);
    }
  }, [cars]);

  return (
    <>
      <h1>Car Visitors Demo</h1>
      {loading && <p>Loading cars...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Total Page visits: {totalVisitors}</p>
      <p>Unique Visitors: {cars.length}</p>
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
