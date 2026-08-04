import { useState } from "react";
import { Coins, Percent, Trophy, Wallet, ArrowUpRight, ArrowDownRight, History, Flame, Lock, Zap, RefreshCw } from "lucide-react";

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

export default function StakePage() {
  const [stakeAmount, setStakeAmount] = useState("");
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
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl p-4 md:p-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Stake $STRYK</h1>
          <p className="mt-2 text-gray-500">Earn rewards by staking your tokens</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Coins className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Staked</p>
              <p className="text-xl font-bold text-gray-900">{mockStakingData.totalStaked.toLocaleString()} $STRYK</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Percent className="text-emerald-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current APR</p>
              <p className="text-xl font-bold text-gray-900">{mockStakingData.currentAPR}%</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-xl">
              <Trophy className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rewards Accrued</p>
              <p className="text-xl font-bold text-gray-900">{mockStakingData.rewardsAccrued.toLocaleString()} $STRYK</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-600" />
            Staking Actions
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-2">Amount ($STRYK)</label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
              <button
                onClick={handleStake}
                disabled={isStaking || !stakeAmount || Number(stakeAmount) <= 0}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium px-6 py-3 rounded-xl transition-colors"
              >
                <ArrowUpRight className="h-5 w-5" />
                {isStaking ? "Processing..." : "Stake"}
              </button>
              <button
                onClick={handleUnstake}
                disabled={isStaking}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 font-medium px-6 py-3 rounded-xl transition-colors"
              >
                <ArrowDownRight className="h-5 w-5" />
                {isStaking ? "Processing..." : "Unstake"}
              </button>
              <button
                onClick={handleClaim}
                disabled={isStaking || mockStakingData.rewardsAccrued <= 0}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium px-6 py-3 rounded-xl transition-colors"
              >
                <Trophy className="h-5 w-5" />
                {isStaking ? "Processing..." : "Claim Rewards"}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-amber-600" />
            Pool Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Trophy className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Pool Tier</p>
                <p className="text-gray-900 font-medium">{mockStakingData.poolTier}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Lock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Lock Period</p>
                <p className="text-gray-900 font-medium">{mockStakingData.lockPeriod}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Zap className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Boost Factors</p>
                <p className="text-gray-900 font-medium">Up to x2.0</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {mockStakingData.boostFactors.map((factor) => (
              <span key={factor} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm px-3 py-1.5 rounded-lg ring-1 ring-emerald-200">
                <Zap className="h-4 w-4" />
                {factor}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <History className="h-5 w-5 text-gray-900" />
            Staking History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-sm font-medium text-gray-500">Type</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Amount</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Date</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Tx Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockStakingData.history.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${item.type === "stake" ? "text-blue-600" : item.type === "unstake" ? "text-rose-600" : "text-emerald-600"}`}>
                        {item.type === "stake" ? <ArrowUpRight className="h-4 w-4" /> : item.type === "unstake" ? <ArrowDownRight className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 text-gray-900 font-medium">{item.amount.toLocaleString()} $STRYK</td>
                    <td className="py-3 text-gray-500">{item.date}</td>
                    <td className="py-3 text-gray-500 font-mono text-sm">{item.txHash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
