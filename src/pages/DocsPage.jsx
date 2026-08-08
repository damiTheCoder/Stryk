import { useState } from "react";
import {
  BookOpen,
  ScrollText,
  Coins,
  ShoppingCart,
  Repeat,
  ShieldCheck,
  FileSearch,
  Github,
  Code2,
  ExternalLink,
  ChevronRight,
  Shield,
  Key,
  Lock,
  Globe,
  Copy,
  CheckCircle2,
  Hash,
  ArrowUpRight,
  Terminal,
} from "lucide-react";

const MOCK_CONTRACTS = [
  { chain: "Ethereum", address: "0xAbC123...7890", explorer: "#" },
  { chain: "Polygon", address: "0xDeF456...1234", explorer: "#" },
  { chain: "Arbitrum", address: "0xGhI789...5678", explorer: "#" },
];

const MOCK_TOKENOMICS = [
  { label: "Total Supply", value: "1,000,000,000", unit: "$STRYK" },
  { label: "Circulating", value: "420,000,000", unit: "$STRYK" },
  { label: "Vesting / Team", value: "15%", unit: "4yr linear" },
  { label: "Treasury", value: "25%", unit: "DAO governed" },
  { label: "Community & Rewards", value: "35%", unit: "staking + liquidity" },
  { label: "Reserve / Vault", value: "25%", unit: "device backing" },
];

const MOCK_AUDITS = [
  { id: 1, firm: "Certik", date: "2026-06-10", score: "92/100", link: "#", status: "Passed" },
  { id: 2, firm: "Trail of Bits", date: "2026-04-22", score: "A-", link: "#", status: "Passed" },
  { id: 3, firm: "OpenZeppelin", date: "2026-03-15", score: "High", link: "#", status: "Passed" },
];

const MOCK_API_ENDPOINTS = [
  { method: "GET", path: "/v1/vault/status", desc: "Current vault balance and device inventory" },
  { method: "GET", path: "/v1/token/supply", desc: "Circulating supply and backing ratio" },
  { method: "POST", path: "/v1/stake/estimate", desc: "Estimate rewards for a given stake amount" },
  { method: "GET", path: "/v1/redemption/queue", desc: "Current redemption queue and wait times" },
];

