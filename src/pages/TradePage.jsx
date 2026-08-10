import { useState } from "react";
import { formatCompact } from "../utils/format";
import NumberModal from "../components/NumberModal";
import {
  ArrowRightLeft,
  Droplets,
  Wallet,
  TrendingUp,
} from "lucide-react";

const TOKENS = [
  { value: "STRK", label: "STRK" },
  { value: "USDC", label: "USDC" },
  { value: "USDT", label: "UST" },
  { value: "ETH", label: "ETH" },
  { value: "BTC", label: "BTC" },
];

const MOCK_PRICE_HISTORY = [
  { time: "00:00", price: 0.00025 },
  { time: "04:00", price: 0.00026 },
  { time: "08:00", price: 0.00028 },
  { time: "12:00", price: 0.00027 },
  { time: "16:00", price: 0.00029 },
  { time: "20:00", price: 0.00031 },
];

const MOCK_ORDER_BOOK = {
  bids: [
    { price: 0.00030, amount: 120000, total: "36.00" },
    { price: 0.00029, amount: 85000, total: "24.65" },
    { price: 0.00028, amount: 210000, total: "58.80" },
    { price: 0.00027, amount: 55000, total: "14.85" },
    { price: 0.00026, amount: 95000, total: "24.70" },
  ],
  asks: [
    { price: 0.00031, amount: 140000, total: "43.40" },
    { price: 0.00032, amount: 75000, total: "24.00" },
    { price: 0.00033, amount: 160000, total: "52.80" },
    { price: 0.00034, amount: 90000, total: "30.60" },
    { price: 0.00035, amount: 110000, total: "38.50" },
  ],
};

const MOCK_LIQUIDITY = {
  totalLiquidity: 2450000,
  yourLpTokens: 12500,
  apr: 18.4,
};

const TIMEFRAMES = ["1D", "1W", "1M", "1Y"];

const SLIPPAGE_OPTIONS = ["0.1%", "0.5%", "1%"];

