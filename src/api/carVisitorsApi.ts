/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SUPABASE_EDGE_URL || "";
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(BASE_URL, ANON_KEY);

export type CarVisitorParams = {
  device_id: string;
  name?: string | null;
  car_color?: string | null;
  wheel_color?: string | null;
};

export async function countVisitors(): Promise<number> {
  const { count, error } = await supabase
    .from("visitors")
    .select("*", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}
export async function recordVisit(params: CarVisitorParams) {
  try {
    const res = await axios.post(`${BASE_URL}/record_visit`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANON_KEY}`,
        apikey: `${ANON_KEY}`,
      },
    });
    return res.data;
  } catch (err: any) {
    if (err.response && err.response.data)
      throw new Error(JSON.stringify(err.response.data));
    throw err;
  }
}

export async function updateCar(params: CarVisitorParams) {
  try {
    const res = await axios.post(`${BASE_URL}/update_car`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANON_KEY}`,
        apikey: `${ANON_KEY}`,
      },
    });
    return res.data;
  } catch (err: any) {
    if (err.response && err.response.data)
      throw new Error(JSON.stringify(err.response.data));
    throw err;
  }
}

// Example: fetch all cars (you may need to adjust RLS or use a view for this)
export async function fetchAllCars() {
  // This assumes you have a public cars table or view
  const url = `${BASE_URL.replace("/functions/v1", "")}/rest/v1/cars?select=*`;
  try {
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${ANON_KEY}`, apikey: `${ANON_KEY}` },
    });
    return res.data;
  } catch (err: any) {
    if (err.response && err.response.data)
      throw new Error(JSON.stringify(err.response.data));
    throw err;
  }
}
