import { useState } from "react";
import { formatCompact } from "../utils/format";
import NumberModal from "../components/NumberModal";
import {
  ArrowUpRight,
  ArrowDownRight,
  Repeat,
  ShieldCheck,
} from "lucide-react";

const MOCK_PORTFOLIO = {
  balance: 847500,
  usdValue: 211.87,
  redemptionThreshold: 1000000,
  stakingRewards: 12450,
};

const MOCK_TRANSACTIONS = [
  { id: "1", type: "buy", amount: "50,000", token: "$SYK", date: "2026-08-03", status: "Completed" },
  { id: "2", type: "stake", amount: "120,000", token: "$SYK", date: "2026-08-02", status: "Completed" },
  { id: "3", type: "sell", amount: "25,000", token: "$SYK", date: "2026-08-01", status: "Completed" },
  { id: "4", type: "stake", amount: "80,000", token: "$SYK", date: "2026-07-31", status: "Completed" },
  { id: "5", type: "buy", amount: "200,000", token: "$SYK", date: "2026-07-30", status: "Completed" },
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

  const filteredTransactions = txFilter === "All"
    ? MOCK_TRANSACTIONS
    : MOCK_TRANSACTIONS.filter((tx) => tx.type === txFilter.toLowerCase());

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1C1C1C] transition-colors">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Overview of your $SYK portfolio and vault status.</p>
        </header>

          {/* Horizontally scrollable metrics strip with NO background and gray right separating lines */}
          <div className="overflow-x-auto no-scrollbar flex items-stretch gap-8 py-6 border-b border-gray-200 dark:border-gray-800">
            {/* Item 1 */}
            <div className="border-r border-gray-200 dark:border-gray-800 pr-8 min-w-[220px] shrink-0 flex flex-col justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">$SYK Balance</p>
            <p 
              className="mt-2 text-3xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition" 
              onClick={() => setModalValue(MOCK_PORTFOLIO.balance.toLocaleString())}
            >
              {formatCompact(MOCK_PORTFOLIO.balance)}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{formatCurrency(MOCK_PORTFOLIO.usdValue)}</p>
          </div>

          {/* Item 2 */}
          <div className="border-r border-gray-200 dark:border-gray-800 pr-8 min-w-[220px] shrink-0 flex flex-col justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Redemption Progress</p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{progress.toFixed(1)}%</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {formatCompact(MOCK_PORTFOLIO.redemptionThreshold - MOCK_PORTFOLIO.balance)} more to redeem
            </p>
          </div>

          {/* Item 3 */}
          <div className="min-w-[220px] shrink-0 flex flex-col justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Staking Rewards Accrued</p>
            <p 
              className="mt-2 text-3xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition" 
              onClick={() => setModalValue(MOCK_PORTFOLIO.stakingRewards.toLocaleString() + " $SYK")}
            >
              {formatCompact(MOCK_PORTFOLIO.stakingRewards)} $SYK
            </p>
            <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium">+12.4% this month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6">
            <div className="uniswap-card p-6">
              <h2 className="uniswap-section-title">Quick Actions</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500">
                  <ArrowUpRight className="h-5 w-5" />
                  Buy $SYK
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 dark:bg-zinc-800 px-4 py-3 font-semibold text-white transition hover:bg-gray-800 dark:hover:bg-zinc-700">
                  <Repeat className="h-5 w-5" />
                  Stake $SYK
                </button>
                <button
                  disabled={!canRedeem}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-gray-900 dark:text-white transition hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ background: "#F3F4F6" }}
                >
                  <ShieldCheck className="h-5 w-5" />
                  Redeem Phone
                </button>
              </div>
              {!canRedeem && (
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  You need {formatCompact(MOCK_PORTFOLIO.redemptionThreshold - MOCK_PORTFOLIO.balance)} more $SYK to redeem a phone.
                </p>
              )}
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

              <div className="mt-4 overflow-x-auto">
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

          <aside className="space-y-6">
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
                    className="h-2 rounded-full bg-orange-400 transition-all"
                    style={{ width: `${MOCK_VAULT.utilizationPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Latest Audit</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(MOCK_VAULT.lastAudit).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="uniswap-card p-6">
              <h2 className="uniswap-section-title">Activity</h2>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Stake", value: "12", color: "bg-blue-600" },
                  { label: "Buy", value: "8", color: "bg-emerald-600" },
                  { label: "Sell", value: "3", color: "bg-rose-600" },
                  { label: "Redeem", value: "1", color: "bg-violet-600" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${item.color}`} />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      {modalValue !== null && <NumberModal value={modalValue} onClose={() => setModalValue(null)} />}
    </div>
  );
}
