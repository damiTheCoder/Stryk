import { useState } from "react";
import { Wallet, MapPin, Phone, Package, Truck, CheckCircle2, Clock, Flame, Lock, History } from "lucide-react";

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
    phoneModel: "",
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
    Processing: "bg-amber-50 text-amber-700 ring-amber-200",
    Shipped: "bg-blue-50 text-blue-700 ring-blue-200",
    Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };

  const statusIcons = {
    Processing: <Clock size={14} />,
    Shipped: <Truck size={14} />,
    Delivered: <CheckCircle2 size={14} />,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl p-4 md:p-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Redeem $STRYK</h1>
          <p className="mt-2 text-gray-500">Burn tokens to redeem premium devices</p>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-600" />
            Redemption Eligibility
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500 mb-1">Current Balance</p>
              <p className="text-2xl font-bold text-gray-900">{mockRedemptionData.balance.toLocaleString()} $STRYK</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500 mb-1">Redemption Target</p>
              <p className="text-2xl font-bold text-gray-900">{mockRedemptionData.target.toLocaleString()} $STRYK</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500 mb-1">Amount Needed</p>
              <p className="text-2xl font-bold text-gray-900">{remaining.toLocaleString()} $STRYK</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Progress to redemption</span>
              <span className="text-gray-900 font-medium">{progressPercent.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-emerald-600" />
            Redemption Form
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="New York"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="United States"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Zip Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="10001"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Phone Model</label>
              <select
                name="phoneModel"
                value={formData.phoneModel}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a model</option>
                {mockRedemptionData.phoneModels.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
            <Truck className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600">Estimated delivery: <strong className="text-gray-900">{mockRedemptionData.estimatedDelivery}</strong></span>
          </div>
          <div className="flex items-start gap-3 mb-6">
            <input
              type="checkbox"
              id="burnConfirm"
              checked={burnConfirmed}
              onChange={(e) => setBurnConfirmed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-gray-300 bg-gray-50 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="burnConfirm" className="text-sm text-gray-600 cursor-pointer select-none">
              I confirm that I want to burn {mockRedemptionData.target.toLocaleString()} $STRYK tokens to redeem this device. This action cannot be undone.
            </label>
          </div>
          <button
            onClick={handleRedeem}
            disabled={!canRedeem || !burnConfirmed || isRedeeming || !formData.name || !formData.address || !formData.city || !formData.country || !formData.zip || !formData.phoneModel}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            <Flame className="h-5 w-5" />
            {isRedeeming ? "Processing Redemption..." : canRedeem ? "Redeem Device" : `Need ${remaining.toLocaleString()} more $STRYK`}
          </button>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <History className="h-5 w-5 text-gray-900" />
            Redemption History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-sm font-medium text-gray-500">Device</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Date</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Tracking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockRedemptionData.history.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 font-medium">{item.phone}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-lg ring-1 ${statusStyles[item.status]}`}>
                        {statusIcons[item.status]}
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{item.date}</td>
                    <td className="py-3">
                      <span className="text-gray-500 font-mono text-sm">{item.tracking}</span>
                    </td>
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
