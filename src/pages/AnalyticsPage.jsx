import { useState } from "react";
import { formatCompact, formatCurrency } from "../utils/format";
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
  Smartphone,
  Truck,
  CheckCircle2,
} from "lucide-react";

const MOCK_PROTOCOL_STATS = {
  totalTradesIn: 12450,
  totalUpgrades: 3890,
  totalPayoutUsd: 2450000,
  uniqueUsers: 28459,
};

const MOCK_DEVICE_METRICS = {
  avgTradeInValue: "$485",
  topDevice: "iPhone 15 Pro",
  fulfillmentRate: "99.2%",
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
    "24h": MOCK_PROTOCOL_STATS.totalPayoutUsd,
    "7d": MOCK_PROTOCOL_STATS.totalPayoutUsd * 7,
    "30d": MOCK_PROTOCOL_STATS.totalPayoutUsd * 30,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Analytics</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Recommerce metrics, device data, and payout dashboard.</p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6">
            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Platform Stats
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl p-4 bg-surface">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Trade-Ins</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCompact(MOCK_PROTOCOL_STATS.totalTradesIn)}</p>
                </div>
                <div className="rounded-2xl p-4 bg-surface">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Upgrades</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCompact(MOCK_PROTOCOL_STATS.totalUpgrades)}</p>
                </div>
                <div className="rounded-2xl p-4 bg-surface">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Unique Users</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCompact(MOCK_PROTOCOL_STATS.uniqueUsers)}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-600 mb-3">Total Payouts</p>
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
                 <p className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">{formatCurrency(volumeValues[activeVolume])}</p>
              </div>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <LineChart className="h-5 w-5 text-violet-600" />
                Device Metrics
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl p-5 bg-surface">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-600 dark:text-gray-300 dark:text-gray-600 dark:text-gray-400">Avg. Trade-In Value</h3>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{MOCK_DEVICE_METRICS.avgTradeInValue}</p>
                  <p className={`mt-1 inline-flex items-center gap-1 text-sm font-medium text-emerald-600`}>
                    <TrendingUp className="h-4 w-4" />
                    +3.2% this week
                  </p>
                  <div className="mt-4 rounded-2xl p-4 text-center bg-surface">
                    <Smartphone className="mx-auto h-6 w-6 text-gray-400 dark:text-gray-400" />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Top device: {MOCK_DEVICE_METRICS.topDevice}</p>
                  </div>
                </div>
                <div className="rounded-2xl p-5 bg-surface">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-600 mb-3">Fulfillment</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">QC Pass Rate</span>
                      <span className="text-gray-900 dark:text-white font-medium">{MOCK_DEVICE_METRICS.fulfillmentRate}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${99.2}%` }} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-2xl p-3 bg-surface">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Ship Time</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">3.5 days</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded-2xl p-3 bg-surface">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Customer Satisfaction</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                Payout Dashboard
              </h2>
              <div className="space-y-4">
                <div className="rounded-2xl p-4 bg-surface">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Paid Out</p>
                    <Repeat className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                  </div>
                    <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCurrency(MOCK_REVENUE.feesCollected)}</p>
                </div>
                <div className="rounded-2xl p-4 bg-surface">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Trade-In Volume</p>
                    <CircleDollarSign className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                  </div>
                    <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCurrency(MOCK_REVENUE.spreadProfit)}</p>
                </div>
                <div className="rounded-2xl p-4 bg-surface">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Upgrade Credits Issued</p>
                    <Wallet className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                  </div>
                    <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCurrency(MOCK_REVENUE.vaultYield)}</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-gray-900 p-4">
                <p className="text-sm text-gray-400 dark:text-gray-400">Total Payout Volume</p>
                 <p className="text-2xl font-semibold text-white">{formatCurrency(MOCK_REVENUE.totalRevenue)}</p>
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
                  { label: "Avg. Trade-In Value", value: "$485", trend: "up" },
                  { label: "Daily Active Users", value: "4,832", trend: "up" },
                  { label: "Payout Volume (30d)", value: "$462.7K", trend: "up" },
                  { label: "New Trade-Ins (7d)", value: "1,245", trend: "down" },
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
