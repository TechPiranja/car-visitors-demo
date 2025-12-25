import { useEffect, useState } from "react";
import { CarVisitors } from "./scripts/car-visitors";
import "./App.css";
import { fetchAllCars, recordVisit } from "./api/carVisitorsApi";
// Utility to get or create a device ID
function getDeviceId() {
  let id = localStorage.getItem("car_visitors_device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("car_visitors_device_id", id);
  }
  return id;
}

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Record the visit only once per page load
  useEffect(() => {
    const device_id = getDeviceId();
    recordVisit({ device_id })
      .then(() =>
        fetchAllCars()
          .then((data) => {
            setCars(
              data.map(
                (
                  car: {
                    car_color?: string;
                    wheel_color?: string;
                    name?: string;
                  },
                  i: number
                ) => ({
                  carColor: car.car_color || "#4caf50",
                  wheelColor: car.wheel_color || "#222",
                  label: car.name ? car.name : `anon ${i + 1}`,
                })
              )
            );
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message || String(err));
            setLoading(false);
          })
      )
      .catch((err) => {
        // Optionally log or show error, but don't block car loading
        console.error("Failed to record visit", err);
      });
  }, []);

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
      <p>Unique Visitors: {cars.length}</p>
      <p>Each car = 1 unique visitor. Name/number above car.</p>
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
