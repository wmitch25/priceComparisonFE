import { SlidersHorizontal, DollarSign, Store, Star } from "lucide-react";

const RETAILERS = [
  "Amazon",
  "Home Depot",
  "Lowe's",
  "Walmart",
  "Target",
  "Best Buy",
];

export default function FilterSidebar({
  priceRange,
  onPriceRangeChange,
  selectedRetailers,
  onRetailerChange,
  minRating,
  onMinRatingChange,
}) {
  return (
    <div className="w-full space-y-6">
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="font-semibold text-white tracking-tight">Filters</h3>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">
              Price Range
            </span>
          </div>
          <div className="px-1">
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={priceRange[0]}
              onChange={(e) => {
                const v = Number(e.target.value);
                onPriceRangeChange([Math.min(v, priceRange[1]), priceRange[1]]);
              }}
              className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
            />
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={priceRange[1]}
              onChange={(e) => {
                const v = Number(e.target.value);
                onPriceRangeChange([priceRange[0], Math.max(v, priceRange[0])]);
              }}
              className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500 mt-1"
            />
            <div className="flex justify-between items-center text-sm font-medium mt-2">
              <div className="bg-slate-800 border border-slate-700 px-2 py-1 rounded-md text-slate-300">
                ${priceRange[0]}
              </div>
              <div className="bg-slate-800 border border-slate-700 px-2 py-1 rounded-md text-slate-300">
                ${priceRange[1]}
              </div>
            </div>
          </div>
        </div>

        {/* Retailer Filter */}
        <div className="space-y-4 py-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">Retailer</span>
          </div>
          <div className="space-y-3.5">
            {RETAILERS.map((retailer) => (
              <label
                key={retailer}
                className="flex items-center space-x-3 group cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedRetailers.includes(retailer)}
                  onChange={() => onRetailerChange(retailer)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800/50 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 focus:ring-2"
                />
                <span className="text-sm text-slate-400 font-medium group-hover:text-slate-50 transition-colors">
                  {retailer}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">
              Minimum Rating
            </span>
          </div>
          <div className="px-1">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => onMinRatingChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium text-slate-300">
                {minRating.toFixed(1)} stars
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">
                & Up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
