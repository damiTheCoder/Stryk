import { useState } from "react";
import { formatCompact } from "../utils/format";
import NumberModal from "../components/NumberModal";
import {
  ArrowUpRight,
  ArrowDownRight,
  Repeat,
  ShieldCheck,
  ChevronDown,
  Activity,
  History,
} from "lucide-react";

const MOCK_PORTFOLIO = {
  balance: 847_500,
  usdValue: 211.87,
  redemptionThreshold: 1_000_000,
  stakingRewards: 12450,
};

const MOCK_TRANSACTIONS = [
  { id: "1", type: "buy", amount: "50,000", token: "$STRYK", date: "2026-08-03", status: "Completed" },
  { id: "2", type: "stake", amount: "120,000", token: "$STRYK", date: "2026-08-02", status: "Completed" },
  { id: "3", type: "sell", amount: "25,000", token: "$STRYK", date: "2026-08-01", status: "Completed" },
  { id: "4", type: "stake", amount: "80,000", token: "$STRYK", date: "2026-07-31", status: "Completed" },
  { id: "5", type: "buy", amount: "200,000", token: "$STRYK", date: "2026-07-30", status: "Completed" },
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
  buy: "text-emerald-600",
  sell: "text-rose-600",
  stake: "text-blue-600",
  redeem: "text-violet-600",
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
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-500">Overview of your $STRYK portfolio and vault status.</p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm font-medium text-gray-500">$STRYK Balance</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition" onClick={() => setModalValue(MOCK_PORTFOLIO.balance.toLocaleString())}>{formatCompact(MOCK_PORTFOLIO.balance)}</p>
                <p className="mt-1 text-sm text-gray-500">{formatCurrency(MOCK_PORTFOLIO.usdValue)}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm font-medium text-gray-500">Redemption Progress</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{progress.toFixed(1)}%</p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-gray-200">
                  <div
                    className="h-1.5 rounded-full bg-blue-600 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {formatCompact(MOCK_PORTFOLIO.redemptionThreshold - MOCK_PORTFOLIO.balance)} more to redeem
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5 sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">Staking Rewards Accrued</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition" onClick={() => setModalValue(MOCK_PORTFOLIO.stakingRewards.toLocaleString() + " $STRYK")}>
                  {formatCompact(MOCK_PORTFOLIO.stakingRewards)} $STRYK
                </p>
                <p className="mt-1 text-sm text-emerald-600 font-medium">+12.4% this month</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500">
                  <ArrowUpRight className="h-5 w-5" />
                  Buy $STRYK
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-800">
                  <Repeat className="h-5 w-5" />
                  Stake $STRYK
                </button>
                <button
                  disabled={!canRedeem}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-gray-900 ring-1 ring-gray-300 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ShieldCheck className="h-5 w-5" />
                  Redeem Phone
                </button>
              </div>
              {!canRedeem && (
                <p className="mt-3 text-sm text-gray-500">
                  You need {formatCompact(MOCK_PORTFOLIO.redemptionThreshold - MOCK_PORTFOLIO.balance)} more $STRYK to redeem a phone.
                </p>
              )}
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTxFilter(filter)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                        txFilter === filter
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 font-medium text-gray-500">Type</th>
                      <th className="pb-3 font-medium text-gray-500">Amount</th>
                      <th className="pb-3 font-medium text-gray-500">Date</th>
                      <th className="pb-3 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredTransactions.map((tx) => {
                      const Icon = TRANSACTION_ICONS[tx.type];
                      return (
                        <tr key={tx.id} className="hover:bg-gray-50">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Icon className={`h-4 w-4 ${TRANSACTION_COLORS[tx.type]}`} />
                              <span className="font-medium capitalize text-gray-900">{tx.type}</span>
                            </div>
                          </td>
                          <td className="py-3 text-gray-700">
                            {tx.amount} {tx.token}
                          </td>
                          <td className="py-3 text-gray-500">{tx.date}</td>
                          <td className="py-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
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
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Vault Status</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Phones</span>
                  <span className="text-sm font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition" onClick={() => setModalValue(MOCK_VAULT.totalPhones.toLocaleString())}>{formatCompact(MOCK_VAULT.totalPhones)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Utilization</span>
                  <span className="text-sm font-semibold text-gray-900">{MOCK_VAULT.utilizationPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-orange-400 transition-all"
                    style={{ width: `${MOCK_VAULT.utilizationPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Latest Audit</span>
                  <span className="text-sm text-medium text-gray-900">
                    {new Date(MOCK_VAULT.lastAudit).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Activity</h2>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Stake", value: "12", color: "bg-blue-600" },
                  { label: "Buy", value: "8", color: "bg-emerald-600" },
                  { label: "Sell", value: "3", color: "bg-rose-600" },
                  { label: "Redeem", value: "1", color: "bg-violet-600" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${item.color}`} />
                      <span className="text-sm font-semibold text-gray-900">{item.value}</span>
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
