import { useEffect, useState } from "react";
import { fetchAllCars, recordVisit } from "../api/carVisitorsApi";
import { getDeviceId } from "../utils/deviceId";

type CarResDto = {
  car_color?: string;
  wheel_color?: string;
  name?: string;
};

type Car = {
  carColor: string;
  wheelColor: string;
  name: string;
};

export function useCarVisitors() {
  const deviceId = getDeviceId();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCarsAndRecordVisit() {
      setLoading(true);
      setError(null);

      // record visit first
      try {
        await recordVisit({ device_id: deviceId });
      } catch (err) {
        // Optionally log or show error, but don't block car loading
        console.error("Failed to record visit", err);
      }

      // fetch cars after recording visit
      try {
        const data: CarResDto[] = await fetchAllCars();
        setCars(
          data.map((car, i) => ({
            carColor: car.car_color || "#4c91afff",
            wheelColor: car.wheel_color || "#4e4e4eff",
            name: car.name ? car.name : `anon ${i + 1}`,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchCarsAndRecordVisit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  return { cars, loading, error };
}
