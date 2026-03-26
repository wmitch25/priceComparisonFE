import { useState, useMemo } from "react";
import Navigation from "../components/Navigation.jsx";
import HeroSearch from "../components/HeroSearch.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import PriceTable from "../components/PriceTable.jsx";
import { searchProducts } from "../services/api.js";
import { parsePrice } from "../utils/productUtils.js";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedRetailers, setSelectedRetailers] = useState([]);
  const [minRating, setMinRating] = useState(0);

  const handleSearch = async (query) => {
    const q = typeof query === "string" ? query.trim() : searchQuery.trim();
    if (!q) return;
    setError(null);
    setLoading(true);
    setSearchPerformed(true);
    setSearchQuery(q);
    setResults(null);
    try {
      const data = await searchProducts(q);
      setResults(data.results || []);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Search failed.";
      setError(message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetailerChange = (retailer) => {
    setSelectedRetailers((prev) =>
      prev.includes(retailer)
        ? prev.filter((r) => r !== retailer)
        : [...prev, retailer]
    );
  };

  const filteredResults = useMemo(() => {
    console.log("hi");
    if (!searchPerformed || !results) return [];

    return results.filter((item) => {
      const priceNum = parsePrice(item.price);
      const matchesPrice =
        priceNum == null ||
        (priceNum >= priceRange[0] && priceNum <= priceRange[1]);
      const matchesRetailer =
        selectedRetailers.length === 0 ||
        selectedRetailers.includes(item.store);
      return matchesPrice && matchesRetailer;
    });
  }, [searchPerformed, results, priceRange, selectedRetailers]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navigation />

      <HeroSearch onSearch={handleSearch} loading={loading} />

      {searchPerformed && (
        <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">
          <div className="flex flex-col lg:flex-row gap-10">
            <aside className="lg:sticky lg:top-24 lg:self-start w-full lg:w-72 shrink-0">
              <FilterSidebar
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedRetailers={selectedRetailers}
                onRetailerChange={handleRetailerChange}
                minRating={minRating}
                onMinRatingChange={setMinRating}
              />
            </aside>

            <main className="flex-1 min-w-0">
              {error && (
                <p className="text-red-400 mb-4 font-medium" role="alert">
                  {error}
                </p>
              )}

              <div className="mb-8 flex items-end justify-between border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">
                    Results for &quot;{searchQuery}&quot;
                  </h2>
                  <div className="flex items-center text-sm text-slate-400 font-medium">
                    <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md shadow-sm">
                      {filteredResults.length}{" "}
                      {filteredResults.length === 1 ? "product" : "products"}{" "}
                      found
                    </span>
                  </div>
                </div>
              </div>

              {filteredResults.length > 0 ? (
                <div className="opacity-100 transition-opacity duration-300">
                  <PriceTable results={filteredResults} />
                </div>
              ) : (
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-16 text-center shadow-sm flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-700">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No matching products
                  </h3>
                  <p className="text-slate-400 max-w-sm">
                    We couldn&apos;t find any products matching your current
                    filters. Try adjusting your search criteria or clearing
                    filters.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
