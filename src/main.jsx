import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  Boxes,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Gauge,
  Flame,
  Grid3X3,
  Heart,
  LayoutGrid,
  LayoutDashboard,
  Percent,
  Rows3,
  LockKeyhole,
  Mail,
  Menu,
  MoreHorizontal,
  QrCode,
  Search,
  ShieldCheck,
  ShoppingBasket,
  ShoppingBag,
  Star,
  Sparkles,
  Store,
  Tag,
  TicketPercent,
  Truck,
  Trophy,
  User,
  WalletCards,
  Wallet,
  X,
  Home,
  BarChart3,
  Lock,
  FileText,
  BookOpen,
  Newspaper,
  ScrollText,
  Sun,
  Moon,
  ArrowUpRight,
  Repeat,
  ShieldCheck as ShieldCheckIcon,
  Zap,
  Smartphone,
  Globe,
  TrendingUp,
  Lock as LockIcon,
  Key,
  HelpCircle,
  ChevronDown,
  Twitter,
  MessageCircle,
  Send,
  ExternalLink,
  Play,
  Download,
  Award,
  Briefcase,
  Building2,
  Banknote,
  Clock,
  Headphones,
} from "lucide-react";

window.onerror = (message, url, line) => {
  const lower = String(message).toLowerCase();
  if (lower.includes("metamask") || lower.includes("contentscript") || lower.includes("inpage")) return false;
  console.error("Global error:", message, url, line);
  return false;
};

const isExtensionError = (reason) => {
  const str = String(reason).toLowerCase();
  return (
    str.includes("metamask") ||
    str.includes("contentscript") ||
    str.includes("inpage") ||
    str.includes("eventemitter") ||
    str.includes("runtime.lasterror") ||
    str.includes("receiving end does not exist")
  );
};

window.addEventListener("unhandledrejection", (event) => {
  if (isExtensionError(event.reason)) return;
  console.error("Unhandled rejection:", event.reason);
});

import "./styles.css";

import DashboardPage from "./pages/DashboardPage";
import TradePage from "./pages/TradePage";
import StakePage from "./pages/StakePage";
import RedeemPage from "./pages/RedeemPage";
import VaultPage from "./pages/VaultPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AboutPage from "./pages/AboutPage";
import DocsPage from "./pages/DocsPage";
import BlogPage from "./pages/BlogPage";
import LeasePage from "./pages/LeasePage";
import BusinessManagerPage from "./pages/BusinessManagerPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import DisclaimerPage from "./pages/DisclaimerPage";

