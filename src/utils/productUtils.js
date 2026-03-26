/**
 * Get 2-letter store logo from store name (e.g. "Amazon" -> "AZ", "Home Depot" -> "HD").
 */
export function getStoreLogo(store) {
  if (!store || typeof store !== "string") return "—";
  const words = store.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase().slice(0, 2);
  }
  return store.slice(0, 2).toUpperCase();
}

/**
 * Parse price string from API (e.g. "$129", "N/A") to number or null.
 */
export function parsePrice(priceStr) {
  if (priceStr == null || priceStr === "N/A") return null;
  const num = parseFloat(String(priceStr).replace(/[^0-9.]/g, ""), 10);
  return Number.isFinite(num) ? num : null;
}