export default function TradePage() {
  const [fromToken, setFromToken] = useState("STRK");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5%");
  const [timeframe, setTimeframe] = useState("1D");
  const [modalValue, setModalValue] = useState(null);

  const quote = fromAmount ? (parseFloat(fromAmount) * 0.00031).toFixed(2) : "0.00";
  const maxPrice = Math.max(...MOCK_PRICE_HISTORY.map((p) => p.price));
  const minPrice = Math.min(...MOCK_PRICE_HISTORY.map((p) => p.price));
  const priceRange = maxPrice - minPrice || 1;

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  return (
    <div className="uniswap-trade-page">
      <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-4">
        <header>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Trade</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Swap, chart, and liquidity pool metrics for $STRYK.</p>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <aside className="space-y-4 lg:col-span-1">
            <div className="uniswap-card">
              <div className="p-4 pb-2">
                <h2 className="uniswap-section-title mb-4">Swap</h2>
              </div>
              <div className="px-4 pb-4 space-y-3">
                <div className="rounded-2xl p-4 bg-surface">
                  <label className="uniswap-label">From</label>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      placeholder="0.00"
                      className="uniswap-input text-xl font-medium"
                      style={{ minHeight: "56px", fontSize: "20px" }}
                    />
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <img src="/Logo.jpeg" alt="" className="h-7 w-7 rounded-full object-cover" />
                      <select
                        value={fromToken}
                        onChange={(e) => setFromToken(e.target.value)}
                        className="uniswap-input"
                        style={{ minHeight: "44px", fontSize: "15px", padding: "0 12px", width: "auto" }}
                      >
                        {TOKENS.map((token) => (
                          <option key={token.value} value={token.value}>{token.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface">
                    <ArrowRightLeft className="h-5 w-5" style={{ color: "#6B7280" }} />
                  </div>
                </div>

                <div className="rounded-2xl p-4 bg-surface">
                  <label className="uniswap-label">To</label>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={toToken === "USDC" ? quote : "0.00"}
                      readOnly
                      className="uniswap-input text-xl font-medium"
                      style={{ minHeight: "56px", fontSize: "20px" }}
                    />
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {toToken === "USDC" && <img src="/usdc.png" alt="" className="h-7 w-7 rounded-full object-cover" />}
                      <select
                        value={toToken}
                        onChange={(e) => setToToken(e.target.value)}
                        className="uniswap-input"
                        style={{ minHeight: "44px", fontSize: "15px", padding: "0 12px", width: "auto" }}
                      >
                        {TOKENS.filter((t) => t.value !== fromToken).map((token) => (
                          <option key={token.value} value={token.value}>{token.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {fromAmount && (
                    <p className="mt-3 text-sm" style={{ color: "#6B7280" }}>
                      1 {fromToken} ≈ {toToken === "USDC" ? "$0.00031" : "0.00031"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="uniswap-label">Slippage Tolerance</label>
                  <div className="mt-2 flex gap-2">
                    {SLIPPAGE_OPTIONS.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSlippage(option)}
                        className={`uniswap-chip flex-1 justify-center text-base ${slippage === option ? "active" : ""}`}
                        style={{ padding: "10px 16px", fontSize: "15px" }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="uniswap-btn-primary w-full" style={{ minHeight: "56px", fontSize: "18px" }} disabled={!fromAmount}>
                  Swap
                </button>
              </div>
            </div>

            <div className="uniswap-card">
              <div className="p-4 pb-2">
                <h2 className="uniswap-section-title mb-3">Liquidity Pool</h2>
              </div>
              <div className="px-4 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Droplets className="h-5 w-5" style={{ color: "#2563EB" }} />
                    <span className="text-base" style={{ color: "#374151" }}>Total Liquidity</span>
                  </div>
                  <span className="text-base font-semibold" style={{ color: "#111827" }}>{formatCurrency(MOCK_LIQUIDITY.totalLiquidity)}</span>
                </div>
                <hr className="uniswap-divider" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wallet className="h-5 w-5" style={{ color: "#2563EB" }} />
                    <span className="text-base" style={{ color: "#374151" }}>Your LP Tokens</span>
                  </div>
                  <span className="text-base font-semibold cursor-pointer hover:text-blue-600 transition-colors" style={{ color: "#111827" }} onClick={() => setModalValue(MOCK_LIQUIDITY.yourLpTokens.toLocaleString())}>{formatCompact(MOCK_LIQUIDITY.yourLpTokens)}</span>
                </div>
                <hr className="uniswap-divider" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5" style={{ color: "#2563EB" }} />
                    <span className="text-base" style={{ color: "#374151" }}>APR</span>
                  </div>
                  <span className="text-base font-semibold" style={{ color: "#059669" }}>{MOCK_LIQUIDITY.apr}%</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-4 lg:col-span-2">
            <div className="uniswap-card">
              <div className="p-4 pb-0 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center -space-x-2">
                    <img src="/Logo.jpeg" alt="" className="h-6 w-6 rounded-full object-cover border-2 border-white dark:border-black" />
                    <img src="/usdc.png" alt="" className="h-6 w-6 rounded-full object-cover border-2 border-white dark:border-black" />
                  </div>
                  <h2 className="uniswap-section-title">SYK / USDC</h2>
                </div>
                <div className="flex gap-2 rounded-xl p-1 bg-surface">
                  {TIMEFRAMES.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`uniswap-chip justify-center ${timeframe === tf ? "active" : ""}`}
                      style={{ padding: "8px 16px", fontSize: "14px" }}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="h-64 w-full">
                  <svg viewBox="0 0 500 200" className="h-full w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M 0 ${200 - ((MOCK_PRICE_HISTORY[0].price - minPrice) / priceRange) * 180} ${MOCK_PRICE_HISTORY.slice(1).map((point, i) => `L ${(i + 1) * (500 / (MOCK_PRICE_HISTORY.length - 1))} ${200 - ((point.price - minPrice) / priceRange) * 180}`).join(" ")}`}
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={`M 0 ${200 - ((MOCK_PRICE_HISTORY[0].price - minPrice) / priceRange) * 180} ${MOCK_PRICE_HISTORY.slice(1).map((point, i) => `L ${(i + 1) * (500 / (MOCK_PRICE_HISTORY.length - 1))} ${200 - ((point.price - minPrice) / priceRange) * 180}`).join(" ")} L 500 200 L 0 200 Z`}
                      fill="url(#chartGradient)"
                      stroke="none"
                    />
                  </svg>
                </div>
              </div>

              <div className="p-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-surface px-3 py-2">
                  <p className="text-xs font-medium text-gray-500">Open</p>
                  <p className="text-sm font-semibold text-gray-900">0.00025</p>
                </div>
                <div className="rounded-xl bg-surface px-3 py-2">
                  <p className="text-xs font-medium text-gray-500">High</p>
                  <p className="text-sm font-semibold text-emerald-600 cursor-pointer hover:text-blue-600 transition" onClick={() => setModalValue(maxPrice.toLocaleString())}>{formatCompact(maxPrice)}</p>
                </div>
                <div className="rounded-xl bg-surface px-3 py-2">
                  <p className="text-xs font-medium text-gray-500">Low</p>
                  <p className="text-sm font-semibold text-rose-600 cursor-pointer hover:text-blue-600 transition" onClick={() => setModalValue(minPrice.toLocaleString())}>{formatCompact(minPrice)}</p>
                </div>
                <div className="rounded-xl bg-surface px-3 py-2">
                  <p className="text-xs font-medium text-gray-500">Volume</p>
                  <p className="text-sm font-semibold text-gray-900">4.2M</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="uniswap-card">
                <div className="p-4 pb-2">
                  <h3 className="uniswap-section-title mb-3">Order Book</h3>
                </div>
                <div className="px-4 pb-4 space-y-2">
                  <div>
                    <p className="mb-3 text-base font-semibold" style={{ color: "#059669" }}>Bids</p>
                    <div className="space-y-2">
                      {MOCK_ORDER_BOOK.bids.map((bid, idx) => (
                        <div key={idx} className="flex items-center justify-between rounded-xl px-4 py-3 bg-surface">
                          <div className="w-1/2">
                            <p className="text-base font-semibold" style={{ color: "#059669" }}>{bid.price}</p>
                          </div>
                          <div className="w-1/4 text-right">
                            <p className="text-base" style={{ color: "#374151" }}>{formatCompact(bid.amount)}</p>
                          </div>
                          <div className="w-1/4 text-right">
                             <p className="text-base font-medium" style={{ color: "#111827" }}>{bid.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-base font-semibold" style={{ color: "#DC2626" }}>Asks</p>
                    <div className="space-y-2">
                      {MOCK_ORDER_BOOK.asks.map((ask, idx) => (
                        <div key={idx} className="flex items-center justify-between rounded-xl px-4 py-3 bg-surface">
                          <div className="w-1/2">
                            <p className="text-base font-semibold" style={{ color: "#DC2626" }}>{ask.price}</p>
                          </div>
                          <div className="w-1/4 text-right">
                            <p className="text-base" style={{ color: "#374151" }}>{formatCompact(ask.amount)}</p>
                          </div>
                          <div className="w-1/4 text-right">
                             <p className="text-base font-medium" style={{ color: "#111827" }}>{ask.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="uniswap-card">
                <div className="p-4 pb-2">
                  <h3 className="uniswap-section-title mb-3">Depth Chart</h3>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex h-40 items-end justify-between gap-1.5">
                    {MOCK_ORDER_BOOK.bids.map((bid, idx) => {
                      const maxTotal = Math.max(
                        ...MOCK_ORDER_BOOK.bids.map((b) => parseFloat(b.total)),
                        ...MOCK_ORDER_BOOK.asks.map((a) => parseFloat(a.total))
                      );
                      const bidHeight = (parseFloat(bid.total) / maxTotal) * 100;
                      return (
                        <div
                          key={`bid-${idx}`}
                          className="flex-1 rounded-t-lg"
                          style={{ height: `${bidHeight}%`, background: "#059669" }}
                          title={`${bid.price}: ${bid.total}`}
                        />
                      );
                    })}
                    {MOCK_ORDER_BOOK.asks.map((ask, idx) => {
                      const maxTotal = Math.max(
                        ...MOCK_ORDER_BOOK.bids.map((b) => parseFloat(b.total)),
                        ...MOCK_ORDER_BOOK.asks.map((a) => parseFloat(a.total))
                      );
                      const askHeight = (parseFloat(ask.total) / maxTotal) * 100;
                      return (
                        <div
                          key={`ask-${idx}`}
                          className="flex-1 rounded-t-lg"
                          style={{ height: `${askHeight}%`, background: "#DC2626" }}
                          title={`${ask.price}: ${ask.total}`}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm font-medium" style={{ color: "#6B7280" }}>
                    <span>Price</span>
                    <span>Depth</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {modalValue !== null && <NumberModal value={modalValue} onClose={() => setModalValue(null)} />}
    </div>
  );
}
