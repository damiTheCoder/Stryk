import { useState } from "react";
import {
  Smartphone,
  Briefcase,
  Users,
  DollarSign,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Filter,
  Download,
  Settings,
  BarChart3,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  FileText,
  ShieldCheck,
  Zap,
} from "lucide-react";

const MOCK_VENDOR = {
  id: "vnd-001",
  name: "STRYK Certified",
  handle: "@stryk",
  status: "Active",
  joined: "2025-01-15",
  totalLeases: 1240,
  activeLeases: 890,
  completedLeases: 350,
  totalRevenue: 892500,
  pendingPayouts: 45600,
  rating: 4.8,
  fulfillmentRate: 99.2,
};

const MOCK_LEASES = [
  { id: "L-1001", customer: "John Doe", device: "iPhone 17 Pro Max", monthly: 119, term: "24 months", status: "Active", startDate: "2026-06-15", nextPayment: "2026-09-15" },
  { id: "L-1002", customer: "Jane Smith", device: "iPhone 16 Pro", monthly: 79, term: "24 months", status: "Active", startDate: "2026-07-01", nextPayment: "2026-09-01" },
  { id: "L-1003", customer: "Mike Johnson", device: "iPhone 17", monthly: 69, term: "24 months", status: "Pending Approval", startDate: "—", nextPayment: "—" },
  { id: "L-1004", customer: "Sarah Williams", device: "iPhone 16 Pro Max", monthly: 99, term: "36 months", status: "Active", startDate: "2026-05-20", nextPayment: "2026-09-20" },
  { id: "L-1005", customer: "Alex Brown", device: "iPhone 15 Pro Max", monthly: 89, term: "24 months", status: "Completed", startDate: "2025-08-10", nextPayment: "—" },
  { id: "L-1006", customer: "Emma Davis", device: "iPhone 17 Pro", monthly: 89, term: "24 months", status: "Overdue", startDate: "2026-04-01", nextPayment: "2026-08-01" },
];

const MOCK_INVENTORY = [
  { id: "inv-1", model: "iPhone 17 Pro Max (256GB)", stock: 45, leased: 38, available: 7, price: 1199, monthly: 119 },
  { id: "inv-2", model: "iPhone 17 Pro (128GB)", stock: 60, leased: 52, available: 8, price: 999, monthly: 89 },
  { id: "inv-3", model: "iPhone 17 (128GB)", stock: 80, leased: 65, available: 15, price: 799, monthly: 69 },
  { id: "inv-4", model: "iPhone 16 Pro Max (256GB)", stock: 35, leased: 28, available: 7, price: 1099, monthly: 99 },
  { id: "inv-5", model: "iPhone 16 Pro (128GB)", stock: 50, leased: 42, available: 8, price: 899, monthly: 79 },
  { id: "inv-6", model: "iPhone 16 (128GB)", stock: 70, leased: 58, available: 12, price: 699, monthly: 59 },
  { id: "inv-7", model: "iPhone 15 Pro Max (256GB)", stock: 25, leased: 20, available: 5, price: 999, monthly: 89 },
  { id: "inv-8", model: "iPhone 15 Pro (128GB)", stock: 40, leased: 33, available: 7, price: 799, monthly: 69 },
  { id: "inv-9", model: "iPhone 15 (128GB)", stock: 55, leased: 45, available: 10, price: 599, monthly: 49 },
  { id: "inv-10", model: "iPhone 14 Pro Max (256GB)", stock: 15, leased: 12, available: 3, price: 899, monthly: 79 },
  { id: "inv-11", model: "iPhone 14 Pro (128GB)", stock: 20, leased: 16, available: 4, price: 699, monthly: 59 },
  { id: "inv-12", model: "iPhone 14 (128GB)", stock: 30, leased: 24, available: 6, price: 499, monthly: 39 },
];

