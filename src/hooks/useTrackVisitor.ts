import { useEffect, useState } from "react";
import { supabaseClient as supabase } from "../supabaseClient";
import { getDeviceId } from "../utils/deviceId";

export function useTrackVisitor() {
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);
  const [uniqueVisitors, setUniqueVisitors] = useState<number | null>(null);

  function fetchVisitorData() {
    supabase
      .from("visitors")
      .select("device_id", { count: "exact", head: true })
      .then(({ count }) => setTotalVisitors(count));

    supabase.rpc("unique_visitors_count").then(({ data }) => {
      setUniqueVisitors(data as number);
    });
  }

  useEffect(() => {
    // Hook logic to track visitor using supabaseClient and getDeviceId
    const deviceId = getDeviceId();

    // upsert visitor in supabase
    supabase
      .from("visitors")
      .upsert({ device_id: deviceId, visited_at: new Date().toISOString() })
      .then(() => {
        // get unique visitor count
        fetchVisitorData();
      });
  }, []);

  return { totalVisitors, uniqueVisitors };
}
