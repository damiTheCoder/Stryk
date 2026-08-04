import { useState } from "react";
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
    { model: "Galaxy S25 Ultra", count: 420, value: 1260000 },
    { model: "iPhone 17 Pro", count: 380, value: 1330000 },
    { model: "Pixel 10 Pro", count: 290, value: 754000 },
    { model: "OnePlus 13", count: 210, value: 441000 },
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
  Pending: "bg-gray-50 text-gray-600 ring-gray-200",
};

export default function VaultPage() {
  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Vault</h1>
          <p className="mt-2 text-gray-500">Physical asset storage, audit status, and custodian details.</p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-blue-600" />
                Vault Overview
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Total Devices Stored</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{MOCK_VAULT_OVERVIEW.totalDevices.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Total Value Locked</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(MOCK_VAULT_OVERVIEW.totalValueUsd)}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Insurance Status</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <ShieldCheck className="h-4 w-4" />
                    {MOCK_VAULT_OVERVIEW.insuranceStatus}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Device Breakdown by Model</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 font-medium text-gray-500">Model</th>
                        <th className="pb-3 font-medium text-gray-500 text-right">Count</th>
                        <th className="pb-3 font-medium text-gray-500 text-right">Value (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {MOCK_VAULT_OVERVIEW.breakdown.map((item) => (
                        <tr key={item.model} className="hover:bg-gray-50">
                          <td className="py-3 flex items-center gap-2 text-gray-900 font-medium">
                            <Smartphone className="h-4 w-4 text-gray-400" />
                            {item.model}
                          </td>
                          <td className="py-3 text-right text-gray-700">{item.count.toLocaleString()}</td>
                          <td className="py-3 text-right text-gray-700">{formatCurrency(item.value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-violet-600" />
                Live Audits
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-5">
                  <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    Latest Audit Report
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Report ID</p>
                  <p className="text-sm font-mono font-medium text-gray-900">{MOCK_AUDITS.latest.id}</p>
                  <p className="mt-2 text-sm text-gray-500">Date</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(MOCK_AUDITS.latest.date)}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS_COLORS[MOCK_AUDITS.latest.status]}`}>
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {MOCK_AUDITS.latest.status}
                    </span>
                    <span className="text-sm text-gray-600">{MOCK_AUDITS.latest.totalDevicesVerified.toLocaleString()} devices verified</span>
                  </div>
                </div>
                <div className="rounded-xl bg-gray-50 p-5">
                  <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    Proof of Reserves
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Verified on-chain proof of assets backing every physical device in the vault.
                  </p>
                  <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-4 text-center">
                    <Lock className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="mt-1 text-xs text-gray-500">Merkle root and attestation link available post-audit.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Audit History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 font-medium text-gray-500">Report ID</th>
                        <th className="pb-3 font-medium text-gray-500">Date</th>
                        <th className="pb-3 font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {MOCK_AUDITS.history.map((audit) => (
                        <tr key={audit.id} className="hover:bg-gray-50">
                          <td className="py-3 font-mono text-gray-900 font-medium">{audit.id}</td>
                          <td className="py-3 text-gray-700">{audit.date}</td>
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
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-rose-600" />
                Vault Location
              </h2>
              <div className="space-y-4">
                {MOCK_LOCATIONS.map((loc) => (
                  <div key={loc.name} className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Warehouse className="h-4 w-4 text-gray-400" />
                      {loc.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Capacity: {loc.capacity}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {loc.certifications.map((cert) => (
                        <span key={cert} className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
                          <BadgeCheck className="h-3 w-3" />
                          {cert}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                      <Landmark className="h-3 w-3" />
                      {loc.custodian}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
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
                    <span className="text-sm text-gray-700">{cert.name}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS_COLORS[cert.status]}`}>
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald-600" />
                Custodian Partners
              </h2>
              <div className="space-y-3">
                {MOCK_LOCATIONS.map((loc) => (
                  <div key={loc.custodian} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{loc.custodian}</p>
                      <p className="text-xs text-gray-500">{loc.name}</p>
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
