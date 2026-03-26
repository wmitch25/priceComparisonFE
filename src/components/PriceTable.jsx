import { Star, ArrowUpRight, TrendingDown } from "lucide-react";
import { getStoreLogo, parsePrice } from "../utils/productUtils.js";

export default function PriceTable({ results }) {
  if (!results || results.length === 0) {
    return null;
  }

  const withNumeric = results.map((r) => ({
    ...r,
    priceNum: parsePrice(r.price),
  }));
  const prices = withNumeric.map((r) => r.priceNum).filter((p) => p != null);
  const lowestPrice = prices.length ? Math.min(...prices) : null;

  return (
    <div className="bg-slate-900/50 rounded-2xl shadow-xl border border-slate-800 overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Table Header */}
          <div className="grid grid-cols-[minmax(180px,1fr)_minmax(200px,2fr)_120px_100px_120px] gap-4 px-6 py-4 border-b border-slate-800 bg-slate-950/50">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Retailer
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Product Details
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Rating
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 text-right">
              Price
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 text-right">
              Action
            </div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            {withNumeric.map((item, index) => {
              const isLowest =
                lowestPrice != null &&
                item.priceNum != null &&
                item.priceNum === lowestPrice;

              return (
                <div
                  key={item.link + index}
                  className={`grid grid-cols-[minmax(180px,1fr)_minmax(200px,2fr)_120px_100px_120px] gap-4 px-6 py-4 items-center group transition-colors duration-200 ${
                    index !== results.length - 1
                      ? "border-b border-slate-800/80"
                      : ""
                  } hover:bg-slate-800/40`}
                >
                  {/* Store Column */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-300 shrink-0 group-hover:border-indigo-500/50 group-hover:text-indigo-400 group-hover:bg-slate-800 transition-colors">
                      {getStoreLogo(item.store)}
                    </div>
                    <span className="font-medium text-slate-100">
                      {item.store}
                    </span>
                  </div>

                  {/* Product Column */}
                  <div className="min-w-0">
                    <p
                      className="text-sm font-medium text-slate-300 truncate"
                      title={item.title}
                    >
                      {item.title || "—"}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      {item.link ? "View details" : "—"}
                    </p>
                  </div>

                  {/* Rating Column - API doesn't provide rating */}
                  <div>
                    <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700 w-fit">
                      <Star className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-sm font-medium text-slate-500">
                        —
                      </span>
                    </div>
                  </div>

                  {/* Price Column */}
                  <div className="text-right flex flex-col items-end justify-center">
                    <div className="flex items-center gap-2">
                      {isLowest && (
                        <span className="flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          <TrendingDown className="w-3 h-3 mr-1" /> Best
                        </span>
                      )}
                      <span
                        className={`text-base font-semibold tabular-nums ${
                          isLowest ? "text-emerald-400" : "text-slate-100"
                        }`}
                      >
                        {item.price || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Action Column */}
                  <div className="text-right">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-8 w-full items-center justify-center gap-1.5 bg-slate-800 border border-slate-700 text-slate-300 hover:text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all font-medium rounded-lg shadow-sm group/btn"
                    >
                      Buy
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-indigo-400 transition-colors" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
