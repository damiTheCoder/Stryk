import { useState, useEffect } from "react";
import { formatCompact } from "../utils/format";
import NumberModal from "../components/NumberModal";
import {
  ArrowUpRight,
  ArrowDownRight,
  Repeat,
  ShieldCheck,
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

  useEffect(() => {
    const checkDark = () => setIsDarkMode(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

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
              className="h-9 w-9 rounded-full object-cover rotate-12 bg-gray-100 dark:bg-zinc-800 p-1"
            />
          </div>
          <p className="mt-2 hidden sm:block text-gray-500 dark:text-gray-400">Overview of your $SYK portfolio and vault status.</p>
        </header>

        <div className="dashboard-metrics-desktop flex flex-nowrap items-stretch gap-3 md:gap-6 overflow-x-auto no-scrollbar animate-drop-in" style={{ "--i": 0 }}>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <section className="lg:col-span-2 space-y-4">
            <div className="uniswap-card p-6 animate-drop-in" style={{ "--i": 1 }}>
              <h2 className="uniswap-section-title">Quick Actions</h2>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                <button className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-3xl sm:rounded-full bg-blue-600/90 dark:bg-blue-600 px-4 py-3 text-base sm:text-base font-medium text-white transition hover:bg-blue-500">
                  <span className="rounded-full bg-blue-500/20 p-1 sm:p-1.5"><ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" /></span>
                  <span className="hidden sm:inline">Buy $SYK</span>
                  <span className="sm:hidden">Buy</span>
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-3xl sm:rounded-full bg-gray-900/90 dark:bg-zinc-700/90 px-4 py-3 text-base sm:text-base font-medium text-white transition hover:bg-gray-800 dark:hover:bg-zinc-700">
                  <span className="rounded-full bg-white/10 p-1 sm:p-1.5"><Lock className="h-4 w-4 sm:h-5 sm:w-5" /></span>
                  <span className="hidden sm:inline">Stake $SYK</span>
                  <span className="sm:hidden">Stake</span>
                </button>
                <button
                  disabled={!canRedeem}
                  className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-3xl sm:rounded-full bg-gray-100/90 dark:bg-zinc-800/90 px-4 py-3 text-base sm:text-base font-semibold text-gray-900 dark:text-white transition hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="rounded-full bg-gray-200 dark:bg-zinc-600 p-1 sm:p-1.5"><ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" /></span>
                  <span className="hidden sm:inline">Redeem Phone</span>
                  <span className="sm:hidden">Redeem</span>
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

            <div className="uniswap-card p-6 animate-drop-in" style={{ "--i": 2 }}>
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

            <div className="uniswap-card p-6 animate-drop-in" style={{ "--i": 3 }}>
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
            <div className="uniswap-card p-6 animate-drop-in" style={{ "--i": 4 }}>
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

            <div className="uniswap-card p-6 animate-drop-in" style={{ "--i": 5 }}>
              <h2 className="uniswap-section-title">Quick Actions</h2>
              <div className="mt-4 space-y-3">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-blue-600/90 dark:bg-blue-600 px-4 py-3 text-base font-medium text-white transition hover:bg-blue-500 w-full">
                  <span className="rounded-full bg-blue-500/20 p-1"><ArrowUpRight className="h-4 w-4" /></span>
                  Buy $SYK
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gray-900/90 dark:bg-zinc-700/90 px-4 py-3 text-base font-medium text-white transition hover:bg-gray-800 dark:hover:bg-zinc-700 w-full">
                  <span className="rounded-full bg-white/10 p-1"><Lock className="h-4 w-4" /></span>
                  Stake $SYK
                </button>
                <button
                  disabled={!canRedeem}
                  className="inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gray-100/90 dark:bg-zinc-800/90 px-4 py-3 text-base font-semibold text-gray-900 dark:text-white transition hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 w-full"
                >
                  <span className="rounded-full bg-gray-200 dark:bg-zinc-600 p-1"><ShieldCheck className="h-4 w-4" /></span>
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
