import { Search, TrendingUp, BarChart3, User } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              PriceRadar
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-1.5 text-sm font-medium text-slate-100 bg-slate-800 rounded-md transition-colors flex items-center gap-2 border border-slate-700"
            >
              <Search className="w-4 h-4 text-slate-400" />
              Search
            </button>
            <button
              type="button"
              className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 rounded-md transition-colors flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Tracked
            </button>
            <button
              type="button"
              className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 rounded-md transition-colors flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Insights
            </button>
          </div>
        </div>

        <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center cursor-pointer ring-2 ring-transparent hover:ring-indigo-500/50 transition-all">
          <User className="w-4 h-4 text-indigo-400" />
        </div>
      </div>
    </nav>
  );
}
