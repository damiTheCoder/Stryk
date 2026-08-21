import { useState } from "react";
import {
  Coins,
  Percent,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  History,
  Flame,
  Lock,
  Zap,
  RefreshCw,
  TrendingUp,
  Target,
  Wallet,
} from "lucide-react";

const mockSavingsData = {
  savingsPool: 125.0,
  targetDevice: "iPhone 16 Pro Max",
  targetPrice: 1199.0,
  boostBonus: 12.5,
  upgradeCredit: 3.8,
  depositHistory: [
    { id: 1, type: "deposit", amount: 50, date: "2025-07-15" },
    { id: 2, type: "deposit", amount: 75, date: "2025-07-20" },
    { id: 3, type: "bonus", amount: 3.8, date: "2025-07-25" },
    { id: 4, type: "deposit", amount: 100, date: "2025-08-01" },
  ],
  autoDeposit: true,
  autoDepositAmount: 25,
};

const LOCK_PERIODS = ["Flexible", "30 days", "60 days", "90 days"];

export default function StakePage() {
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Flexible");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeposit = () => {
    if (!depositAmount || Number(depositAmount) <= 0) return;
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1500);
    setDepositAmount("");
  };

  const handleWithdraw = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1500);
  };

  const handleApplyToUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1500);
  };

  const savingsProgress = Math.min((mockSavingsData.savingsPool / mockSavingsData.targetPrice) * 100, 100);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="mx-auto max-w-7xl w-full px-3 pt-0 pb-6 lg:px-6 lg:pt-6 lg:pb-6 space-y-1 md:space-y-4">
        <div className="px-3 pt-3 pb-6 lg:p-6">
          <header>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Upgrade Savings Plan</h1>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Save in USDC, earn boost bonuses, and upgrade when you're ready.</p>
          </header>
        </div>

        <div className="px-3 lg:px-6">
          <div className="overflow-x-auto no-scrollbar flex items-stretch gap-6 py-4">
            <div className="border-r border-gray-200 dark:border-gray-800 pr-6 min-w-[200px] shrink-0">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Savings Pool</p>
              <p className="mt-1 text-2xl font-medium text-gray-900 dark:text-white">${mockSavingsData.savingsPool.toLocaleString()} USDC</p>
            </div>

            <div className="border-r border-gray-200 dark:border-gray-800 pr-6 min-w-[200px] shrink-0">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Boost Bonus</p>
              <p className="mt-1 text-2xl font-medium text-emerald-600 dark:text-emerald-400">+{mockSavingsData.boostBonus}%</p>
            </div>

            <div className="min-w-[200px] shrink-0">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Upgrade Credit</p>
              <p className="mt-1 text-2xl font-medium text-gray-900 dark:text-white">${mockSavingsData.upgradeCredit.toLocaleString()} USDC</p>
            </div>
          </div>
        </div>

        <div className="px-3 lg:px-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <section className="lg:col-span-2 space-y-4">
            <div className="uniswap-card">
              <div className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    Deposit to Upgrade Fund
                  </h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    +12.5% Boost Active
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-surface">
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-500 dark:text-gray-400">Amount to Save</span>
                    <span className="text-gray-400">Available: $847.50 USDC</span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-transparent text-2xl font-semibold text-gray-900 dark:text-white outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Deposit Frequency</label>
                <div className="flex gap-2">
                  {LOCK_PERIODS.map((plan) => (
                    <button
                      key={plan}
                      onClick={() => setSelectedPlan(plan)}
                      className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
                        selectedPlan === plan
                          ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                          : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {plan}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 pb-4 space-y-3">
                <button
                  onClick={handleDeposit}
                  disabled={isProcessing || !depositAmount || Number(depositAmount) <= 0}
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isProcessing ? "Processing..." : "Save USDC"}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleWithdraw}
                    disabled={isProcessing}
                    className="w-full rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 py-3 text-sm font-semibold text-gray-900 dark:text-white transition"
                  >
                    Withdraw Savings
                  </button>
                  <button
                    onClick={handleApplyToUpgrade}
                    disabled={isProcessing || mockSavingsData.savingsPool <= 0}
                    className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 text-sm font-semibold text-white transition disabled:opacity-40"
                  >
                    Apply to Upgrade
                  </button>
                </div>
              </div>
            </div>

            <div className="uniswap-card">
              <div className="p-4 pb-2">
                <h2 className="uniswap-section-title mb-3 flex items-center gap-2">
                  <History className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  Deposit History
                </h2>
              </div>
              <div className="px-4 pb-4">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-gray-400">
                        <th className="pb-3 font-medium">Type</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                      {mockSavingsData.depositHistory.map((item) => {
                        const colorMap = { deposit: "text-blue-600 dark:text-blue-400", bonus: "text-emerald-600 dark:text-emerald-400" };
                        const Icon = item.type === "deposit" ? ArrowDownRight : RefreshCw;
                        return (
                          <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                            <td className="py-3">
                              <span className={`inline-flex items-center gap-1.5 font-medium ${colorMap[item.type]}`}>
                                <Icon className="h-4 w-4" />
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 font-medium text-gray-900 dark:text-white">${item.amount.toLocaleString()} USDC</td>
                            <td className="py-3 text-gray-500 dark:text-gray-400">{item.date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="uniswap-card">
              <div className="p-4 pb-2">
                <h2 className="uniswap-section-title mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-violet-600" />
                  Savings Goal
                </h2>
              </div>
              <div className="px-4 pb-4 space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface">
                  <div className="flex items-center gap-2.5">
                    <Wallet className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Target Device</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{mockSavingsData.targetDevice}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface">
                  <div className="flex items-center gap-2.5">
                    <Coins className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Target Price</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">${mockSavingsData.targetPrice.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface">
                  <div className="flex items-center gap-2.5">
                    <Percent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{savingsProgress.toFixed(1)}%</span>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2">
                <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wide mb-2">Active Bonuses</span>
                <div className="flex flex-wrap gap-2">
                  {["x1.5 Device Trade-In", "x2.0 First Upgrade", "x1.2 Referral"].map((bonus) => (
                    <span key={bonus} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                      <Zap size={12} />
                      {bonus}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="uniswap-card">
              <div className="p-4 pb-2">
                <h2 className="uniswap-section-title mb-3">Reward Distribution</h2>
              </div>
              <div className="px-4 pb-4 space-y-2">
                {[
                  { label: "Upgrade Bonuses", value: "70%", color: "bg-blue-600" },
                  { label: "Savings Pool Reserve", value: "20%", color: "bg-emerald-600" },
                  { label: "Platform Operations", value: "10%", color: "bg-purple-600" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                      <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </div>
  );
}
