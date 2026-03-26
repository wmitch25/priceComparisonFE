import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Calls backend search endpoint.
 *
 * Future extensions:
 * - price alerts: check if current results match saved alerts
 */
export async function searchProducts(query) {
  const { data } = await axios.get(`${API_BASE}/api/search`, {
    params: { q: query },
    timeout: 20000,
  });
  return data;
}