const products = [
  { id: "iphone17promax", name: "iPhone 17 Pro Max", vendor: "Apple Direct", category: "Phones", price: 1399, subscriberPrice: 1249, hunt: "Tuesday 7:00 PM", art: "phone", image: "/M1.png", reward: 99 },
  { id: "iphone17pro", name: "iPhone 17 Pro", vendor: "Apple Direct", category: "Phones", price: 1299, subscriberPrice: 1149, hunt: "Wednesday 8:00 PM", art: "phone", image: "/M1.png", reward: 95 },
  { id: "iphone17", name: "iPhone 17", vendor: "Apple Direct", category: "Phones", price: 1099, subscriberPrice: 979, hunt: "Thursday 9:00 PM", art: "phone", image: "/M1.png", reward: 90 },
  { id: "iphone16promax", name: "iPhone 16 Pro Max", vendor: "Apple Direct", category: "Phones", price: 1299, subscriberPrice: 1149, hunt: "Friday 7:00 PM", art: "phone", image: "/M2.png", reward: 99 },
  { id: "iphone16pro", name: "iPhone 16 Pro", vendor: "Apple Direct", category: "Phones", price: 1199, subscriberPrice: 1079, hunt: "Saturday 8:00 PM", art: "phone", image: "/M2.png", reward: 95 },
  { id: "iphone16", name: "iPhone 16", vendor: "Apple Direct", category: "Phones", price: 999, subscriberPrice: 899, hunt: "Monday 9:00 PM", art: "phone", image: "/M2.png", reward: 90 },
  { id: "iphone15promax", name: "iPhone 15 Pro Max", vendor: "Apple Direct", category: "Phones", price: 1199, subscriberPrice: 1079, hunt: "Tuesday 8:00 PM", art: "phone", image: "/M3.png", reward: 95 },
  { id: "iphone15pro", name: "iPhone 15 Pro", vendor: "Apple Direct", category: "Phones", price: 1099, subscriberPrice: 979, hunt: "Wednesday 9:00 PM", art: "phone", image: "/M3.png", reward: 90 },
  { id: "iphone15", name: "iPhone 15", vendor: "Apple Direct", category: "Phones", price: 899, subscriberPrice: 799, hunt: "Thursday 8:00 PM", art: "phone", image: "/M3.png", reward: 85 },
  { id: "iphone14promax", name: "iPhone 14 Pro Max", vendor: "Apple Direct", category: "Phones", price: 999, subscriberPrice: 899, hunt: "Friday 9:00 PM", art: "phone", image: "/M4.png", reward: 90 },
  { id: "iphone14pro", name: "iPhone 14 Pro", vendor: "Apple Direct", category: "Phones", price: 899, subscriberPrice: 799, hunt: "Saturday 9:00 PM", art: "phone", image: "/M4.png", reward: 85 },
  { id: "iphone14", name: "iPhone 14", vendor: "Apple Direct", category: "Phones", price: 799, subscriberPrice: 699, hunt: "Monday 8:00 PM", art: "phone", image: "/M4.png", reward: 80 },
];

const hunts = [
  { id: "iphone17promax", product: "iPhone 17 Pro Max", vendor: "Apple Direct", time: "Live today", format: "Skill-based challenge", tags: 1000, rewards: 10, standard: 10, subscriber: 1, reveals: 6, freeEntry: true, state: "live" },
  { id: "iphone17pro", product: "iPhone 17 Pro", vendor: "Apple Direct", time: "Saturday 11:00 AM", format: "Guaranteed-reward hunt", tags: 1200, rewards: 12, standard: 12, subscriber: 0.6, reveals: 6, freeEntry: true, state: "scheduled" },
  { id: "iphone17", product: "iPhone 17", vendor: "Apple Direct", time: "Sunday 2:00 PM", format: "Free-entry prize hunt", tags: 800, rewards: 8, standard: 0, subscriber: 0, reveals: 5, freeEntry: true, state: "review" },
];

const vendors = [
  { name: "Apple Direct", handle: "@appledirect", score: "99.9%", plan: "$0/mo", discount: "100%", focus: "iPhone 14–17 trade-ins and new stock", color: "blue", subscribers: 15000, followers: 50000, following: 50, since: "2024", cover: "Official Apple reseller. All iPhone models 14–17" },
  { name: "STRYK Certified", handle: "@stryk", score: "99.5%", plan: "$5/mo", discount: "95%", focus: "Certified pre-owned iPhones 14–17", color: "green", subscribers: 8500, followers: 22000, following: 120, since: "2025", cover: "Grade-A certified iPhones with warranty" },
];

const tabs = [
  ["shop", ShoppingBasket, "Shop"],
  ["vendors", Store, "Vendors"],
  ["locker", TicketPercent, "Tags"],
  ["more", Grid3X3, "More"],
];

