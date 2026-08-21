import { useState } from "react";
import { formatCompact, formatCurrency } from "../utils/format";
import {
  Smartphone,
  HardDrive,
  ShieldCheck,
  Shield,
  Lock,
  MapPin,
  Warehouse,
  FileText,
  ClipboardList,
  Eye,
  BadgeCheck,
  Building2,
  Landmark,
} from "lucide-react";

const MOCK_VAULT_OVERVIEW = {
  totalDevices: 1420,
  totalValueUsd: 3895000,
  insuranceStatus: "Insured",
  breakdown: [
    { model: "iPhone 17 Pro Max", count: 320, value: 1150000 },
    { model: "iPhone 17 Pro", count: 280, value: 980000 },
    { model: "iPhone 17", count: 200, value: 520000 },
    { model: "iPhone 16 Pro Max", count: 180, value: 720000 },
    { model: "iPhone 16 Pro", count: 160, value: 480000 },
    { model: "iPhone 16", count: 120, value: 240000 },
    { model: "iPhone 15 Pro Max", count: 90, value: 320000 },
    { model: "iPhone 15 Pro", count: 70, value: 180000 },
    { model: "iPhone 15", count: 50, value: 90000 },
    { model: "iPhone 14 Pro Max", count: 30, value: 80000 },
    { model: "iPhone 14 Pro", count: 20, value: 40000 },
    { model: "Other", count: 120, value: 150000 },
  ],
};

const MOCK_AUDITS = {
  latest: {
    id: "AUD-2026-08-04",
    date: "2026-08-04T10:15:00Z",
    status: "Passed",
    totalDevicesVerified: 1420,
    totalValueVerified: "$3,895,000",
  },
  history: [
    { id: "AUD-2026-08-04", date: "2026-08-04", status: "Passed" },
    { id: "AUD-2026-07-28", date: "2026-07-28", status: "Passed" },
    { id: "AUD-2026-07-21", date: "2026-07-21", status: "Passed" },
    { id: "AUD-2026-07-14", date: "2026-07-14", status: "Conditional" },
  ],
};

const MOCK_LOCATIONS = [
  { name: "Vault TX-01 (Austin, TX)", capacity: "500 units", certifications: ["SOC 2 Type II", "ISO 27001"], custodian: "Fort Knox Digital" },
  { name: "Vault NV-01 (Reno, NV)", capacity: "500 units", certifications: ["SOC 2 Type II", "PCI DSS"], custodian: "Brink's Vault Services" },
  { name: "Vault DE-01 (Delaware)", capacity: "420 units", certifications: ["ISO 27001", "GDPR Compliant"], custodian: "Coinbase Custody" },
];

const STATUS_COLORS = {
  Passed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Conditional: "bg-amber-50 text-amber-700 ring-amber-200",
  Insured: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pending: "bg-gray-50 text-gray-600 dark:text-gray-400",
};

