import { useState, useEffect } from "react";
import { formatCompact, formatCurrency } from "../utils/format";
import NumberModal from "../components/NumberModal";
import {
  ArrowUpRight,
  ArrowDownRight,
  Repeat,
  ShieldCheck,
  Smartphone,
  Package,
  Clock,
  TrendingUp,
} from "lucide-react";

const MOCK_PORTFOLIO = {
  usdcBalance: 847.5,
  deviceTradeInValue: 847.5,
  upgradeSavings: 152.5,
  devicesTradedIn: 3,
  targetDevice: "iPhone 16 Pro Max",
  targetPrice: 1199.0,
};

const MOCK_DEVICE_PIPELINE = [
  { id: "1", model: "iPhone 15 Pro", status: "Pending Verification", estimatedPayout: 620, stage: "QC", eta: "24-48 hours" },
];

const MOCK_TRANSACTIONS = [
  { id: "1", type: "trade-in", amount: 540, device: "iPhone 14 Pro", date: "2026-08-03", status: "Completed" },
  { id: "2", type: "upgrade", amount: 1199, device: "iPhone 15 Pro", date: "2026-08-02", status: "Shipped" },
  { id: "3", type: "deposit", amount: 200, date: "2026-08-01", status: "Completed" },
  { id: "4", type: "trade-in", amount: 320, device: "Samsung S23", date: "2026-07-31", status: "Completed" },
  { id: "5", type: "deposit", amount: 150, date: "2026-07-30", status: "Completed" },
  { id: "6", type: "trade-in", amount: 890, device: "MacBook Pro M3", date: "2026-07-29", status: "Completed" },
];

const MOCK_VAULT = {
  inventoryReady: 1240,
  fulfillmentRate: 99.2,
  lastAudit: "2026-08-03T14:22:00Z",
};

const FILTERS = ["All", "Trade-In", "Upgrade", "Deposit"];

const TRANSACTION_ICONS = {
  "trade-in": ArrowUpRight,
  upgrade: Package,
  deposit: Repeat,
};

const TRANSACTION_COLORS = {
  "trade-in": "text-emerald-600 dark:text-emerald-400",
  upgrade: "text-blue-600 dark:text-blue-400",
  deposit: "text-amber-600 dark:text-amber-400",
};

const generateChartData = (basePrice) => {
  const data = [];
  let price = basePrice * 0.92;
  for (let i = 0; i < 30; i++) {
    price += (Math.random() - 0.45) * (basePrice * 0.015);
    data.push(Math.max(price, basePrice * 0.8));
  }
  return data;
};

const DEVICES = [
  { id: "iphone16", name: "iPhone 16", price: 1199, image: "/iPhone 16.jpeg" },
  { id: "iphone16pro", name: "iPhone 16 Pro", price: 1299, image: "/iPhone 16.jpeg" },
  { id: "iphone16promax", name: "iPhone 16 Pro Max", price: 1399, image: "/iPhone 16.jpeg" },
  { id: "iphone17", name: "iPhone 17", price: 1199, image: "/iPhone 16.jpeg" },
  { id: "iphone17pro", name: "iPhone 17 Pro", price: 1299, image: "/iPhone 16.jpeg" },
  { id: "iphone17promax", name: "iPhone 17 Pro Max", price: 1399, image: "/iPhone 16.jpeg" },
  { id: "iphone15", name: "iPhone 15", price: 999, image: "/M1.png" },
  { id: "iphone15pro", name: "iPhone 15 Pro", price: 1099, image: "/M1.png" },
  { id: "iphone15promax", name: "iPhone 15 Pro Max", price: 1199, image: "/M1.png" },
  { id: "iphone14", name: "iPhone 14", price: 799, image: "/M2.png" },
  { id: "iphone14pro", name: "iPhone 14 Pro", price: 899, image: "/M2.png" },
  { id: "iphone14promax", name: "iPhone 14 Pro Max", price: 999, image: "/M2.png" },
];

const CHART_DATA = generateChartData(DEVICES[0].price);

