import { Search } from "lucide-react";
import { useState } from "react";

const POPULAR = ["iPhone 15 Pro", "Sony WH-1000XM5", "Samsung S24"];

export default function HeroSearch({ onSearch, loading }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handlePopularClick = (term) => {
    setSearchQuery(term);
    onSearch(term);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          Tracking 1.2M+ Prices Daily
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white">
          Find the best price{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
            instantly
          </span>
          .
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
          Search millions of products across major retailers and never overpay
          again.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative z-10">
        <div className="relative flex items-center bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-2xl hover:border-slate-700 transition-colors">
          <Search className="absolute left-5 w-5 h-5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search for Dewalt 20V Drill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            className="flex-1 pl-12 pr-4 h-16 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-slate-500 text-white rounded-2xl disabled:opacity-60"
            aria-label="Product search"
          />
          <div className="pr-2">
            <button
              type="submit"
              disabled={loading}
              className="h-12 px-6 bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all rounded-xl font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Searching…" : "Search"}
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-500 mt-5 font-medium flex items-center justify-center gap-2 flex-wrap">
          Popular:{" "}
          {POPULAR.map((term, i) => (
            <span key={term}>
              <button
                type="button"
                onClick={() => handlePopularClick(term)}
                className="cursor-pointer hover:text-indigo-400 transition-colors text-slate-400"
              >
                {term}
              </button>
              {i < POPULAR.length - 1 && " · "}
            </span>
          ))}
        </p>
      </form>
    </div>
  );
}