export default function VaultPage() {
  const formatDate = (dateStr) => new Date(dateStr).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Inventory Vault</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Physical device storage, quality control, and fulfillment status.</p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6">
            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-blue-600" />
                Inventory Overview
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl p-4 bg-surface">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Devices Ready</p>
                   <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{formatCompact(MOCK_VAULT_OVERVIEW.totalDevices)}</p>
                </div>
                <div className="rounded-2xl p-4 bg-surface">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                   <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(MOCK_VAULT_OVERVIEW.totalValueUsd)}</p>
                </div>
                <div className="rounded-2xl p-4 bg-surface">
                  <p className="text-sm text-gray-500 dark:text-gray-400">QC Status</p>
                   <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <ShieldCheck className="h-4 w-4" />
                    {MOCK_VAULT_OVERVIEW.insuranceStatus}
                  </p>
                </div>
              </div>
               <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-600 mb-3">Inventory by Model</h3>
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-zinc-800 dark:border-zinc-800">
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Model</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Count</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Value (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 dark:divide-zinc-800">
                      {MOCK_VAULT_OVERVIEW.breakdown.map((item) => (
                        <tr key={item.model} className="hover:bg-gray-50">
                          <td className="py-3 flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                            <Smartphone className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                            {item.model}
                          </td>
                          <td className="py-3 text-right text-gray-700 dark:text-gray-300 dark:text-gray-600 dark:text-gray-300 dark:text-gray-600 dark:text-gray-400">{formatCompact(item.count)}</td>
                          <td className="py-3 text-right text-gray-700 dark:text-gray-300 dark:text-gray-600 dark:text-gray-300 dark:text-gray-600 dark:text-gray-400">{formatCurrency(item.value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-violet-600" />
                Live Audits
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl p-5 bg-surface">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-600 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                    Latest Audit Report
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Report ID</p>
                  <p className="text-sm font-mono font-medium text-gray-900 dark:text-white">{MOCK_AUDITS.latest.id}</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(MOCK_AUDITS.latest.date)}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS_COLORS[MOCK_AUDITS.latest.status]}`}>
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {MOCK_AUDITS.latest.status}
                    </span>
                     <span className="text-sm text-gray-600 dark:text-gray-400">{formatCompact(MOCK_AUDITS.latest.totalDevicesVerified)} devices verified</span>
                  </div>
                </div>
                <div className="rounded-2xl p-5 bg-surface">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-600 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                    Proof of Reserves
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Verified on-chain proof of assets backing every physical device in the vault.
                  </p>
                  <div className="mt-4 rounded-2xl p-4 text-center bg-surface">
                    <Lock className="mx-auto h-6 w-6 text-gray-400 dark:text-gray-400" />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Merkle root and attestation link available post-audit.</p>
                  </div>
                </div>
              </div>
               <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-600 mb-3">Audit History</h3>
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-zinc-800 dark:border-zinc-800">
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Report ID</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 dark:divide-zinc-800">
                      {MOCK_AUDITS.history.map((audit) => (
                        <tr key={audit.id} className="hover:bg-gray-50">
                          <td className="py-3 font-mono text-gray-900 dark:text-white font-medium">{audit.id}</td>
                          <td className="py-3 text-gray-700 dark:text-gray-300 dark:text-gray-600 dark:text-gray-300 dark:text-gray-600 dark:text-gray-400">{audit.date}</td>
                          <td className="py-3">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS_COLORS[audit.status]}`}>
                              {audit.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-rose-600" />
                Vault Location
              </h2>
              <div className="space-y-4">
                {MOCK_LOCATIONS.map((loc) => (
                  <div key={loc.name} className="rounded-2xl p-4 bg-surface">
                     <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Warehouse className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                      {loc.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Capacity: {loc.capacity}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {loc.certifications.map((cert) => (
                        <span key={cert} className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
                          <BadgeCheck className="h-3 w-3" />
                          {cert}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Landmark className="h-3 w-3" />
                      {loc.custodian}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-600" />
                Security Certifications
              </h2>
              <div className="space-y-3">
                {[
                  { name: "SOC 2 Type II", status: "Active" },
                  { name: "ISO 27001", status: "Active" },
                  { name: "PCI DSS Level 1", status: "Active" },
                  { name: "GDPR Compliant", status: "Active" },
                ].map((cert) => (
                  <div key={cert.name} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-600 dark:text-gray-300 dark:text-gray-600 dark:text-gray-400">{cert.name}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS_COLORS[cert.status]}`}>
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="uniswap-card p-6 animate-drop-in">
              <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald-600" />
                Custodian Partners
              </h2>
              <div className="space-y-3">
                {MOCK_LOCATIONS.map((loc) => (
                  <div key={loc.custodian} className="flex items-center justify-between rounded-2xl p-3 bg-surface">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{loc.custodian}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{loc.name}</p>
                    </div>
                    <BadgeCheck className="h-4 w-4 text-emerald-600" />
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
