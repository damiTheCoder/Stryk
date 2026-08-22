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
  { id: "all", label: "All" },
  { id: "iphone-14", label: "iPhone 14" },
  { id: "iphone-15", label: "iPhone 15" },
  { id: "iphone-16", label: "iPhone 16" },
  { id: "iphone-17", label: "iPhone 17" },
];

const MOCK_DEVICES = [
  { id: "1", model: "iPhone 15 Pro Max (256GB)", generation: "iphone-15", price: 920, change: -2.3, trend: "down", image: "/15proMax.jpeg" },
  { id: "2", model: "iPhone 15 Pro (128GB)", generation: "iphone-15", price: 780, change: -1.8, trend: "down", image: "/15pro.jpeg" },
  { id: "3", model: "iPhone 15 (128GB)", generation: "iphone-15", price: 480, change: 0.5, trend: "up", image: "/15pro.jpeg" },
  { id: "4", model: "iPhone 14 Pro Max (256GB)", generation: "iphone-14", price: 650, change: -3.1, trend: "down", image: "/14proMax.jpeg" },
  { id: "5", model: "iPhone 14 Pro (128GB)", generation: "iphone-14", price: 540, change: 4.2, trend: "up", image: "/14pro.jpeg" },
  { id: "6", model: "iPhone 14 (128GB)", generation: "iphone-14", price: 380, change: 1.1, trend: "up", image: "/14.jpeg" },
  { id: "7", model: "iPhone 17 Pro Max (256GB)", generation: "iphone-17", price: 1450, change: -0.8, trend: "down", image: "/17proMAx.jpeg" },
  { id: "8", model: "iPhone 17 Pro (128GB)", generation: "iphone-17", price: 1150, change: 2.5, trend: "up", image: "/17pro.jpeg" },
  { id: "9", model: "iPhone 17 (128GB)", generation: "iphone-17", price: 720, change: 1.8, trend: "up", image: "/17.jpeg" },
  { id: "10", model: "iPhone 16 Pro Max (256GB)", generation: "iphone-16", price: 1350, change: -1.2, trend: "down", image: "/16promax.jpeg" },
  { id: "11", model: "iPhone 16 Pro (128GB)", generation: "iphone-16", price: 1050, change: 0.8, trend: "up", image: "/16pro.jpeg" },
  { id: "12", model: "iPhone 16 (128GB)", generation: "iphone-16", price: 650, change: 3.1, trend: "up", image: "/16.jpeg" },
];

export default function TradePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalValue, setModalValue] = useState(null);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [activeDeviceId, setActiveDeviceId] = useState(null);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleDevice = (id) => {
    setActiveDeviceId((prev) => (prev === id ? null : id));
  };

  const filteredDevices = MOCK_DEVICES.filter((device) => {
    const matchesCategory = activeCategory === "all" || device.generation === activeCategory;
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

            <div className="mt-4 space-y-3">
              {activeDeviceId && (() => {
                const activeDevice = MOCK_DEVICES.find((d) => d.id === activeDeviceId);
                if (!activeDevice) return null;
                return (
                  <div className="flex justify-center">
                    <img
                      src={activeDevice.image}
                      alt={activeDevice.model}
                      className="h-56 w-auto object-contain border-2 border-black rounded-xl"
                    />
                  </div>
                );
              })()}
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
                    <tr
                      key={device.id}
                      className={`cursor-pointer transition ${activeDeviceId === device.id ? "bg-blue-50 dark:bg-blue-950/30" : "hover:bg-gray-50 dark:hover:bg-zinc-800/50"}`}
                      onClick={() => toggleDevice(device.id)}
                    >
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
  { user: "@crypt0joe", device: "iPhone 14 Pro Max", amount: 780, time: "2 hours ago" },
  { user: "@techlady", device: "iPhone 15 Pro", amount: 540, time: "5 hours ago" },
  { user: "@dev_guy", device: "iPhone 16 Pro Max", amount: 920, time: "1 day ago" },
  { user: "@newuser", device: "iPhone 17 Pro", amount: 650, time: "2 days ago" },
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
