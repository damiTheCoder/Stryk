import { useState, useEffect } from "react";
import { formatCompact, formatCurrency } from "../utils/format";
import NumberModal from "../components/NumberModal";
import {
  Smartphone,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Search,
  Zap,
} from "lucide-react";

const DEVICE_CATEGORIES = [
  { id: "phones", label: "Phones" },
  { id: "laptops", label: "Laptops" },
  { id: "tablets", label: "Tablets" },
  { id: "gaming", label: "Gaming" },
];

const MOCK_DEVICES = [
  { id: "1", model: "iPhone 15 Pro Max (256GB)", category: "phones", price: 920, change: -2.3, trend: "down" },
  { id: "2", model: "iPhone 15 Pro (128GB)", category: "phones", price: 780, change: -1.8, trend: "down" },
  { id: "3", model: "Samsung S24 Ultra (256GB)", category: "phones", price: 650, change: 0.5, trend: "up" },
  { id: "4", model: "iPhone 14 Pro (256GB)", category: "phones", price: 540, change: -3.1, trend: "down" },
  { id: "5", model: "NVIDIA RTX 4080", category: "gaming", price: 1150, change: 4.2, trend: "up" },
  { id: "6", model: "MacBook Pro M3 (14\")", category: "laptops", price: 1450, change: 1.1, trend: "up" },
  { id: "7", model: "iPad Pro M4 (12.9\")", category: "tablets", price: 720, change: -0.8, trend: "down" },
  { id: "8", model: "PlayStation 5", category: "gaming", price: 380, change: 2.5, trend: "up" },
];

export default function TradePage() {
  const [activeCategory, setActiveCategory] = useState("phones");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalValue, setModalValue] = useState(null);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const filteredDevices = MOCK_DEVICES.filter((device) => {
    const matchesCategory = device.category === activeCategory;
    const matchesSearch = device.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="mx-auto max-w-7xl w-full px-3 pt-0 pb-6 lg:px-6 lg:pt-6 lg:pb-6 space-y-1 md:space-y-4">
        <div className="px-3 lg:px-6 space-y-4">
          <div className="uniswap-card px-3 lg:px-6 py-6 animate-drop-in" style={{ "--i": 1 }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="uniswap-section-title">Live Trade-In Pricing</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search devices..."
                  className="pl-9 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 transition w-full sm:w-64"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
              {DEVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                    activeCategory === cat.id
                      ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="mt-4 overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-zinc-800">
                    <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Device</th>
                    <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Trade-In Value</th>
                    <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">24h Change</th>
                    <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {filteredDevices.map((device) => (
                    <tr key={device.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-zinc-800">
                            <Smartphone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">{device.model}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(device.price)}</span>
                      </td>
                      <td className="py-4 text-right">
                        <div className={`inline-flex items-center gap-1 text-sm font-medium ${device.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                          {device.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          {Math.abs(device.change)}%
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium text-white transition">
                          <Zap className="h-3.5 w-3.5" />
                          Get Quote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="uniswap-card px-3 lg:px-6 py-6 animate-drop-in" style={{ "--i": 2 }}>
            <h2 className="uniswap-section-title mb-4">Recent Payouts</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Trust signals from our community</p>
            <div className="mt-4 space-y-3">
              {[
                { user: "@crypt0joe", device: "iPhone 14 Pro", amount: 540, time: "2 hours ago" },
                { user: "@techlady", device: "Samsung S23", amount: 320, time: "5 hours ago" },
                { user: "@dev_guy", device: "MacBook Pro M3", amount: 890, time: "1 day ago" },
              ].map((payout, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{payout.user} → {payout.device}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{payout.time}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">+{formatCurrency(payout.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modalValue !== null && <NumberModal value={modalValue} onClose={() => setModalValue(null)} />}
    </div>
  );
}
