import { useState } from "react";
import { formatCompact } from "../utils/format";
import { Wallet, Package, Truck, CheckCircle2, Clock, Flame, History, Info, Zap, ShieldCheck } from "lucide-react";

const mockRedemptionData = {
  balance: 750000,
  target: 1000000,
  phoneModels: ["iPhone 16 Pro Max", "Samsung Galaxy S25 Ultra", "Google Pixel 9 Pro", "OnePlus 13 Pro"],
  estimatedDelivery: "2-3 weeks",
  history: [
    { id: 1, phone: "iPhone 15 Pro", status: "Delivered", date: "2025-06-20", tracking: "TRK-8839201" },
    { id: 2, phone: "Samsung Galaxy S24 Ultra", status: "Shipped", date: "2025-07-15", tracking: "TRK-9912345" },
    { id: 3, phone: "Google Pixel 8 Pro", status: "Processing", date: "2025-07-28", tracking: "TRK-1100456" },
  ],
};

const REDEMPTION_TIPS = [
  "Balance must exceed 1,000,000 $SYK before requesting redemption.",
  "Devices ship within 2-3 weeks after balance verification.",
  "Redemptions are processed sequentially during business days.",
];

export default function RedeemPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    phoneModel: "iPhone 16 Pro Max",
  });
  const [burnConfirmed, setBurnConfirmed] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const remaining = Math.max(0, mockRedemptionData.target - mockRedemptionData.balance);
  const progressPercent = Math.min(100, (mockRedemptionData.balance / mockRedemptionData.target) * 100);
  const canRedeem = mockRedemptionData.balance >= mockRedemptionData.target;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRedeem = () => {
    if (!canRedeem || !burnConfirmed) return;
    setIsRedeeming(true);
    setTimeout(() => setIsRedeeming(false), 2000);
  };

  const statusClasses = {
    Processing: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 ring-amber-200 dark:ring-amber-800",
    Shipped: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 ring-blue-200 dark:ring-blue-800",
    Delivered: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 ring-emerald-200 dark:ring-emerald-800",
  };

  const statusIcons = {
    Processing: Clock,
    Shipped: Truck,
    Delivered: CheckCircle2,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Redeem $SYK</h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Burn tokens to redeem premium flagship devices.</p>
        </header>

        <div className="overflow-x-auto no-scrollbar flex items-stretch gap-6 py-4 animate-drop-in">
          <div className="border-r border-gray-200 dark:border-gray-800 pr-6 min-w-[200px] shrink-0">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Current Balance</p>
            <p className="mt-1 text-2xl font-medium text-gray-900 dark:text-white">{formatCompact(mockRedemptionData.balance)} $SYK</p>
          </div>
          <div className="border-r border-gray-200 dark:border-gray-800 pr-6 min-w-[200px] shrink-0">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Redemption Target</p>
            <p className="mt-1 text-2xl font-medium text-gray-900 dark:text-white">{formatCompact(mockRedemptionData.target)} $SYK</p>
          </div>
          <div className="min-w-[200px] shrink-0">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Amount Needed</p>
            <p className="mt-1 text-2xl font-medium text-gray-900 dark:text-white">{formatCompact(remaining)} $SYK</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6">
            <div className="uniswap-card p-6 space-y-5 animate-drop-in">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  Redemption Form
                </h2>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  {canRedeem ? "Eligible" : "Ineligible"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="uniswap-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St"
                    className="uniswap-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="uniswap-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="United States"
                    className="uniswap-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="10001"
                    className="uniswap-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Phone Model</label>
                  <select
                    name="phoneModel"
                    value={formData.phoneModel}
                    onChange={handleChange}
                    className="uniswap-input"
                  >
                    {mockRedemptionData.phoneModels.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="burnConfirm"
                  checked={burnConfirmed}
                  onChange={(e) => setBurnConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="burnConfirm" className="text-sm cursor-pointer select-none text-gray-600 dark:text-gray-400">
                   I confirm that I want to burn {formatCompact(mockRedemptionData.target)} $SYK tokens to redeem this device. This action cannot be undone.
                </label>
              </div>

              <button
                onClick={handleRedeem}
                disabled={!canRedeem || !burnConfirmed || isRedeeming || !formData.name || !formData.address || !formData.city || !formData.country || !formData.zip || !formData.phoneModel}
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Flame className="h-5 w-5" />
                 {isRedeeming ? "Processing Redemption..." : canRedeem ? "Redeem Device" : `Need ${formatCompact(remaining)} more $SYK`}
              </button>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <History className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                Redemption History
              </h2>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-gray-400">
                      <th className="pb-3 font-medium">Device</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Tracking</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                    {mockRedemptionData.history.map((item) => {
                      const StatusIcon = statusIcons[item.status];
                      return (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-gray-400" />
                              <span className="font-medium text-gray-900 dark:text-white">{item.phone}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses[item.status]}`}>
                              <StatusIcon className="h-3.5 w-3.5" />
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 text-gray-500 dark:text-gray-400">{item.date}</td>
                          <td className="py-3 font-mono text-gray-500 dark:text-gray-400">{item.tracking}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Delivery Info
              </h2>
              <div className="rounded-2xl p-4 bg-surface">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery</span>
                  <Truck className="h-4 w-4 text-gray-400" />
                </div>
                 <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{mockRedemptionData.estimatedDelivery}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">After balance verification</p>
              </div>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                Requirements
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl p-3 bg-surface">
                  <div className="flex items-center gap-2.5">
                    <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Min Balance</span>
                  </div>
                   <span className="text-sm font-semibold text-gray-900 dark:text-white">1,000,000 $SYK</span>
                </div>
                <div className="flex items-center justify-between rounded-xl p-3 bg-surface">
                  <div className="flex items-center gap-2.5">
                    <Flame className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Burn Fee</span>
                  </div>
                   <span className="text-sm font-semibold text-gray-900 dark:text-white">100%</span>
                </div>
                <div className="flex items-center justify-between rounded-xl p-3 bg-surface">
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Processing</span>
                  </div>
                   <span className="text-sm font-semibold text-gray-900 dark:text-white">2-3 weeks</span>
                </div>
              </div>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                Tips
              </h2>
              <div className="space-y-3">
                {REDEMPTION_TIPS.map((tip) => (
                  <div key={tip} className="flex items-start gap-2.5">
                    <Zap className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{tip}</span>
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