const SIDEBAR_SECTIONS = [
  { id: "overview", label: "Protocol Overview", icon: BookOpen },
  { id: "contracts", label: "Contracts", icon: Hash },
  { id: "tokenomics", label: "Tokenomics", icon: Coins },
  { id: "buy", label: "How to Buy", icon: ShoppingCart },
  { id: "stake", label: "How to Stake", icon: Repeat },
  { id: "redeem", label: "How to Redeem", icon: ShieldCheck },
  { id: "audits", label: "Audit Reports", icon: FileSearch },
  { id: "github", label: "GitHub", icon: Github },
  { id: "api", label: "API Docs", icon: Code2 },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64 border-b border-gray-200 bg-gray-50 dark:bg-[#1C1C1C] lg:border-b-0 lg:border-r">
            <div className="p-6">
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Documentation
              </h1>
              <p className="mt-2 text-sm text-gray-500">Protocol, contracts, and integrations.</p>
            </div>
            <nav className="px-4 pb-6 space-y-1">
              {SIDEBAR_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <section.icon className="h-4 w-4 shrink-0" />
                  {section.label}
                  {activeSection === section.id && <ChevronRight className="ml-auto h-4 w-4" />}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-1 p-4 md:p-8 space-y-8">
            {activeSection === "overview" && (
              <section className="uniswap-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Protocol Overview</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Stryk is a decentralized protocol that tokenizes a diversified vault of premium smartphones. Users buy, stake, and redeem $STRYK, which is fully backed by physical devices. The protocol uses Chainlink oracles for pricing, Fireblocks for custody, and on-chain governance for treasury decisions.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl p-4">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Devices Secured</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">12,400+</p>
                  </div>
                  <div className="rounded-2xl p-4">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Backing Ratio</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">1.14x</p>
                  </div>
                  <div className="rounded-2xl p-4">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Chains</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "contracts" && (
              <section className="space-y-6">
                <div className="uniswap-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                      <Hash className="h-5 w-5 text-violet-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">Smart Contract Addresses</h2>
                  </div>
                  <p className="text-gray-600 mb-6">Always verify addresses before interacting. Do not send funds to unknown contracts.</p>
                  <div className="space-y-3">
                    {MOCK_CONTRACTS.map((contract) => (
                      <div key={contract.chain} className="flex flex-col gap-2 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{contract.chain}</p>
                          <p className="mt-1 font-mono text-sm text-gray-500">{contract.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition">
                            <Copy className="h-4 w-4" />
                            Copy
                          </button>
                          <a
                            href={contract.explorer}
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500 transition"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Explorer
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeSection === "tokenomics" && (
              <section className="uniswap-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                    <Coins className="h-5 w-5 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Tokenomics Deep Dive</h2>
                </div>
                <p className="text-gray-600 mb-6">Understanding the $STRYK supply, distribution, and incentive mechanisms.</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {MOCK_TOKENOMICS.map((item) => (
                    <div key={item.label} className="rounded-2xl p-5">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.label}</p>
                      <p className="mt-2 text-2xl font-bold text-gray-900">{item.value}</p>
                      <p className="mt-1 text-sm text-gray-500">{item.unit}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    $STRYK uses an inflationary-deflationary model: new tokens are minted as staking rewards (capped at 2% annual inflation), while tokens are burned on every redemption event. This creates a natural deflationary pressure as more devices are redeemed.
                  </p>
                </div>
              </section>
            )}

            {activeSection === "buy" && (
              <section className="uniswap-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                    <ShoppingCart className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">How to Buy $STRYK</h2>
                </div>
                <ol className="space-y-4 text-gray-600">
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">1</span>
                    <span>Connect your EVM-compatible wallet (MetaMask, Coinbase Wallet, Ledger, etc.).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">2</span>
                    <span>Navigate to the Trade page and select your preferred chain (Ethereum, Polygon, or Arbitrum).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">3</span>
                    <span>Enter the amount of ETH, USDC, or MATIC to swap. Review slippage and fees.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">4</span>
                    <span>Confirm the transaction in your wallet. Tokens arrive in your account within ~30 seconds.</span>
                  </li>
                </ol>
              </section>
            )}

            {activeSection === "stake" && (
              <section className="uniswap-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Repeat className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">How to Stake</h2>
                </div>
                <ol className="space-y-4 text-gray-600">
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">1</span>
                    <span>Ensure you have $STRYK in your connected wallet.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">2</span>
                    <span>Go to the Stake page and enter the amount you wish to stake.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">3</span>
                    <span>Approve the $STRYK token contract (if first time staking).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">4</span>
                    <span>Confirm the stake transaction. Rewards accrue every block and can be claimed anytime.</span>
                  </li>
                </ol>
              </section>
            )}

            {activeSection === "redeem" && (
              <section className="uniswap-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                    <ShieldCheck className="h-5 w-5 text-violet-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">How to Redeem</h2>
                </div>
                <ol className="space-y-4 text-gray-600">
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">1</span>
                    <span>Accumulate 1,000,000 $STRYK in your wallet.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">2</span>
                    <span>Visit the Redeem page and select your preferred device tier.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">3</span>
                    <span>Submit your shipping address for KYC verification.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">4</span>
                    <span>Tokens are burned upon confirmation. Your device ships within 7-14 business days.</span>
                  </li>
                </ol>
              </section>
            )}

            {activeSection === "audits" && (
              <section className="uniswap-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                    <FileSearch className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Audit Reports</h2>
                </div>
                <p className="text-gray-600 mb-6">Security is our top priority. All smart contracts have undergone rigorous third-party audits.</p>
                <div className="space-y-3">
                  {MOCK_AUDITS.map((audit) => (
                    <div key={audit.id} className="flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{audit.firm}</p>
                        <p className="mt-1 text-sm text-gray-500">{new Date(audit.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          {audit.status}
                        </span>
                        <span className="text-sm font-medium text-gray-700">Score: {audit.score}</span>
                        <a href={audit.link} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                          View <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeSection === "github" && (
              <section className="uniswap-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
                    <Github className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">GitHub Repository</h2>
                </div>
                <p className="text-gray-600 mb-6">Explore our open-source smart contracts, SDK, and protocol documentation.</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-800 transition"
                >
                  <Github className="h-5 w-5" />
                  View on GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </section>
            )}

            {activeSection === "api" && (
              <section className="uniswap-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                    <Code2 className="h-5 w-5 text-sky-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">API Documentation</h2>
                </div>
                <p className="text-gray-600 mb-6">Integrate with the Stryk protocol using our REST API. All endpoints require an API key.</p>
                <div className="space-y-3">
                  {MOCK_API_ENDPOINTS.map((endpoint) => (
                    <div key={endpoint.path} className="flex flex-col gap-2 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`rounded-lg px-2 py-1 text-xs font-bold ${
                          endpoint.method === "GET" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="font-mono text-sm text-gray-700">{endpoint.path}</code>
                      </div>
                      <p className="text-sm text-gray-500">{endpoint.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 rounded-xl bg-amber-50 p-4">
                  <Key className="h-5 w-5 text-amber-600 shrink-0" />
                  <p className="text-sm text-amber-800">API keys are available to whitelisted integrators. Contact partnerships@stryk.io for access.</p>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
