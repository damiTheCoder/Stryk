import { useState } from "react";
import { formatCompact } from "../utils/format";
import { Wallet, Package, Truck, CheckCircle2, Clock, Flame, History, Info, Zap, ShieldCheck, Smartphone, ArrowRight } from "lucide-react";

const mockUpgradeData = {
  usdcBalance: 847.5,
  targetDevice: "iPhone 16 Pro Max",
  targetPrice: 1199.0,
  tradeInOptions: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17"],
  estimatedDelivery: "3-5 business days",
  history: [
    { id: 1, device: "iPhone 15 Pro Max", status: "Delivered", date: "2025-06-20", tracking: "TRK-8839201", payout: 920 },
    { id: 2, device: "iPhone 16 Pro", status: "Shipped", date: "2025-07-15", tracking: "TRK-9912345", payout: 1050 },
    { id: 3, device: "iPhone 17 Pro", status: "Processing", date: "2025-07-28", tracking: "TRK-1100456", payout: 1150 },
    { id: 4, device: "iPhone 14 Pro Max", status: "Delivered", date: "2025-06-10", tracking: "TRK-7723456", payout: 650 },
  ],
};

const UPGRADE_TIPS = [
  "Trade in your device first for an instant USDC payout.",
  "Combine your trade-in value with savings for a discount on your upgrade.",
  "Devices ship within 3-5 business days after payment verification.",
  "No hidden fees. No lowball offers. Just fair, market-driven prices.",
];

export default function RedeemPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    tradeInDevice: "iPhone 15 Pro",
    targetDevice: "iPhone 16 Pro Max",
  });
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpgrade = () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setIsUpgrading(true);
    setTimeout(() => setIsUpgrading(false), 2000);
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

  const steps = [
    { num: 1, label: "Select Device", icon: Smartphone },
    { num: 2, label: "Trade In", icon: ArrowRight },
    { num: 3, label: "Confirm", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Upgrade Your Device</h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Trade in your old device and upgrade to the latest model.</p>
        </header>

        <div className="flex items-center gap-4 py-4 animate-drop-in">
          {steps.map((s, idx) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-semibold ${step >= s.num ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-500"}`}>
                {step > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
              </div>
              <span className={`text-sm font-medium ${step >= s.num ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>{s.label}</span>
              {idx < steps.length - 1 && <div className="w-8 h-px bg-gray-200 dark:bg-zinc-800 mx-2" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6">
            <div className="uniswap-card p-6 space-y-5 animate-drop-in">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  Upgrade Form
                </h2>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  Step {step} of 3
                </span>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Select Device to Trade In</label>
                    <select
                      name="tradeInDevice"
                      value={formData.tradeInDevice}
                      onChange={handleChange}
                      className="uniswap-input"
                    >
                      {mockUpgradeData.tradeInOptions.map((model) => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Select Upgrade Device</label>
                    <select
                      name="targetDevice"
                      value={formData.targetDevice}
                      onChange={handleChange}
                      className="uniswap-input"
                    >
                      <option value="iPhone 17 Pro Max">iPhone 17 Pro Max — $1,199</option>
                      <option value="iPhone 17 Pro">iPhone 17 Pro — $1,099</option>
                      <option value="iPhone 17">iPhone 17 — $899</option>
                      <option value="iPhone 16 Pro Max">iPhone 16 Pro Max — $1,099</option>
                      <option value="iPhone 16 Pro">iPhone 16 Pro — $999</option>
                      <option value="iPhone 16">iPhone 16 — $799</option>
                      <option value="iPhone 15 Pro Max">iPhone 15 Pro Max — $999</option>
                      <option value="iPhone 15 Pro">iPhone 15 Pro — $899</option>
                      <option value="iPhone 15">iPhone 15 — $699</option>
                      <option value="iPhone 14 Pro Max">iPhone 14 Pro Max — $899</option>
                      <option value="iPhone 14 Pro">iPhone 14 Pro — $799</option>
                      <option value="iPhone 14">iPhone 14 — $599</option>
                    </select>
                  </div>
                  <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300">Estimated trade-in value: <span className="font-semibold">$620 USDC</span></p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Final price confirmed after device inspection</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
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
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 p-4">
                    <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-2">Order Summary</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Trade-In Device</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formData.tradeInDevice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Trade-In Value</span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">+$620 USDC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Upgrade Device</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formData.targetDevice}</span>
                      </div>
                      <div className="flex justify-between border-t border-emerald-200 dark:border-emerald-800 pt-2 mt-2">
                        <span className="font-semibold text-gray-900 dark:text-white">Balance Due</span>
                        <span className="font-semibold text-gray-900 dark:text-white">$579 USDC</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">By confirming, you agree to send in your device within 14 days. Payout issued after QC verification.</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 py-3 text-sm font-semibold text-gray-900 dark:text-white transition"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleUpgrade}
                  disabled={isUpgrading}
                  className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isUpgrading ? "Processing..." : step === 3 ? "Confirm Upgrade" : "Continue"}
                </button>
              </div>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <History className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                Upgrade History
              </h2>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-gray-400">
                      <th className="pb-3 font-medium">Device</th>
                      <th className="pb-3 font-medium">Payout</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Tracking</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                    {mockUpgradeData.history.map((item) => {
                      const StatusIcon = statusIcons[item.status];
                      return (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-gray-400" />
                              <span className="font-medium text-gray-900 dark:text-white">{item.device}</span>
                            </div>
                          </td>
                          <td className="py-3 text-emerald-600 dark:text-emerald-400 font-medium">+${item.payout.toLocaleString()}</td>
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
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{mockUpgradeData.estimatedDelivery}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">After payment verification</p>
              </div>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                How It Works
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0">1</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Select your old device and get an instant quote</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0">2</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Ship your device to us (free prepaid label)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0">3</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Receive USDC payout within 24-48 hours</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0">4</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Your new device ships to your door</span>
                </div>
              </div>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                Tips
              </h2>
              <div className="space-y-3">
                {UPGRADE_TIPS.map((tip) => (
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
