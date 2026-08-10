import { useState } from "react";
import { formatCompact } from "../utils/format";
import { Coins, Percent, Trophy, ArrowUpRight, ArrowDownRight, History, Flame, Lock, Zap, RefreshCw } from "lucide-react";

function UsdcIcon({ className }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#2775CA" />
      <path d="M16.5 8c-4.14 0-7.5 2.24-7.5 5s3.36 5 7.5 5c2.06 0 3.93-.74 5.22-1.96l.01-.01c.2-.19.26-.48.15-.73l-.58-1.4c-.12-.29-.46-.43-.76-.3-1.04.65-2.33 1.03-3.77 1.03-2.76 0-5-1.79-5-4s2.24-4 5-4c1.93 0 3.63.66 4.78 1.72l.03.03c.2.19.53.19.72 0l1.42-1.42c.2-.2.2-.53 0-.73C22.57 8.87 19.63 8 16.5 8zm1.1 5.1c.84 0 1.6.28 2.16.74.21.17.52.15.7-.06l1.28-1.28c.22-.22.17-.58-.1-.73-1.24-.75-2.84-1.17-4.64-1.17-3.17 0-5.75 1.79-5.75 4s2.58 4 5.75 4c1.92 0 3.59-.58 4.75-1.52.2-.16.54-.1.7.12l1.14 1.35c.18.21.13.54-.1.71-.86.65-2.03 1.02-3.37 1.02h-.6zm-6.14-3.6c0-1.1.9-2 2-2h6.28c1.1 0 2 .9 2 2s-.9 2-2 2H13.4c-1.1 0-2.04-.9-2.04-2zm12.78 6.6c0 .66-.03 1.3-.1 1.9h-6.63c-.66 0-1.28.16-1.8.45-.22.13-.3.43-.17.65.13.22.43.3.65.17.35-.2.77-.32 1.26-.32h5.75c.03.55.04 1.1.04 1.66v.27c0 .55-.04 1.1-.08 1.64h-5.83c-.66 0-1.28.16-1.8.45-.22.13-.3.43-.17.65.13.22.43.3.65.17.35-.2.77-.32 1.26-.32h6.12c.07.6.1 1.24.1 1.9v.28c0 .66-.03 1.3-.1 1.9h-6.12c-.66 0-1.28.16-1.8.45-.22.13-.3.43-.17.65.13.22.43.3.65.17.35-.2.77-.32 1.26-.32h6.53c.07.6.1 1.24.1 1.9v.28c0 .66-.03 1.3-.1 1.9h-7.05c-.03.55-.08 1.1-.16 1.63-.1.66-.26 1.3-.47 1.9-.13.36-.54.54-.9.42-.36-.13-.55-.54-.42-.9.17-.5.3-1.02.38-1.56.07-.45.1-.9.1-1.37h.7c1.1 0 2-.9 2-2s-.9-2-2-2H9.56c-.03.55-.08 1.1-.16 1.63-.1.66-.26 1.3-.47 1.9-.13.36-.54.54-.9.42-.36-.13-.55-.54-.42-.9.17-.5.3-1.02.38-1.56.07-.45.1-.9.1-1.37v-.47z" fill="#fff" />
    </svg>
  );
}

const mockStakingData = {
  totalStaked: 125000,
  currentAPR: 12.5,
  rewardsAccrued: 3842.75,
  poolTier: "Gold",
  lockPeriod: "30 days",
  boostFactors: ["x1.5 Wallet Balance", "x2.0 Early Staker", "x1.2 Referral Bonus"],
  history: [
    { id: 1, type: "stake", amount: 50000, date: "2025-07-15", txHash: "0xabc...123" },
    { id: 2, type: "unstake", amount: 10000, date: "2025-07-20", txHash: "0xdef...456" },
    { id: 3, type: "claim", amount: 1523.40, date: "2025-07-25", txHash: "0xghi...789" },
    { id: 4, type: "stake", amount: 85000, date: "2025-08-01", txHash: "0xjkl...012" },
  ],
};

const LOCK_PERIODS = ["30 days", "60 days", "90 days", "180 days"];

