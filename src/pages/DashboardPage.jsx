import { useState, useEffect } from "react";
import { formatCompact } from "../utils/format";
import NumberModal from "../components/NumberModal";
import {
  ArrowUpRight,
  ArrowDownRight,
  Repeat,
  ShieldCheck,
  ChevronDown,
  Lock,
} from "lucide-react";

const MOCK_PORTFOLIO = {
  balance: 847500,
  usdValue: 211.87,
  redemptionThreshold: 1000000,
  stakingRewards: 12450,
};

const MOCK_TRANSACTIONS = [
  { id: "1", type: "buy", amount: 50000, token: "$SYK", date: "2026-08-03", status: "Completed" },
  { id: "2", type: "stake", amount: 120000, token: "$SYK", date: "2026-08-02", status: "Completed" },
  { id: "3", type: "sell", amount: 25000, token: "$SYK", date: "2026-08-01", status: "Completed" },
  { id: "4", type: "stake", amount: 80000, token: "$SYK", date: "2026-07-31", status: "Completed" },
  { id: "5", type: "buy", amount: 200000, token: "$SYK", date: "2026-07-30", status: "Completed" },
  { id: "6", type: "redeem", amount: "1 Phone", token: "Galaxy S25", date: "2026-07-29", status: "Completed" },
];

const MOCK_VAULT = {
  totalPhones: 1240,
  utilizationPercent: 87,
  lastAudit: "2026-08-03T14:22:00Z",
};

const FILTERS = ["All", "Buy", "Sell", "Stake", "Redeem"];

const TRANSACTION_ICONS = {
  buy: ArrowUpRight,
  sell: ArrowDownRight,
  stake: Repeat,
  redeem: ShieldCheck,
};

const TRANSACTION_COLORS = {
  buy: "text-emerald-600 dark:text-emerald-400",
  sell: "text-rose-600 dark:text-rose-400",
  stake: "text-blue-600 dark:text-blue-400",
  redeem: "text-purple-600 dark:text-purple-400",
};

