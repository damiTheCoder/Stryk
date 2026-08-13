import { useState } from "react";
import { formatCompact } from "../utils/format";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  BarChart3,
  PieChart,
  Flame,
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Repeat,
  CircleDollarSign,
  LineChart,
} from "lucide-react";

const MOCK_PROTOCOL_STATS = {
  totalSupply: 150000000,
  marketCap: 42750000,
  volume24h: 1250000,
  volume7d: 8450000,
  volume30d: 32100000,
  uniqueWallets: 28459,
};

const MOCK_TOKEN_METRICS = {
  price: "$0.285",
  change24h: "+4.32%",
  holders: [
    { range: "1 - 1,000", count: 12450, percent: 75 },
    { range: "1,001 - 10,000", count: 3120, percent: 18 },
    { range: "10,001 - 100,000", count: 850, percent: 5 },
    { range: "100,001+", count: 139, percent: 2 },
  ],
  burnRate: "0.5%",
  totalBurned: 7500000,
};

const MOCK_REVENUE = {
  feesCollected: 245000,
  spreadProfit: 128500,
  vaultYield: 89200,
  totalRevenue: 462700,
};

const VOLUME_LABELS = ["24h", "7d", "30d"];

export default function AnalyticsPage() {
  const [activeVolume, setActiveVolume] = useState("24h");

  const volumeValues = {
    "24h": MOCK_PROTOCOL_STATS.volume24h,
    "7d": MOCK_PROTOCOL_STATS.volume7d,
    "30d": MOCK_PROTOCOL_STATS.volume30d,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Analytics</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Protocol metrics, token data, and revenue dashboard.</p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6">
            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Protocol Stats
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl p-4 bg-surface">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Supply</p>
                   <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCompact(MOCK_PROTOCOL_STATS.totalSupply)}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">$STRYK</p>
                </div>
                <div className="rounded-2xl p-4 bg-surface">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
                   <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCompact(MOCK_PROTOCOL_STATS.marketCap)}</p>
                </div>
                <div className="rounded-2xl p-4 bg-surface">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Unique Wallets</p>
                   <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCompact(MOCK_PROTOCOL_STATS.uniqueWallets)}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-600 mb-3">Trading Volume</p>
                <div className="inline-flex rounded-xl bg-gray-100 p-1">
                  {VOLUME_LABELS.map((label) => (
                    <button
                      key={label}
                      onClick={() => setActiveVolume(label)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                         activeVolume === label ? "bg-gray-50 text-gray-900 dark:text-white shadow-sm" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                 <p className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">{formatCompact(volumeValues[activeVolume])}</p>
              </div>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <LineChart className="h-5 w-5 text-violet-600" />
                Token Metrics
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl p-5 bg-surface">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-600 dark:text-gray-300 dark:text-gray-600 dark:text-gray-400">Price</h3>
                   <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{MOCK_TOKEN_METRICS.price}</p>
                  <p className={`mt-1 inline-flex items-center gap-1 text-sm font-medium ${MOCK_TOKEN_METRICS.change24h.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>
                    {MOCK_TOKEN_METRICS.change24h.startsWith("+") ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {MOCK_TOKEN_METRICS.change24h}
                  </p>
                  <div className="mt-4 rounded-2xl p-4 text-center bg-surface">
                    <BarChart3 className="mx-auto h-6 w-6 text-gray-400 dark:text-gray-400" />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Price chart placeholder with technical overlays.</p>
                  </div>
                </div>
                <div className="rounded-2xl p-5 bg-surface">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-600 mb-3">Holder Distribution</h3>
                  <div className="space-y-3">
                    {MOCK_TOKEN_METRICS.holders.map((holder) => (
                      <div key={holder.range}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{holder.range}</span>
                          <span className="text-gray-900 dark:text-white font-medium">{formatCompact(holder.count)} ({holder.percent}%)</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-violet-500" style={{ width: `${holder.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-2xl p-3 bg-surface">
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Burn Rate</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{MOCK_TOKEN_METRICS.burnRate}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">{MOCK_TOKEN_METRICS.totalBurned} $STRYK burned</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                Revenue Dashboard
              </h2>
              <div className="space-y-4">
                <div className="rounded-2xl p-4 bg-surface">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fees Collected</p>
                    <Repeat className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                  </div>
                   <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCompact(MOCK_REVENUE.feesCollected)}</p>
                </div>
                <div className="rounded-2xl p-4 bg-surface">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Spread Profit</p>
                    <CircleDollarSign className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                  </div>
                   <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCompact(MOCK_REVENUE.spreadProfit)}</p>
                </div>
                <div className="rounded-2xl p-4 bg-surface">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Vault Yield Generated</p>
                    <Wallet className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                  </div>
                   <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCompact(MOCK_REVENUE.vaultYield)}</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-gray-900 p-4">
                <p className="text-sm text-gray-400 dark:text-gray-400">Total Revenue</p>
                 <p className="text-2xl font-semibold text-white">{formatCompact(MOCK_REVENUE.totalRevenue)}</p>
                <div className="mt-2 flex items-center gap-1 text-sm text-emerald-400">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12.5% vs last month</span>
                </div>
              </div>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Quick Insights
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Avg. Transaction Size", value: "$2,450", trend: "up" },
                  { label: "Daily Active Wallets", value: "4,832", trend: "up" },
                  { label: "Protocol Revenue (30d)", value: "$462.7K", trend: "up" },
                  { label: "New Holders (7d)", value: "1,245", trend: "down" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl p-3 bg-surface">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</span>
                      {item.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-rose-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