const STATUS_COLORS = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Pending Approval": "bg-amber-50 text-amber-700 ring-amber-200",
  Completed: "bg-blue-50 text-blue-700 ring-blue-200",
  Overdue: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function BusinessManagerPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNewLeaseModal, setShowNewLeaseModal] = useState(false);

  const filteredLeases = MOCK_LEASES.filter((lease) => {
    const matchesSearch = lease.customer.toLowerCase().includes(searchQuery.toLowerCase()) || lease.device.toLowerCase().includes(searchQuery.toLowerCase()) || lease.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || lease.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredInventory = MOCK_INVENTORY.filter((item) =>
    item.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Active Leases", value: MOCK_VENDOR.activeLeases, icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40" },
    { label: "Total Revenue", value: `$${(MOCK_VENDOR.totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
    { label: "Pending Payouts", value: `$${(MOCK_VENDOR.pendingPayouts / 1000).toFixed(0)}K`, icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40" },
    { label: "Fulfillment Rate", value: `${MOCK_VENDOR.fulfillmentRate}%`, icon: TrendingUp, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/40" },
  ];

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "leases", label: "Leases", icon: FileText },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="mx-auto max-w-7xl w-full px-3 pt-0 pb-6 lg:px-6 lg:pt-6 lg:pb-6 space-y-1 md:space-y-4">
        <div className="px-3 pt-3 pb-6 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-600 text-white">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Stryk Business Manager</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Vendor portal for lease management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${MOCK_VENDOR.status === "Active" ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-gray-50 text-gray-600 ring-1 ring-gray-200"}`}>
                <CheckCircle2 className="h-3.5 w-3.5" />
                {MOCK_VENDOR.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-zinc-800 rounded-xl mb-6 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.id ? "bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-drop-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="uniswap-card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</span>
                      <div className={`flex items-center justify-center h-8 w-8 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <section className="lg:col-span-2 space-y-6">
                  <div className="uniswap-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="uniswap-section-title flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        Revenue Overview
                      </h2>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Last 6 months</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { month: "Aug 2026", amount: 142500, leases: 120 },
                        { month: "Jul 2026", amount: 138000, leases: 115 },
                        { month: "Jun 2026", amount: 125000, leases: 105 },
                        { month: "May 2026", amount: 119000, leases: 98 },
                        { month: "Apr 2026", amount: 108000, leases: 90 },
                        { month: "Mar 2026", amount: 95000, leases: 78 },
                      ].map((item) => (
                        <div key={item.month} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
                              {item.month.split(" ")[0]}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.month}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.leases} leases</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">${item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="uniswap-card p-6">
                    <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      Attention Required
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 ring-1 ring-rose-200 dark:ring-rose-800">
                        <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">1 Overdue Lease</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">L-1006 — Emma Davis — iPhone 17 Pro — $89/mo overdue since Aug 1</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 ring-1 ring-amber-200 dark:ring-amber-800">
                        <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">1 Pending Approval</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">L-1003 — Mike Johnson — iPhone 17 — Awaiting review</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <aside className="space-y-6">
                  <div className="uniswap-card p-6">
                    <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Vendor Profile
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Vendor Name</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{MOCK_VENDOR.name}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Handle</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{MOCK_VENDOR.handle}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Member Since</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{MOCK_VENDOR.joined}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Rating</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                          {MOCK_VENDOR.rating} <Zap className="h-3.5 w-3.5 text-amber-500" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="uniswap-card p-6">
                    <h2 className="uniswap-section-title mb-4">Quick Stats</h2>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500 dark:text-gray-400">Inventory Utilization</span>
                          <span className="font-semibold text-gray-900 dark:text-white">78%</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: "78%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500 dark:text-gray-400">On-time Payments</span>
                          <span className="font-semibold text-gray-900 dark:text-white">94%</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: "94%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500 dark:text-gray-400">Customer Satisfaction</span>
                          <span className="font-semibold text-gray-900 dark:text-white">96%</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-600 rounded-full" style={{ width: "96%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}

          {activeTab === "leases" && (
            <div className="space-y-4 animate-drop-in">
              <div className="uniswap-card px-3 lg:px-6 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h2 className="uniswap-section-title">Lease Management</h2>
                  <button onClick={() => setShowNewLeaseModal(true)} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition">
                    <Plus className="h-4 w-4" />
                    New Lease
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by customer, device, or lease ID..."
                      className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 transition"
                    >
                      <option>All</option>
                      <option>Active</option>
                      <option>Pending Approval</option>
                      <option>Completed</option>
                      <option>Overdue</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-zinc-800">
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Lease ID</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Customer</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Device</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Monthly</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Term</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-center">Status</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Next Payment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                      {filteredLeases.map((lease) => (
                        <tr key={lease.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                          <td className="py-4">
                            <span className="font-mono text-xs font-medium text-gray-900 dark:text-white">{lease.id}</span>
                          </td>
                          <td className="py-4">
                            <span className="font-medium text-gray-900 dark:text-white">{lease.customer}</span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">{lease.device}</span>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <span className="font-semibold text-gray-900 dark:text-white">${lease.monthly}</span>
                          </td>
                          <td className="py-4 text-right">
                            <span className="text-gray-700 dark:text-gray-300">{lease.term}</span>
                          </td>
                          <td className="py-4 text-center">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS_COLORS[lease.status] || STATUS_COLORS.Active}`}>
                              {lease.status === "Active" && <CheckCircle2 className="h-3.5 w-3.5" />}
                              {lease.status === "Pending Approval" && <Clock className="h-3.5 w-3.5" />}
                              {lease.status === "Overdue" && <AlertCircle className="h-3.5 w-3.5" />}
                              {lease.status === "Completed" && <CheckCircle2 className="h-3.5 w-3.5" />}
                              {lease.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{lease.nextPayment}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "inventory" && (
            <div className="space-y-4 animate-drop-in">
              <div className="uniswap-card px-3 lg:px-6 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h2 className="uniswap-section-title">Device Inventory</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search devices..."
                      className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 transition sm:w-64"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-zinc-800">
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Model</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Total Stock</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Leased</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Available</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Price</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Monthly</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                      {filteredInventory.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4 text-gray-400" />
                              <span className="font-medium text-gray-900 dark:text-white">{item.model}</span>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <span className="text-gray-700 dark:text-gray-300">{item.stock}</span>
                          </td>
                          <td className="py-4 text-right">
                            <span className="text-gray-700 dark:text-gray-300">{item.leased}</span>
                          </td>
                          <td className="py-4 text-right">
                            <span className={`font-semibold ${item.available > 5 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                              {item.available}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <span className="font-semibold text-gray-900 dark:text-white">${item.price.toLocaleString()}</span>
                          </td>
                          <td className="py-4 text-right">
                            <span className="text-gray-700 dark:text-gray-300">${item.monthly}/mo</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6 animate-drop-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <section className="lg:col-span-2 space-y-6">
                  <div className="uniswap-card p-6">
                    <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Business Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Business Name</label>
                        <input
                          type="text"
                          defaultValue={MOCK_VENDOR.name}
                          className="uniswap-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Business Handle</label>
                        <input
                          type="text"
                          defaultValue={MOCK_VENDOR.handle}
                          className="uniswap-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Contact Email</label>
                        <input
                          type="email"
                          defaultValue="vendor@stryk.com"
                          className="uniswap-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Business Address</label>
                        <input
                          type="text"
                          defaultValue="123 Market Street, San Francisco, CA 94105"
                          className="uniswap-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Tax ID / EIN</label>
                        <input
                          type="text"
                          defaultValue="XX-XXXXXXX"
                          className="uniswap-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="uniswap-card p-6">
                    <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Payout Settings
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Payout Bank Account</label>
                        <input
                          type="text"
                          defaultValue="**** **** **** 4521"
                          className="uniswap-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Payout Schedule</label>
                        <select className="uniswap-input">
                          <option>Weekly (Every Monday)</option>
                          <option>Bi-weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Minimum Payout Threshold</label>
                        <input
                          type="text"
                          defaultValue="$1,000"
                          className="uniswap-input"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <aside className="space-y-6">
                  <div className="uniswap-card p-6">
                    <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Compliance
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Business License</span>
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Verified</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Tax ID</span>
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Verified</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Insurance</span>
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Pending</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Background Check</span>
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Passed</span>
                      </div>
                    </div>
                  </div>

                  <div className="uniswap-card p-6">
                    <h2 className="uniswap-section-title mb-3">Need Help?</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Contact the Stryk vendor support team for assistance with your account, leases, or payouts.</p>
                    <button className="w-full rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 py-2.5 text-sm font-semibold text-gray-900 dark:text-white transition">
                      Contact Support
                    </button>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