export default function DashboardPage() {
  const [txFilter, setTxFilter] = useState("All");
  const [modalValue, setModalValue] = useState(null);
  const canRedeem = MOCK_PORTFOLIO.balance >= MOCK_PORTFOLIO.redemptionThreshold;
  const progress = Math.min((MOCK_PORTFOLIO.balance / MOCK_PORTFOLIO.redemptionThreshold) * 100, 100);

  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const [activeMetric, setActiveMetric] = useState("balance");
  const [showMetricModal, setShowMetricModal] = useState(false);

  useEffect(() => {
    const checkDark = () => setIsDarkMode(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showMetricModal) return;
    const handleClick = (e) => {
      if (!e.target.closest(".dashboard-metrics")) setShowMetricModal(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showMetricModal]);

  const filteredTransactions = txFilter === "All"
    ? MOCK_TRANSACTIONS
    : MOCK_TRANSACTIONS.filter((tx) => tx.type === txFilter.toLowerCase());

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.coingecko.com/gecko-coin-price-marquee-widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="mx-auto max-w-7xl p-4 md:p-6 space-y-1 md:space-y-4">
        <header className="dashboard-header">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            <img
              src="/L1.png"
              alt="Memoji"
              className="h-9 w-9 rounded-full object-cover rotate-12 border-2 border-white dark:border-zinc-800 shadow-sm"
            />
          </div>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Overview of your $SYK portfolio and vault status.</p>
        </header>

        <div className="dashboard-metrics">
          <div className="min-w-[220px] flex flex-col items-center text-center relative">
            <img
              src="/L1.png"
              alt="Memoji"
              className="absolute -top-2 -right-2 h-10 w-10 rounded-full object-cover rotate-12 border-2 border-white dark:border-zinc-800 shadow-md"
            />
            <button
              className="text-sm font-medium text-gray-500 dark:text-gray-400 inline-flex items-center gap-1"
              onClick={() => setShowMetricModal((v) => !v)}
            >
              {activeMetric === "balance" ? "$SYK Balance" : activeMetric === "redemption" ? "Redemption Progress" : "Staking Rewards Accrued"}
              <ChevronDown
                size={16}
                className={`transition-transform ${showMetricModal ? "rotate-180" : ""}`}
              />
            </button>

            {showMetricModal && (
              <div className="absolute top-full mt-2 w-64 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg z-50 text-left overflow-hidden">
                {activeMetric !== "balance" && (
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                    onClick={() => { setActiveMetric("balance"); setShowMetricModal(false); }}
                  >
                    $SYK Balance
                  </button>
                )}
                {activeMetric !== "redemption" && (
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                    onClick={() => { setActiveMetric("redemption"); setShowMetricModal(false); }}
                  >
                    Redemption Progress
                  </button>
                )}
                {activeMetric !== "rewards" && (
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                    onClick={() => { setActiveMetric("rewards"); setShowMetricModal(false); }}
                  >
                    Staking Rewards Accrued
                  </button>
                )}
              </div>
            )}

            {activeMetric === "balance" && (
              <>
                <p
                  className="mt-2 text-3xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition"
                  onClick={() => setModalValue(MOCK_PORTFOLIO.balance.toLocaleString())}
                >
                  {formatCompact(MOCK_PORTFOLIO.balance)}
                </p>
                <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium">{formatCurrency(MOCK_PORTFOLIO.usdValue)}</p>
              </>
            )}
            {activeMetric === "redemption" && (
              <>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{progress.toFixed(1)}%</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formatCompact(MOCK_PORTFOLIO.redemptionThreshold - MOCK_PORTFOLIO.balance)} more to redeem
                </p>
              </>
            )}
            {activeMetric === "rewards" && (
              <>
                <p
                  className="mt-2 text-3xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition"
                  onClick={() => setModalValue(MOCK_PORTFOLIO.stakingRewards.toLocaleString() + " $SYK")}
                >
                  {formatCompact(MOCK_PORTFOLIO.stakingRewards)} $SYK
                </p>
                <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium">+12.4% this month</p>
              </>
            )}
          </div>

          <div className="dashboard-metric-card dashboard-metric-card-hidden">
            <div className="border-r border-gray-200 dark:border-gray-800 pr-8 min-w-[220px] shrink-0 flex flex-col justify-between">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Redemption Progress</p>
              <p className="mt-2 text-3xl font-medium text-gray-900 dark:text-white">{progress.toFixed(1)}%</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {formatCompact(MOCK_PORTFOLIO.redemptionThreshold - MOCK_PORTFOLIO.balance)} more to redeem
              </p>
            </div>
          </div>

          <div className="dashboard-metric-card dashboard-metric-card-hidden">
            <div className="min-w-[220px] shrink-0 flex flex-col justify-between">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Staking Rewards Accrued</p>
              <p
                className="mt-2 text-3xl font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition"
                onClick={() => setModalValue(MOCK_PORTFOLIO.stakingRewards.toLocaleString() + " $SYK")}
              >
                {formatCompact(MOCK_PORTFOLIO.stakingRewards)} $SYK
              </p>
              <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium">+12.4% this month</p>
            </div>
          </div>
        </div>

        <div className="dashboard-metrics-desktop hidden md:flex">
          <div className="border-r border-gray-200 dark:border-gray-800 pr-8 min-w-[220px] shrink-0 flex flex-col justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">$SYK Balance</p>
            <p
              className="mt-2 text-3xl font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition"
              onClick={() => setModalValue(MOCK_PORTFOLIO.balance.toLocaleString())}
            >
              {formatCompact(MOCK_PORTFOLIO.balance)}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{formatCurrency(MOCK_PORTFOLIO.usdValue)}</p>
          </div>

          <div className="border-r border-gray-200 dark:border-gray-800 pr-8 min-w-[220px] shrink-0 flex flex-col justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Redemption Progress</p>
            <p className="mt-2 text-3xl font-medium text-gray-900 dark:text-white">{progress.toFixed(1)}%</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {formatCompact(MOCK_PORTFOLIO.redemptionThreshold - MOCK_PORTFOLIO.balance)} more to redeem
            </p>
          </div>

          <div className="min-w-[220px] shrink-0 flex flex-col justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Staking Rewards Accrued</p>
            <p
              className="mt-2 text-3xl font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition"
              onClick={() => setModalValue(MOCK_PORTFOLIO.stakingRewards.toLocaleString() + " $SYK")}
            >
              {formatCompact(MOCK_PORTFOLIO.stakingRewards)} $SYK
            </p>
            <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium">+12.4% this month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-4">
            <div className="uniswap-card p-6">
              <h2 className="uniswap-section-title hidden sm:block">Quick Actions</h2>
              <div className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-3">
                <div className="flex flex-col items-center gap-1 sm:hidden">
                  <button className="w-14 h-14 rounded-full bg-blue-600 text-white transition hover:bg-blue-500 inline-flex items-center justify-center">
                    <ArrowUpRight className="h-6 w-6" />
                  </button>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Buy $SYK</span>
                </div>
                <div className="flex flex-col items-center gap-1 sm:hidden">
                  <button className="w-14 h-14 rounded-full bg-gray-900 dark:bg-zinc-800 text-white transition hover:bg-gray-800 dark:hover:bg-zinc-700 inline-flex items-center justify-center">
                    <Lock className="h-6 w-6" />
                  </button>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Stake $SYK</span>
                </div>
                <button className="hidden sm:inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500">
                  <ArrowUpRight className="h-5 w-5" />
                  Buy $SYK
                </button>
                <button className="hidden sm:inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 dark:bg-zinc-800 px-4 py-3 font-medium text-white transition hover:bg-gray-800 dark:hover:bg-zinc-700">
                  <Lock className="h-5 w-5" />
                  Stake $SYK
                </button>
                <button
                  disabled={!canRedeem}
                  className="hidden sm:inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-gray-900 dark:text-white transition hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 bg-surface"
                >
                  <ShieldCheck className="h-5 w-5" />
                  Redeem Phone
                </button>
              </div>
            </div>

            {isDarkMode ? (
              <gecko-coin-price-marquee-widget
                locale="en"
                dark-mode="true"
                transparent-background="true"
                coin-ids="pump-fun,nvidia-robinhood-tokenized-stock,hyperliquid,usd-coin,global-dollar"
                initial-currency="usd"
              />
            ) : (
              <gecko-coin-price-marquee-widget
                locale="en"
                transparent-background="true"
                coin-ids="aave,polymarket,usd-coin,global-dollar,nvidia-robinhood-tokenized-stock"
                initial-currency="usd"
              />
            )}

            <div className="uniswap-card p-6">
              <h2 className="uniswap-section-title">Explore wallets</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Connect and manage</p>
              <div className="mt-6 -mx-6 overflow-x-auto no-scrollbar">
                <div className="flex gap-12 px-6">
                  {[
                    { name: "Phantom Wallet", src: "/phantom logo.jpeg" },
                    { name: "MetaMask", src: "/metamask.jpeg" },
                    { name: "AZZA", src: "/AZZA.png" },
                    { name: "Busha", src: "/Busha.png" },
                  ].map((wallet) => (
                    <button key={wallet.name} className="flex flex-col items-center gap-3 shrink-0">
                      <img
                        src={wallet.src}
                        alt={wallet.name}
                        className="h-16 w-16 rounded-full object-cover bg-gray-100 dark:bg-zinc-800 p-1"
                      />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{wallet.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="uniswap-card p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="uniswap-section-title">Transaction History</h2>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTxFilter(filter)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                        txFilter === filter
                          ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                          : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-zinc-800">
                      <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Type</th>
                      <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                      <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                      <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                    {filteredTransactions.map((tx) => {
                      const Icon = TRANSACTION_ICONS[tx.type];
                      return (
                        <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Icon className={`h-4 w-4 ${TRANSACTION_COLORS[tx.type]}`} />
                              <span className="font-medium capitalize text-gray-900 dark:text-white">{tx.type}</span>
                            </div>
                          </td>
                          <td className="py-3 text-gray-700 dark:text-gray-300">
                            {tx.amount} {tx.token}
                          </td>
                          <td className="py-3 text-gray-500 dark:text-gray-400">{tx.date}</td>
                          <td className="py-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="uniswap-card p-6">
              <h2 className="uniswap-section-title">Vault Status</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Total Phones</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition" onClick={() => setModalValue(MOCK_VAULT.totalPhones.toLocaleString())}>{formatCompact(MOCK_VAULT.totalPhones)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Utilization</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{MOCK_VAULT.utilizationPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${MOCK_VAULT.utilizationPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Last audit: {new Date(MOCK_VAULT.lastAudit).toLocaleString()}</p>
              </div>
            </div>

            <div className="uniswap-card p-6">
              <h2 className="uniswap-section-title">Quick Actions</h2>
              <div className="mt-4 space-y-3">
                <button className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500">
                  Buy $SYK
                </button>
                <button className="w-full rounded-xl bg-gray-900 dark:bg-zinc-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 dark:hover:bg-zinc-700">
                  Stake $SYK
                </button>
                <button
                  disabled={!canRedeem}
                  className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white transition hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 bg-surface"
                >
                  Redeem Phone
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {modalValue !== null && <NumberModal value={modalValue} onClose={() => setModalValue(null)} />}
    </div>
  );
}