function PriceChart({ data, color = "#4f46e5" }) {
  const width = 800;
  const height = 320;
  const padding = { top: 20, right: 80, bottom: 30, left: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => ({
    x: padding.left + (index / (data.length - 1)) * chartWidth,
    y: padding.top + chartHeight - ((value - min) / range) * chartHeight,
  }));

  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const area = `${path} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  const gridLines = [];
  const priceSteps = 6;
  for (let i = 0; i <= priceSteps; i++) {
    const y = padding.top + (i / priceSteps) * chartHeight;
    gridLines.push(
      `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e5e7eb" strokeWidth="1" />`
    );
    const price = max - (i / priceSteps) * range;
    gridLines.push(
      `<text x="${width - padding.right + 8}" y="${y + 4}" fill="#9ca3af" fontSize="11" fontFamily="ui-sans-serif, system-ui">$${price.toFixed(2)}</text>`
    );
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridLines}
      <path d={area} fill="url(#chartGradient)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function DashboardPage() {
  const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
  const [chartData, setChartData] = useState(() => generateChartData(DEVICES[0].price));
  const [txFilter, setTxFilter] = useState("All");
  const [modalValue, setModalValue] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const checkDark = () => setIsDarkMode(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const filteredTransactions = txFilter === "All"
    ? MOCK_TRANSACTIONS
    : MOCK_TRANSACTIONS.filter((tx) => tx.type === txFilter.toLowerCase());

  const handleDeviceChange = (device) => {
    setSelectedDevice(device);
    setChartData(generateChartData(device.price));
    setIsDropdownOpen(false);
  };

  const savingsProgress = Math.min((MOCK_PORTFOLIO.upgradeSavings / MOCK_PORTFOLIO.targetPrice) * 100, 100);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="mx-auto max-w-7xl w-full px-3 pt-3 pb-6 lg:px-6 lg:pt-6 lg:pb-6 space-y-1 md:space-y-4">
        <div className="lg:w-2/3 lg:p-6 px-3">
          <header className="dashboard-header">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8">
                <img src="/Logo.jpeg" alt="STRYK" className="h-full w-full rounded-full object-cover" />
              </div>
              <div className="h-8 w-8">
                <img src={isDarkMode ? "/Apple 2.jpeg" : "/apple.jpeg"} alt="Apple" className="h-full w-full rounded-full object-cover -ml-3" />
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white tracking-tight">SYK / USDC</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative inline-flex items-center">
                  <span className="text-xl font-medium text-gray-900 dark:text-white">{selectedDevice.name}</span>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center h-7 w-7 rounded bg-gray-200 dark:bg-zinc-700 ml-2"
                >
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md border-0 shadow-lg z-50 max-h-64 overflow-y-auto no-scrollbar">
                    {DEVICES.map((device) => (
                      <button
                        key={device.id}
                        onClick={() => handleDeviceChange(device)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 transition ${
                          selectedDevice.id === device.id ? "font-semibold text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {device.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-2 text-2xl font-medium text-gray-900 dark:text-white">{formatCurrency(selectedDevice.price)}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Trade-in value</p>
            <p className="hidden sm:block text-gray-500 dark:text-gray-400">Trade in your device. Get paid in stablecoins. Upgrade when you're ready.</p>
          </header>
        </div>
      </div>

      <div className="w-full animate-drop-in" style={{ "--i": 0 }}>
        <PriceChart data={chartData} />
      </div>

      <div className="mx-auto max-w-7xl w-full px-3 pt-0 pb-6 lg:px-6 lg:pt-6 lg:pb-6 space-y-1 md:space-y-4">
        <div className="px-3 lg:px-6">
          <div className="dashboard-metrics-desktop flex flex-nowrap items-stretch gap-3 md:gap-6 overflow-x-auto no-scrollbar animate-drop-in" style={{ "--i": 1 }}>
            <div className="border-r border-gray-200 dark:border-gray-800 pr-8 min-w-[220px] shrink-0 flex flex-col justify-between">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">USDC Balance</p>
              <p
                className="mt-2 text-2xl font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition"
                onClick={() => setModalValue(formatCurrency(MOCK_PORTFOLIO.usdcBalance))}
              >
                ${MOCK_PORTFOLIO.usdcBalance.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Ready to use</p>
            </div>

            <div className="border-r border-gray-200 dark:border-gray-800 pr-8 min-w-[220px] shrink-0 flex flex-col justify-between">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Device Trade-In Value</p>
              <p className="mt-2 text-2xl font-medium text-gray-900 dark:text-white">{formatCurrency(MOCK_PORTFOLIO.deviceTradeInValue)}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Ready to cash out</p>
            </div>

            <div className="min-w-[220px] shrink-0 flex flex-col justify-between">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upgrade Savings</p>
              <p
                className="mt-2 text-2xl font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition"
                onClick={() => setModalValue(formatCurrency(MOCK_PORTFOLIO.upgradeSavings))}
              >
                {formatCurrency(MOCK_PORTFOLIO.upgradeSavings)}
              </p>
              <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium">Accumulated</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <section className="lg:col-span-2 space-y-3">
            <div className="uniswap-card px-3 lg:px-6 py-6 animate-drop-in" style={{ "--i": 2 }}>
              <h2 className="uniswap-section-title">Quick Actions</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-green-50 dark:bg-green-900/40 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 transition hover:bg-green-100 dark:hover:bg-green-900/60">
                  <Smartphone className="h-5 w-5" />
                  Apply for Lease
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-50 dark:bg-purple-900/40 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 transition hover:bg-purple-100 dark:hover:bg-purple-900/60">
                  <Smartphone className="h-5 w-5" />
                  Trade In
                </button>
              </div>
            </div>

            <div className="uniswap-card px-3 lg:px-6 py-6 animate-drop-in" style={{ "--i": 3 }}>
              <h2 className="uniswap-section-title">Your Device Pipeline</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Track your trade-ins and upgrades</p>
              <div className="mt-4 space-y-3">
                {MOCK_DEVICE_PIPELINE.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950/60">
                        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{device.model}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{device.status} · {device.eta}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(device.estimatedPayout)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Est. payout</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="uniswap-card px-3 lg:px-6 py-6 animate-drop-in" style={{ "--i": 4 }}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="uniswap-section-title">Activity</h2>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTxFilter(filter)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                        txFilter === filter
                          ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                          : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-zinc-800">
                      <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Type</th>
                      <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Device / Amount</th>
                      <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                      <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                    {filteredTransactions.map((tx) => {
                      const Icon = TRANSACTION_ICONS[tx.type];
                      return (
                        <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Icon className={`h-4 w-4 ${TRANSACTION_COLORS[tx.type]}`} />
                              <span className="font-medium capitalize text-gray-900 dark:text-white">{tx.type}</span>
                            </div>
                          </td>
                          <td className="py-3 text-gray-700 dark:text-gray-300">
                            {tx.device ? `${tx.device} · ` : ""}{formatCurrency(tx.amount)}
                          </td>
                          <td className="py-3 text-gray-500 dark:text-gray-400">{tx.date}</td>
                          <td className="py-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
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

          <aside className="space-y-4">
            <div className="uniswap-card px-3 lg:px-6 py-6 animate-drop-in" style={{ "--i": 5 }}>
              <h2 className="uniswap-section-title">Inventory Status</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Ready to Ship</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition" onClick={() => setModalValue(MOCK_VAULT.inventoryReady.toLocaleString())}>{formatCompact(MOCK_VAULT.inventoryReady)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Fulfillment Rate</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{MOCK_VAULT.fulfillmentRate}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${MOCK_VAULT.fulfillmentRate}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Last audit: {new Date(MOCK_VAULT.lastAudit).toLocaleString()}</p>
              </div>
            </div>

            <div className="uniswap-card px-3 lg:px-6 py-6 animate-drop-in" style={{ "--i": 6 }}>
              <h2 className="uniswap-section-title">Upgrade Savings Goal</h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Target Device</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{MOCK_PORTFOLIO.targetDevice}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Target Price</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(MOCK_PORTFOLIO.targetPrice)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${savingsProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{savingsProgress.toFixed(1)}% saved · {formatCurrency(MOCK_PORTFOLIO.targetPrice - MOCK_PORTFOLIO.upgradeSavings)} to go</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-blue-600/90 dark:bg-blue-600 px-4 py-3 text-base font-medium text-white transition hover:bg-blue-500 w-full">
                  <TrendingUp className="h-4 w-4" />
                  Save More
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gray-900/90 dark:bg-zinc-700/90 px-4 py-3 text-base font-medium text-white transition hover:bg-gray-800 dark:hover:bg-zinc-700 w-full">
                  <Package className="h-4 w-4" />
                  Upgrade
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {modalValue !== null && <NumberModal value={modalValue} onClose={() => setModalValue(null)} />}
    </div>
  );
}
