import { useState } from "react";
import {
  Target,
  Users,
  GraduationCap,
  Handshake,
  Newspaper,
  HelpCircle,
  Linkedin,
  Twitter,
  ChevronDown,
  Shield,
  Wallet,
  BookOpen,
  Coins,
  ArrowRight,
  ExternalLink,
  FileText,
  Code2,
  Key,
  Lock,
  CheckCircle2,
  Globe,
  Mail,
  Calendar,
  Tag,
  TrendingUp,
  Lightbulb,
  Megaphone,
} from "lucide-react";

const MOCK_TEAM = [
  {
    id: 1,
    name: "Alex Mercer",
    role: "Founder & CEO",
    bio: "Serial entrepreneur with 10+ years in fintech and blockchain.",
    photo: "https://i.pravatar.cc/150?u=alex",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "CTO",
    bio: "Smart contract auditor and DeFi protocol architect.",
    photo: "https://i.pravatar.cc/150?u=sarah",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 3,
    name: "Marcus Webb",
    role: "Head of Partnerships",
    bio: "Former enterprise sales lead, now bridging Web2 and Web3.",
    photo: "https://i.pravatar.cc/150?u=marcus",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 4,
    name: "Priya Kapoor",
    role: "Lead Designer",
    bio: "UX designer focused on consumer crypto products.",
    photo: "https://i.pravatar.cc/150?u=priya",
    linkedin: "#",
    twitter: "#",
  },
];

const MOCK_ADVISORS = [
  {
    id: 1,
    name: "Dr. James Okoro",
    role: "Blockchain Economics",
    org: "MIT Digital Currency Initiative",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "Regulatory Strategy",
    org: "Former SEC counsel",
    linkedin: "#",
  },
  {
    id: 3,
    name: "David Kim",
    role: "Cybersecurity",
    org: "CISA, former CISO",
    linkedin: "#",
  },
];

const MOCK_PARTNERS = [
  { id: 1, name: "ChainLink Labs", logo: "🔗" },
  { id: 2, name: "Polygon", logo: "💜" },
  { id: 3, name: "Fireblocks", logo: "🔥" },
  { id: 4, name: "OpenSea", logo: "🌊" },
];

const MOCK_PRESS = [
  { id: 1, outlet: "CoinDesk", title: "$STRYK Raises $25M to Tokenize Smartphone Vaults", date: "2026-07-15", link: "#" },
  { id: 2, outlet: "The Block", title: "Inside Stryk: The Startup Making Phones Liquid Assets", date: "2026-06-22", link: "#" },
  { id: 3, outlet: "Decrypt", title: "How Tokenized Vaults Are Reshaping Consumer Finance", date: "2026-05-10", link: "#" },
  { id: 4, outlet: "Bloomberg Crypto", title: "Crypto Startups Bet Big on Physical Assets", date: "2026-04-28", link: "#" },
];

const FAQ_ITEMS = [
  {
    id: "what-is",
    question: "What is $STRYK?",
    answer:
      "$STRYK is a utility token that represents fractional ownership in a vault of high-end smartphones. Holders earn yield from device resale, leasing, and redemption events. The token is backed 1:1 by verified devices stored in insured, monitored vaults.",
  },
  {
    id: "how-to-redeem",
    question: "How do I redeem a phone?",
    answer:
      "Accumulate 1,000,000 $STRYK tokens in your wallet. Once you hit the threshold, navigate to the Redeem page and request a device. The team verifies your balance, prepares the device, and ships it to your verified address within 7-14 business days.",
  },
  {
    id: "price-drop",
    question: "What happens if the phone price drops?",
    answer:
      "The vault is rebalanced monthly. If device values decline, yield from other sources (leasing, lending against collateral) subsidizes the shortfall. A reserve fund covers extreme drops, and token holders vote on major adjustments through governance.",
  },
  {
    id: "vault-insured",
    question: "Is the vault insured?",
    answer:
      "Yes. Every device in the vault is insured against loss, theft, and damage through our partnership with Fireblocks and leading underwriters. Audit reports are published quarterly and insurance certificates are available on request.",
  },
  {
    id: "backed",
    question: "How is the token backed?",
    answer:
      "Each $STRYK is backed by a pro-rata claim on vault assets. The backing ratio is published daily on our protocol dashboard. We maintain a minimum 1.1x backing ratio, meaning the vault holds at least 10% more in asset value than outstanding tokens.",
  },
  {
    id: "wallets",
    question: "What wallets are supported?",
    answer:
      "We support MetaMask, Coinbase Wallet, WalletConnect, Ledger, and Trezor. Any EVM-compatible wallet works for buying and staking. For redemption, we require a verified address tied to your identity for shipping and compliance.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">About Stryk</h1>
          <p className="mt-2 text-gray-500">The protocol tokenizing the world's most desired devices.</p>
        </header>

        <section className="uniswap-card">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
              <Target className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
              <p className="mt-2 max-w-3xl text-gray-600 leading-relaxed">
                Stryk bridges physical and digital value by turning premium smartphones into productive, on-chain assets. We believe everyone should have transparent access to yield-bearing real-world assets — no middlemen, no black boxes.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-gray-900" />
            <h2 className="text-xl font-semibold text-gray-900">Team</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_TEAM.map((member) => (
              <div key={member.id} className="uniswap-card text-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-gray-50"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                <p className="mt-2 text-sm text-gray-500">{member.bio}</p>
                <div className="mt-4 flex justify-center gap-3">
                  <a href={member.linkedin} className="text-gray-400 hover:text-blue-600 transition">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.twitter} className="text-gray-400 hover:text-sky-500 transition">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="h-5 w-5 text-gray-900" />
            <h2 className="text-xl font-semibold text-gray-900">Advisors</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {MOCK_ADVISORS.map((advisor) => (
              <div key={advisor.id} className="uniswap-card">
                <h3 className="text-lg font-semibold text-gray-900">{advisor.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{advisor.role}</p>
                <p className="mt-1 text-sm text-gray-500">{advisor.org}</p>
                <a href={advisor.linkedin} className="mt-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Handshake className="h-5 w-5 text-gray-900" />
            <h2 className="text-xl font-semibold text-gray-900">Partners & Backers</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {MOCK_PARTNERS.map((partner) => (
              <div key={partner.id} className="uniswap-card flex flex-col items-center justify-center gap-2 hover:shadow-md transition">
                <span className="text-4xl">{partner.logo}</span>
                <span className="text-sm font-semibold text-gray-900">{partner.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="h-5 w-5 text-gray-900" />
            <h2 className="text-xl font-semibold text-gray-900">Press & Media</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {MOCK_PRESS.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="uniswap-card hover:shadow-md transition block"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-blue-600">{item.outlet}</p>
                    <h3 className="mt-1 text-base font-medium text-gray-900 leading-snug">{item.title}</h3>
                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-gray-400" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-5 w-5 text-gray-900" />
            <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <div key={item.id} className="uniswap-card overflow-hidden">
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-semibold text-gray-900">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
                      openFaq === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === item.id && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
