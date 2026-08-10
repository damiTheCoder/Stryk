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
} from "lucide-react";

window.onerror = (message, url, line) => {
  console.error("Global error:", message, url, line);
  return false;
};

window.addEventListener("unhandledrejection", (event) => {
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
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedVendor, setSelectedVendor] = useState(vendors[0]);
  const [cart, setCart] = useState([]);
  const [subscriptions, setSubscriptions] = useState(["NovaCircuit"]);
  const [tags, setTags] = useState([
    { id: "HG-TAG-8841", hunt: "Astra X1 Pro", status: "Eligible", type: "Subscriber paid tag", reveals: 6 },
    { id: "FREE-2209", hunt: "CineView 65", status: "Scheduled", type: "Free alternative entry", reveals: 5 },
  ]);
  const [toast, setToast] = useState("");

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
      <Shell route={route} go={go} cart={cart} tags={tags} />
      <main className={route === "landing" ? "landing-main" : "app-main"}>
        {route === "landing" && <LandingPage go={go} />}
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

function Shell({ route, go, cart, tags }) {
  console.log("Shell render, route:", route);
  if (route === "landing") return null;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  const dappRoutes = [
    ["dashboard", LayoutDashboard, "Dashboard"],
    ["trade", BarChart3, "Trade"],
    ["stake", Lock, "Stake"],
    ["redeem", TicketPercent, "Redeem"],
    ["vault", Boxes, "Vault"],
    ["analytics", Flame, "Analytics"],
    ["about", User, "About"],
    ["docs", BookOpen, "Docs"],
    ["blog", Newspaper, "Blog"],
  ];

  return (
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
  );
}

function LandingPage({ go }) {
  console.log("LandingPage render");
  return (
    <section className="landing-screen">
      <div className="landing-bg" />
      <div className="landing-shade" />
      <nav className="landing-nav" aria-label="Stryk landing navigation">
        <button className="landing-nav-logo reset" onClick={() => go("landing")} aria-label="Stryk landing">
          <img src="/Logo.jpeg" alt="" />
          <span>Stryk</span>
        </button>
      </nav>
      <div className="landing-content">
        <h1>
          Real devices.
          <br />
          Real yield.
          <br />
          <span className="landing-hero-accent">Real tokens.</span>
        </h1>
        <p>STRYK turns premium electronics into on-chain positions you can trade, stake, and redeem—backed by real hardware, not promises.</p>
        <div className="landing-actions">
          <button className="landing-primary" onClick={() => go("dashboard")}><Mail size={20} /> Join the Waitlist</button>
          <button className="landing-secondary" onClick={() => go("docs")}><QrCode size={20} /> Read the Litepaper</button>
        </div>
        <p className="landing-terms">By continuing you accept Stryk's <button onClick={() => go("terms")}>Terms</button> and <button onClick={() => go("privacy")}>Privacy Policy</button>.</p>
      </div>
    </section>
  );
}

try {
  createRoot(document.getElementById("root")).render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
  document.getElementById("root").innerHTML = `<pre style="color:red;padding:20px;">${error.message}\n${error.stack}</pre>`;
}