export default function StakePage() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedLock, setSelectedLock] = useState("30 days");
  const [isStaking, setIsStaking] = useState(false);

  const handleStake = () => {
    if (!stakeAmount || Number(stakeAmount) <= 0) return;
    setIsStaking(true);
    setTimeout(() => setIsStaking(false), 1500);
    setStakeAmount("");
  };

  const handleUnstake = () => {
    setIsStaking(true);
    setTimeout(() => setIsStaking(false), 1500);
  };

  const handleClaim = () => {
    setIsStaking(true);
    setTimeout(() => setIsStaking(false), 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-4">
        <header>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Stake $SYK</h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Earn high-yield rewards by staking $SYK in physical device-backed vaults.</p>
        </header>

        <div className="overflow-x-auto no-scrollbar flex items-stretch gap-6 py-4">
          <div className="border-r border-gray-200 dark:border-gray-800 pr-6 min-w-[200px] shrink-0">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Staked</p>
            <p className="mt-1 text-2xl font-medium text-gray-900 dark:text-white">{formatCompact(mockStakingData.totalStaked)} $SYK</p>
          </div>

          <div className="border-r border-gray-200 dark:border-gray-800 pr-6 min-w-[200px] shrink-0">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Current APR</p>
            <p className="mt-1 text-2xl font-medium text-emerald-600 dark:text-emerald-400">{mockStakingData.currentAPR}%</p>
          </div>

          <div className="min-w-[200px] shrink-0">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Rewards Accrued</p>
            <p className="mt-1 text-2xl font-medium text-gray-900 dark:text-white">{formatCompact(mockStakingData.rewardsAccrued)} $SYK</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-4">
            <div className="uniswap-card">
              <div className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <img src="/usdc.png" alt="USDC" className="h-5 w-5 rounded-full object-cover" />
                    Swap & Stake Vault
                  </h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    12.5% APR Active
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-surface">
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-500 dark:text-gray-400">Stake Amount</span>
                    <span className="text-gray-400">Available: 847.5k $SYK</span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0.00"
                       className="w-full bg-transparent text-2xl font-semibold text-gray-900 dark:text-white outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
                    />
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#27272a] px-3 py-1.5 rounded-lg shrink-0">
                      <img src="/Logo.jpeg" alt="" className="h-6 w-6 rounded-full object-cover border border-gray-200" />
                       <span className="text-sm font-semibold text-gray-900 dark:text-white">$SYK</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Lock Duration</label>
                <div className="flex gap-2">
                  {LOCK_PERIODS.map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedLock(period)}
                      className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
                        selectedLock === period
                          ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                          : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 pb-4 space-y-3">
                <button
                  onClick={handleStake}
                  disabled={isStaking || !stakeAmount || Number(stakeAmount) <= 0}
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isStaking ? "Processing..." : "Stake $SYK"}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleUnstake}
                    disabled={isStaking}
                    className="w-full rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 py-3 text-sm font-semibold text-gray-900 dark:text-white transition"
                  >
                    Unstake
                  </button>
                  <button
                    onClick={handleClaim}
                    disabled={isStaking || mockStakingData.rewardsAccrued <= 0}
                    className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 text-sm font-semibold text-white transition disabled:opacity-40"
                  >
                    Claim Rewards
                  </button>
                </div>
              </div>
            </div>

            <div className="uniswap-card">
              <div className="p-4 pb-2">
                <h2 className="uniswap-section-title mb-3 flex items-center gap-2">
                  <History className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  Staking History
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
                        <th className="pb-3 font-medium">Tx Hash</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                      {mockStakingData.history.map((item) => {
                        const colorMap = { stake: "text-blue-600 dark:text-blue-400", unstake: "text-rose-600 dark:text-rose-400", claim: "text-emerald-600 dark:text-emerald-400" };
                        const Icon = item.type === "stake" ? ArrowUpRight : item.type === "unstake" ? ArrowDownRight : RefreshCw;
                        return (
                          <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                            <td className="py-3">
                              <span className={`inline-flex items-center gap-1.5 font-medium ${colorMap[item.type]}`}>
                                <Icon className="h-4 w-4" />
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </span>
                            </td>
                             <td className="py-3 font-medium text-gray-900 dark:text-white">{formatCompact(item.amount)} $SYK</td>
                            <td className="py-3 text-gray-500 dark:text-gray-400">{item.date}</td>
                            <td className="py-3 font-mono text-gray-500 dark:text-gray-400">{item.txHash}</td>
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
                  <Flame className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  Pool Details & Multipliers
                </h2>
              </div>
              <div className="px-4 pb-4 space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface">
                  <div className="flex items-center gap-2.5">
                    <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Pool Tier</span>
                  </div>
                   <span className="text-sm font-semibold text-gray-900 dark:text-white">{mockStakingData.poolTier}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface">
                  <div className="flex items-center gap-2.5">
                    <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Selected Lock</span>
                  </div>
                   <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedLock}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface">
                  <div className="flex items-center gap-2.5">
                    <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Max Boost</span>
                  </div>
                   <span className="text-sm font-semibold text-gray-900 dark:text-white">Up to x2.0</span>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2">
                <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wide mb-2">Active Multipliers</span>
                <div className="flex flex-wrap gap-2">
                  {mockStakingData.boostFactors.map((factor) => (
                    <span key={factor} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                      <Zap size={12} />
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="uniswap-card">
              <div className="p-4 pb-2">
                <h2 className="uniswap-section-title mb-3">Yield Distribution</h2>
              </div>
              <div className="px-4 pb-4 space-y-2">
                {[
                  { label: "Community Stakers", value: "70%", color: "bg-blue-600" },
                  { label: "Liquidity Reserve", value: "20%", color: "bg-emerald-600" },
                  { label: "Vault Operations", value: "10%", color: "bg-purple-600" },
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
  );
}
