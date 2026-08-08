import { useState } from "react";
import { Wallet, Package, Truck, CheckCircle2, Clock, Flame } from "lucide-react";

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

  const statusStyles = {
    Processing: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 ring-amber-200 dark:ring-amber-800",
    Shipped: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 ring-blue-200 dark:ring-blue-800",
    Delivered: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 ring-emerald-200 dark:ring-emerald-800",
  };

  const statusIcons = {
    Processing: <Clock size={14} />,
    Shipped: <Truck size={14} />,
    Delivered: <CheckCircle2 size={14} />,
  };

  return (
    <div className="uniswap-page">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-10">
        <div className="uniswap-page-header">
          <h1>Redeem $STRYK</h1>
          <p>Burn tokens to redeem premium flagship devices.</p>
        </div>

        <section className="uniswap-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Wallet className="h-5 w-5" style={{ color: "#2563EB" }} />
            <h2 className="uniswap-section-title">Redemption Eligibility</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-2xl p-4" style={{ background: "#F3F4F6" }}>
              <p className="text-sm font-medium" style={{ color: "#6B7280" }}>Current Balance</p>
              <p className="uniswap-stat-value mt-1">{mockRedemptionData.balance.toLocaleString()} $STRYK</p>
            </div>
            <div className="rounded-2xl p-4" style={{ background: "#F3F4F6" }}>
              <p className="text-sm font-medium" style={{ color: "#6B7280" }}>Redemption Target</p>
              <p className="uniswap-stat-value mt-1">{mockRedemptionData.target.toLocaleString()} $STRYK</p>
            </div>
            <div className="rounded-2xl p-4" style={{ background: "#F3F4F6" }}>
              <p className="text-sm font-medium" style={{ color: "#6B7280" }}>Amount Needed</p>
              <p className="uniswap-stat-value mt-1">{remaining.toLocaleString()} $STRYK</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="uniswap-stat-label">Progress to redemption</span>
              <span className="font-medium" style={{ color: "#111827" }}>{progressPercent.toFixed(1)}%</span>
            </div>
            <div className="uniswap-progress-track">
              <div className="uniswap-progress-fill-gradient" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </section>

        <section className="uniswap-card p-6 mt-6">
          <div className="flex items-center gap-2 mb-5">
            <Package className="h-5 w-5" style={{ color: "#059669" }} />
            <h2 className="uniswap-section-title">Redemption Form</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="uniswap-label">Full Name</label>
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
              <label className="uniswap-label">Address</label>
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
              <label className="uniswap-label">City</label>
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
              <label className="uniswap-label">Country</label>
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
              <label className="uniswap-label">Zip Code</label>
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
              <label className="uniswap-label">Phone Model</label>
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
          <div className="flex items-center gap-2 mb-5 p-4 rounded-2xl" style={{ background: "#EFF6FF" }}>
            <Truck className="h-5 w-5" style={{ color: "#2563EB" }} />
            <span className="text-sm" style={{ color: "#1E40AF" }}>Estimated delivery: <strong>{mockRedemptionData.estimatedDelivery}</strong></span>
          </div>
          <div className="flex items-start gap-3 mb-6">
            <input
              type="checkbox"
              id="burnConfirm"
              checked={burnConfirmed}
              onChange={(e) => setBurnConfirmed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="burnConfirm" className="text-sm cursor-pointer select-none" style={{ color: "#4B5563" }}>
              I confirm that I want to burn {mockRedemptionData.target.toLocaleString()} $STRYK tokens to redeem this device. This action cannot be undone.
            </label>
          </div>
          <button
            onClick={handleRedeem}
            disabled={!canRedeem || !burnConfirmed || isRedeeming || !formData.name || !formData.address || !formData.city || !formData.country || !formData.zip || !formData.phoneModel}
            className="uniswap-btn-primary w-full"
          >
            <Flame className="h-5 w-5" />
            {isRedeeming ? "Processing Redemption..." : canRedeem ? "Redeem Device" : `Need ${remaining.toLocaleString()} more $STRYK`}
          </button>
        </section>

        <section className="uniswap-card p-6 mt-6">
          <div className="flex items-center gap-2 mb-5">
            <History className="h-5 w-5" style={{ color: "#6B7280" }} />
            <h2 className="uniswap-section-title">Redemption History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="uniswap-table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Tracking</th>
                </tr>
              </thead>
              <tbody>
                {mockRedemptionData.history.map((item) => {
                  const style = statusStyles[item.status];
                  const StatusIcon = statusIcons[item.status];
                  return (
                    <tr key={item.id} className="uniswap-row-hover">
                      <td>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" style={{ color: "#9CA3AF" }} />
                          <span className="font-medium" style={{ color: "#111827" }}>{item.phone}</span>
                        </div>
                      </td>
                      <td>
                        <span className="uniswap-badge" style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          {item.status}
                        </span>
                      </td>
                      <td style={{ color: "#6B7280" }}>{item.date}</td>
                      <td>
                        <span className="font-mono text-sm" style={{ color: "#6B7280" }}>{item.tracking}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