function App() {
  const [route, setRoute] = useState("landing");
  console.log("App render, route:", route);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedVendor, setSelectedVendor] = useState(vendors[0]);
  const [cart, setCart] = useState([]);
  const [subscriptions, setSubscriptions] = useState(["Apple Direct"]);
  const [tags, setTags] = useState([
    { id: "HG-TAG-8841", hunt: "iPhone 17 Pro Max", status: "Eligible", type: "Subscriber paid tag", reveals: 6 },
    { id: "FREE-2209", hunt: "iPhone 17 Pro", status: "Scheduled", type: "Free alternative entry", reveals: 5 },
  ]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    const main = document.querySelector("main");
    if (main) {
      main.classList.remove("visible");
      void main.offsetWidth;
      setTimeout(() => main.classList.add("visible"), 50);
    }
  }, [darkMode, route]);

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-drop-in");
    elements.forEach((el) => el.classList.remove("visible"));
    const main = document.querySelector("main");
    if (main) {
      main.classList.remove("visible");
      void main.offsetWidth;
      requestAnimationFrame(() => main.classList.add("visible"));
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.style.getPropertyValue("--i") || "0", 10) * 100;
            setTimeout(() => entry.target.classList.add("visible"), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const delay = parseInt(el.style.getPropertyValue("--i") || "0", 10) * 100;
        setTimeout(() => el.classList.add("visible"), 300 + delay);
      } else {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [route]);

  function go(next) {
    setRoute(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  const context = { route, go, selectedProduct, setSelectedProduct, selectedVendor, setSelectedVendor, cart, setCart, subscriptions, setSubscriptions, tags, setTags, notify };

  return (
    <>
      <Shell route={route} go={go} cart={cart} tags={tags} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className={route === "landing" ? "landing-main animate-page-enter stagger" : "app-main animate-page-enter stagger"}>
        {route === "landing" && <LandingPage go={go} darkMode={darkMode} setDarkMode={setDarkMode} />}
        {route === "dashboard" && <DashboardPage go={go} />}
  {route === "trade" && <TradePage />}
  {route === "stake" && <StakePage />}
  {route === "lease" && <LeasePage />}
  {route === "business" && <BusinessManagerPage />}
  {route === "redeem" && <RedeemPage />}
        {route === "vault" && <VaultPage />}
        {route === "analytics" && <AnalyticsPage />}
        {route === "about" && <AboutPage />}
        {route === "docs" && <DocsPage />}
        {route === "blog" && <BlogPage />}
        {route === "terms" && <TermsPage />}
        {route === "privacy" && <PrivacyPage />}
        {route === "disclaimer" && <DisclaimerPage />}
      </main>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

function Shell({ route, go, cart, tags, darkMode, setDarkMode }) {
  console.log("Shell render, route:", route);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dappRoutes = [
    ["dashboard", LayoutDashboard, "Dashboard"],
    ["trade", Smartphone, "Trade-In"],
    ["stake", WalletCards, "Savings"],
    ["lease", Key, "Lease"],
    ["redeem", ShoppingBag, "Upgrade"],
    ["vault", Boxes, "Vault"],
    ["analytics", Flame, "Analytics"],
    ["about", User, "About"],
    ["docs", BookOpen, "Docs"],
    ["blog", Newspaper, "Blog"],
  ];

  return (
    <>
      {route !== "landing" && (
        <>
          <div className="header-banner">
            <img src="/banner 2.png" alt="" className="header-banner-img" />
            <div className="header-banner-shade" />
          </div>
          <header className="topbar">
            <button className="brand reset" onClick={() => go("landing")}>
              <img className="brand-logo" src="/Logo.jpeg" alt="" />
              <span>Stryk</span>
            </button>
            <nav className="desktop-nav">
              {dappRoutes.map(([name, Icon, label]) => (
                <button key={name} className={route === name ? "active reset" : "reset"} onClick={() => go(name)}>
                  {label}
                </button>
              ))}
            </nav>
            <div className="nav-actions">
              <button className="icon-button" aria-label="Toggle theme" onClick={() => setDarkMode((prev) => !prev)}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="icon-button" aria-label="Search">
                <Search size={20} />
              </button>
              <button className="icon-button" aria-label="More" onClick={() => setMobileOpen((v) => !v)}>
                <MoreHorizontal size={20} />
              </button>
               <button className="primary" onClick={() => alert("Connect wallet coming soon")}>Connect</button>
            </div>
            <button className="mobile-search-button reset" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
              {mobileOpen ? <X size={21} strokeWidth={2.4} /> : <MoreHorizontal size={21} strokeWidth={2.4} />}
            </button>
            {mobileOpen && (
              <div className="mobile-menu">
                {dappRoutes.map(([name, Icon, label]) => (
                  <button key={name} className={route === name ? "active reset" : "reset"} onClick={() => { go(name); setMobileOpen(false); }}>
                    {label}
                  </button>
                ))}
                <button className="reset inline-flex items-center gap-2" onClick={() => { go("business"); setMobileOpen(false); }}>
                  <Briefcase className="h-4 w-4" />
                  Business Manager
                </button>
                <div className="mobile-wallet">
                  <button className="primary" onClick={() => alert("Connect wallet coming soon")}>Connect Wallet</button>
                </div>
              </div>
            )}
          </header>
        </>
      )}
    </>
  );
}

function LandingPage({ go, darkMode, setDarkMode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const words = ["upgrade", "trade-in", "lease", "save"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: "Instant", label: "USDC payouts" },
    { value: "Fair pricing", label: "Live market rates" },
    { value: "Lease", label: "Flexible device leasing" },
    { value: "No fees", label: "Transparent pricing" },
  ];

  const products = [
    { icon: Smartphone, title: "Trade-In", desc: "Send in your old device and get an instant USDC payout. We price it live every day—no haggling, no lowball offers.", image: "/M1.png", color: "#1a5fff" },
    { icon: Key, title: "Lease", desc: "Apply for a device lease with flexible terms. Keep your cash, pay over time, and upgrade whenever you want.", image: "/M2.png", color: "#16a34a" },
    { icon: Wallet, title: "Savings", desc: "Save USDC weekly into your upgrade fund. Earn boost bonuses and reach your next device faster.", image: "/M3.png", color: "#7b3ff2" },
    { icon: Truck, title: "Fulfillment", desc: "Your new device ships within 3-5 business days. Track every step from trade-in to delivery.", image: "/M4.png", color: "#c98208" },
  ];

  const features = [
    { icon: ShieldCheckIcon, title: "Fair market pricing", desc: "Every device is priced using live market data. No hidden fees, no lowball offers." },
    { icon: Globe, title: "Instant USDC payouts", desc: "Get paid in stablecoins within 24-48 hours after quality control verification." },
    { icon: TrendingUp, title: "Upgrade savings", desc: "Save USDC weekly and earn boost bonuses toward your next device." },
    { icon: CheckCircle2, title: "Quality guaranteed", desc: "Every device is inspected, graded, and tested before being resold." },
  ];

  const faqs = [
    { q: "How does trade-in work?", a: "Select your device, get an instant quote, ship it to us using a free prepaid label, and receive USDC within 24-48 hours after quality control." },
    { q: "How is the trade-in value determined?", a: "We use live market pricing from multiple sources to ensure you get a fair, transparent price for your device. No haggling required." },
    { q: "How does leasing work?", a: "Apply for a device lease with flexible terms. Keep your cash, pay over time, and upgrade whenever you want. Early payoff options available." },
    { q: "Can I upgrade to a new device?", a: "Yes. Trade in your old device, apply the payout toward a new device, and we'll ship it to you within 3-5 business days." },
    { q: "What if my device doesn't match the quote?", a: "If the condition differs from your initial assessment, we'll provide a revised quote. You can accept or have your device returned for free." },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="landing-nav-bar">
        <div className="landing-container landing-nav-inner">
          <button className="landing-logo reset" onClick={() => go("landing")} aria-label="Stryk home">
            <img src="/Logo.jpeg" alt="" className="landing-logo-img" />
            <span>Stryk</span>
          </button>
          <div className={`landing-nav-links ${mobileNavOpen ? "open" : ""}`}>
            <button className="landing-nav-link" onClick={() => go("dashboard")}>Products</button>
            <button className="landing-nav-link" onClick={() => go("dashboard")}>Markets</button>
            <button className="landing-nav-link" onClick={() => go("about")}>About</button>
            <button className="landing-nav-link" onClick={() => go("docs")}>Docs</button>
          </div>
          <div className="landing-nav-actions">
            <button className="icon-button" aria-label="Toggle theme" onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="landing-nav-cta" onClick={() => go("dashboard")}>Launch App</button>
            <button className="landing-mobile-toggle" onClick={() => setMobileNavOpen((v) => !v)} aria-label="Menu">
              {mobileNavOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero animate-drop-in animate-page-enter" style={{ "--i": 0 }}>
        <div className="landing-container landing-hero-content">
          <h1 className="landing-hero-title">
            Real devices.<br />
            Real <span className="landing-word-bg">{words[wordIndex]}</span>.
          </h1>
          <p className="landing-hero-subtitle">
            Apply for a lease, trade in your device, and get paid in stablecoins. Upgrade when you're ready.
          </p>
          <div className="landing-hero-actions">
            <button className="landing-btn-primary" onClick={() => go("dashboard")}>
              Continue <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="landing-hero-stats">
            {stats.slice(0, 2).map((s) => (
              <div key={s.label} className="landing-hero-stat">
                <span className="landing-hero-stat-value">{s.value}</span>
                <span className="landing-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Hero Image */}
      <section className="landing-section landing-hero-image-section animate-drop-in" style={{ "--i": 1 }}>
        <div className="landing-container">
          <div className="landing-hero-image-wrapper">
            <div className="landing-hero-iphone-mockup">
              <img src="/L1.png" alt="Memoji" className="landing-hero-memoji" />
              <div className="landing-hero-iphone-screen">
                <img src="/yzz.jpeg" alt="STRYK" className="landing-hero-image landing-hero-image-mobile" />
              </div>
              <div className="landing-hero-iphone-dynamic-island" />
              <div className="landing-hero-iphone-btn landing-hero-iphone-btn-volume-up" />
              <div className="landing-hero-iphone-btn landing-hero-iphone-btn-volume-down" />
              <div className="landing-hero-iphone-btn landing-hero-iphone-btn-mute" />
              <div className="landing-hero-iphone-btn landing-hero-iphone-btn-power" />
            </div>
            <div className="landing-hero-macbook-mockup">
              <div className="landing-hero-macbook-screen">
                <img src="/yz.png" alt="STRYK" className="landing-hero-image landing-hero-image-desktop" />
                <div className="landing-hero-macbook-notch" />
                <img src="/L1.png" alt="Memoji" className="landing-hero-memoji" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Sections */}
      {products.map((p, idx) => (
        <section key={p.title} className={`landing-section ${idx % 2 === 1 ? "landing-product-reverse" : ""} animate-drop-in`} style={{ "--i": idx + 2 }}>
          <div className="landing-container">
            <div className="landing-products">
              <div className="landing-products-text">
                <h2 className="landing-section-title" style={{ color: p.color }}>{p.title}</h2>
                <p className="landing-section-subtitle">{p.desc}</p>
                <div className="landing-products-actions">
                  <button className="landing-btn-primary" onClick={() => go("dashboard")}>
                    Explore <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
              <div className="landing-products-visual">
                <img src={p.image} alt={p.title} className="landing-products-img" />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Security */}
      <section className="landing-section landing-security-section animate-drop-in" style={{ "--i": 6 }}>
        <div className="landing-container">
          <div className="landing-security-grid">
            <div>
              <h2 className="landing-section-title">Trusted recommerce platform</h2>
              <p className="landing-section-subtitle">Every trade-in is verified, every payout is instant, and every upgrade is backed by our 99.2% fulfillment rate. Fair pricing, transparent process.</p>
              <div className="landing-security-list">
                {[
                  { icon: ShieldCheckIcon, title: "Live market pricing", desc: "Device values are updated in real time from multiple market sources to ensure fair, competitive offers." },
                  { icon: CheckCircle2, title: "Instant USDC payouts", desc: "Receive your payout in stablecoins within 24-48 hours after quality control verification." },
                  { icon: Truck, title: "Fast fulfillment", desc: "Upgraded devices ship within 3-5 business days with full tracking and insurance." },
                ].map((item) => (
                  <div key={item.title} className="landing-security-item">
                    <item.icon size={20} strokeWidth={1.8} />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="landing-security-actions">
                <button className="landing-btn-primary" onClick={() => go("about")}>
                  Learn more <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
            <div className="landing-security-visual">
              <div className="landing-security-card">
                <CheckCircle2 size={48} strokeWidth={1.2} />
                <p className="landing-security-card-title">Devices traded in</p>
                <p className="landing-security-card-value">12.4K+</p>
                <p className="landing-security-card-label">And counting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="landing-section animate-drop-in" style={{ "--i": 7 }}>
        <div className="landing-container">
          <div className="landing-section-header">
            <h2 className="landing-section-title">Frequently asked questions</h2>
            <p className="landing-section-subtitle">Everything you need to know about STRYK before you get started.</p>
          </div>
          <div className="landing-faq">
            {faqs.map((item, idx) => (
              <div key={item.q} className={`landing-faq-item ${activeFaq === idx ? "open" : ""}`}>
                <button className="landing-faq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                  <span>{item.q}</span>
                  <ChevronDown size={20} strokeWidth={2} className={`landing-faq-icon ${activeFaq === idx ? "rotated" : ""}`} />
                </button>
                <div className="landing-faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-section landing-cta-section animate-drop-in" style={{ "--i": 8 }}>
        <div className="landing-container">
          <div className="landing-cta-card">
            <h2 className="landing-cta-title">Ready to upgrade your device?</h2>
            <p className="landing-cta-subtitle">Apply for a lease, trade in your old device, get paid in USDC, and upgrade to the latest model—all in one place.</p>
            <div className="landing-cta-actions">
              <button className="landing-btn-primary" onClick={() => go("dashboard")}>
                Get Started <ArrowUpRight size={18} />
              </button>
              <button className="landing-btn-secondary" onClick={() => go("lease")}>
                Apply for Lease
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer-grid">
            <div>
              <button className="landing-logo reset" onClick={() => go("landing")} aria-label="Stryk home">
                <img src="/Logo.jpeg" alt="" className="landing-logo-img" />
                <span>Stryk</span>
              </button>
              <p className="landing-footer-desc">Real devices. Real yield. Real tokens.</p>
            </div>
            <div>
              <h4 className="landing-footer-heading">Products</h4>
              <div className="landing-footer-links">
                <button onClick={() => go("trade")}>Trade</button>
                <button onClick={() => go("stake")}>Stake</button>
                <button onClick={() => go("vault")}>Vault</button>
                <button onClick={() => go("redeem")}>Redeem</button>
              </div>
            </div>
            <div>
              <h4 className="landing-footer-heading">Company</h4>
              <div className="landing-footer-links">
                <button onClick={() => go("about")}>About</button>
                <button onClick={() => go("docs")}>Docs</button>
                <button onClick={() => go("blog")}>Blog</button>
                <button onClick={() => go("terms")}>Terms</button>
              </div>
            </div>
            <div>
              <h4 className="landing-footer-heading">Legal</h4>
              <div className="landing-footer-links">
                <button onClick={() => go("privacy")}>Privacy Policy</button>
                <button onClick={() => go("disclaimer")}>Disclaimer</button>
              </div>
            </div>
          </div>
          <div className="landing-footer-bottom">
            <p>&copy; 2026 Stryk. All rights reserved.</p>
            <p className="landing-footer-risk">Trading derivatives carries risk. Past performance does not guarantee future results.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

try {
  createRoot(document.getElementById("root")).render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
  document.getElementById("root").innerHTML = `<pre style="color:red;padding:20px;">${error.message}\n${error.stack}</pre>`;
}
