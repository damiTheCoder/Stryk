import { useState, useEffect } from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import NumberModal from "../components/NumberModal";

const TIMEFRAMES = [
  { label: "1m", value: "1" },
  { label: "15m", value: "15" },
  { label: "1h", value: "60" },
  { label: "4h", value: "240" },
  { label: "D", value: "D" },
];
const SLIPPAGE_OPTIONS = ["0.1%", "0.5%", "1%"];

export default function TradePage() {
  const [fromToken, setFromToken] = useState("STRK");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5%");
  const [timeframe, setTimeframe] = useState("60");
  const [modalValue, setModalValue] = useState(null);
  const [side, setSide] = useState("buy");
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const quote = fromAmount ? (parseFloat(fromAmount) * 0.00031).toFixed(2) : "0.00";

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 px-4 py-2 bg-white dark:bg-black">
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <img src="/Logo.jpeg" alt="" className="h-7 w-7 rounded-full object-cover border-2 border-white dark:border-black relative z-10" />
                <img src="/usdc.png" alt="" className="h-7 w-7 rounded-full object-cover border-2 border-white dark:border-black" />
              </div>
              <h1 className="text-base font-bold text-gray-900 dark:text-white">SYK / USDC</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition">Save</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
              </button>
            </div>
          </div>

          <div className="flex-1 relative min-h-[300px] sm:min-h-0 pb-8">
            <AdvancedRealTimeChart
              key={isDark ? "dark" : "light"}
              autosize
              symbol="BINANCE:SYKUSDC"
              interval={timeframe}
              theme={isDark ? "dark" : "light"}
              style="1"
              locale="en"
              allow_symbol_change={false}
              hide_top_toolbar={false}
              hide_legend={false}
              withdateranges={true}
              hide_side_toolbar={false}
              save_image={true}
              details={true}
              hotlist={true}
              calendar={false}
              watchlist={[]}
            />
          </div>

          <div className="border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-black">
            <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar">
              <button className="px-3 py-1.5 text-xs sm:text-sm font-semibold bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg whitespace-nowrap">Open trades: 0</button>
              <button className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition whitespace-nowrap">Pending orders: 0</button>
              <button className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition whitespace-nowrap">Closed trades</button>
            </div>
            <div className="px-4 py-6 text-center">
              <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base mb-1">No open trades</p>
              <p className="text-xs sm:text-sm text-gray-500">Check out the Watchlist to see what's available to trade on</p>
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-zinc-800 bg-white dark:bg-black flex flex-col">
          <div className="flex border-b border-gray-200 dark:border-zinc-800">
            <button
              onClick={() => setSide("sell")}
              className={`flex-1 py-3 text-sm font-semibold transition ${
                side === "sell"
                  ? "text-rose-600 border-b-2 border-rose-600 bg-rose-50 dark:bg-rose-950/30"
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800"
              }`}
            >
              ↓ Sell
            </button>
            <button
              onClick={() => setSide("buy")}
              className={`flex-1 py-3 text-sm font-semibold transition ${
                side === "buy"
                  ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800"
              }`}
            >
              Buy ↑
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Available:</span>
              <span className="font-semibold text-gray-900 dark:text-white">847.5k $SYK</span>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Trade amount</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-blue-500 transition"
                />
                <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-zinc-700 px-2.5 py-2 rounded-lg">
                  <img src="/Logo.jpeg" alt="" className="h-5 w-5 rounded-full object-cover" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">$SYK</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {["0.24 lots", "0.25 lots", "0.5 lots", "0.75 lots"].map((lot) => (
                <button
                  key={lot}
                  className="flex-1 px-2 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
                >
                  {lot}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-xs font-medium text-gray-500">Take profit</span>
              <button className="w-10 h-5 bg-gray-200 dark:bg-zinc-700 rounded-full relative transition">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs font-medium text-gray-500">Stop loss</span>
              <button className="w-10 h-5 bg-gray-200 dark:bg-zinc-700 rounded-full relative transition">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs font-medium text-gray-500">Pending order</span>
              <button className="w-10 h-5 bg-gray-200 dark:bg-zinc-700 rounded-full relative transition">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
            <button
              disabled={!fromAmount}
              className={`w-full py-3.5 rounded-2xl text-sm font-bold transition ${
                side === "buy"
                  ? "bg-emerald-500 hover:bg-emerald-400 text-white"
                  : "bg-rose-500 hover:bg-rose-400 text-white"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              Open {side} trade
            </button>
          </div>
        </aside>
      </div>
      {modalValue !== null && <NumberModal value={modalValue} onClose={() => setModalValue(null)} />}
    </div>
  );
}
