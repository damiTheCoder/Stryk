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
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import DisclaimerPage from "./pages/DisclaimerPage";

const products = [
  { id: "astra", name: "Astra X1 Pro", vendor: "NovaCircuit", category: "Phones", price: 1499, subscriberPrice: 1349, hunt: "Tuesday 7:00 PM", art: "phone", image: "/products/phone.jpg", reward: 99 },
  { id: "helio", name: "HelioBook 16", vendor: "OrbitWare", category: "Laptops", price: 2299, subscriberPrice: 2069, hunt: "Saturday 11:00 AM", art: "laptop", image: "/products/laptop.jpg", reward: 99 },
  { id: "arcade", name: "Arcade One S", vendor: "PixelVault", category: "Gaming", price: 699, subscriberPrice: 629, hunt: "Thursday 8:30 PM", art: "console", image: "/products/console.jpg", reward: 95 },
  { id: "studio", name: "StudioPods Max", vendor: "SoundForge", category: "Audio", price: 549, subscriberPrice: 499, hunt: "No active hunt", art: "audio", image: "/products/audio.jpg", reward: 20 },
  { id: "watch", name: "Lumina Watch", vendor: "NovaCircuit", category: "Wearables", price: 429, subscriberPrice: 389, hunt: "Monday 6:00 PM", art: "watch", image: "/products/watch.jpg", reward: 80 },
  { id: "cine", name: "CineView 65", vendor: "HomeSignal", category: "Televisions", price: 1899, subscriberPrice: 1709, hunt: "Sunday 2:00 PM", art: "tv", image: "/products/tv.jpg", reward: 99 },
];

const hunts = [
  { id: "astra", product: "Astra X1 Pro", vendor: "NovaCircuit", time: "Live today", format: "Skill-based challenge", tags: 1000, rewards: 10, standard: 10, subscriber: 1, reveals: 6, freeEntry: true, state: "live" },
  { id: "helio", product: "HelioBook 16", vendor: "OrbitWare", time: "Saturday 11:00 AM", format: "Guaranteed-reward hunt", tags: 1200, rewards: 12, standard: 12, subscriber: 0.6, reveals: 6, freeEntry: true, state: "scheduled" },
  { id: "cine", product: "CineView 65", vendor: "HomeSignal", time: "Sunday 2:00 PM", format: "Free-entry prize hunt", tags: 800, rewards: 8, standard: 0, subscriber: 0, reveals: 5, freeEntry: true, state: "review" },
];

const vendors = [
  { name: "NovaCircuit", handle: "@novacircuit", score: "98.7%", plan: "$6/mo", discount: "90%", focus: "Flagship phones, tablets, smartwatches", color: "blue", subscribers: 8421, followers: 18420, following: 312, since: "2024", cover: "Linear devices, launch-day stock, fast replacements" },
  { name: "OrbitWare", handle: "@orbitware", score: "99.1%", plan: "$9/mo", discount: "95%", focus: "Creator laptops, displays, workstation gear", color: "green", subscribers: 6210, followers: 12880, following: 205, since: "2023", cover: "Creator machines and calibrated display bundles" },
  { name: "PixelVault", handle: "@pixelvault", score: "97.9%", plan: "$5/mo", discount: "90%", focus: "Gaming consoles, controllers, accessories", color: "violet", subscribers: 4390, followers: 9310, following: 184, since: "2025", cover: "Console drops, accessories, and guaranteed-reward hunts" },
  { name: "HomeSignal", handle: "@homesignal", score: "98.2%", plan: "$7/mo", discount: "92%", focus: "TVs, projectors, home cinema kits", color: "amber", subscribers: 3184, followers: 7420, following: 166, since: "2024", cover: "Living-room displays and installation-ready bundles" },
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
  const [subscriptions, setSubscriptions] = useState(["NovaCircuit"]);
  const [tags, setTags] = useState([
    { id: "HG-TAG-8841", hunt: "Astra X1 Pro", status: "Eligible", type: "Subscriber paid tag", reveals: 6 },
    { id: "FREE-2209", hunt: "CineView 65", status: "Scheduled", type: "Free alternative entry", reveals: 5 },
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
        {route === "dashboard" && <DashboardPage />}
        {route === "trade" && <TradePage />}
        {route === "stake" && <StakePage />}
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
              <button className="landing-btn-secondary" onClick={() => go("trade")}>
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
