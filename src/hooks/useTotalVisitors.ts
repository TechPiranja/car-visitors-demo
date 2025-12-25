import { useEffect, useState } from "react";
import { supabaseClient as supabase } from "../supabaseClient";

export function useTotalVisitors() {
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);

  function fetchVisitorData() {
    supabase
      .from("visitors")
      .select("device_id", { count: "exact", head: true })
      .then(({ count }) => setTotalVisitors(count));
  }

  useEffect(() => {
    fetchVisitorData();
  }, []);

  return { totalVisitors };
}
