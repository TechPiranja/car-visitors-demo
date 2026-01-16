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
        // Pastel color palettes
        const pastelCarColors = [
          "#4c7eb1ff",
          "#b5536aff",
          "#53ab8bff",
          "#f9ea5fff",
          "#ffa468ff",
          "#d0ff85ff",
          "#6281ffff",
          "#ff5044ff",
        ];
        const pastelWheelColors = [
          "#727272ff",
          "#4f3747ff",
          "#6e6e55ff",
          "#425647ff",
        ];

        function getRandom(arr: string[]) {
          return arr[Math.floor(Math.random() * arr.length)];
        }

        setCars(
          data.map((car) => ({
            carColor: car.car_color || getRandom(pastelCarColors),
            wheelColor: car.wheel_color || getRandom(pastelWheelColors),
            name: car.name ? car.name : "",
          })),
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
