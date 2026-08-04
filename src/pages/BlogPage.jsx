import { useState } from "react";
import {
  Newspaper,
  Megaphone,
  TrendingUp,
  Lightbulb,
  Calendar,
  Clock,
  ArrowRight,
  Mail,
  CheckCircle2,
  Tag,
  User,
  Eye,
} from "lucide-react";

const CATEGORIES = ["All", "Announcements", "Updates", "Education"];

const MOCK_POSTS = [
  {
    id: 1,
    category: "Announcements",
    title: "Stryk V2 Mainnet Launch: What's New",
    excerpt: "We're live on Ethereum, Polygon, and Arbitrum with improved backing ratios and lower gas fees.",
    author: "Alex Mercer",
    date: "2026-08-01",
    readTime: "4 min",
    views: "12.4K",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop",
  },
  {
    id: 2,
    category: "Updates",
    title: "July Redemption Report: 1,200 Phones Shipped",
    excerpt: "A record-breaking month for redemptions. Here's a breakdown of devices shipped and vault metrics.",
    author: "Sarah Chen",
    date: "2026-07-28",
    readTime: "3 min",
    views: "8.7K",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&h=300&fit=crop",
  },
  {
    id: 3,
    category: "Education",
    title: "Tokenized Real-World Assets: A Beginner's Guide",
    excerpt: "Learn how RWAs work, why smartphones make great candidates, and what risks to consider.",
    author: "Priya Kapoor",
    date: "2026-07-20",
    readTime: "7 min",
    views: "23.1K",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=600&h=300&fit=crop",
  },
  {
    id: 4,
    category: "Announcements",
    title: "New Partnership with Fireblocks for Institutional Custody",
    excerpt: "Stryk partners with Fireblocks to offer enterprise-grade custody solutions for high-net-worth token holders.",
    author: "Marcus Webb",
    date: "2026-07-12",
    readTime: "3 min",
    views: "6.2K",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&h=300&fit=crop",
  },
  {
    id: 5,
    category: "Updates",
    title: "Staking Rewards Increase to 14.2% APR",
    excerpt: "Thanks to improved vault yield, we've raised the base staking APR. Here's how it affects you.",
    author: "Alex Mercer",
    date: "2026-07-05",
    readTime: "2 min",
    views: "15.8K",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=600&h=300&fit=crop",
  },
  {
    id: 6,
    category: "Education",
    title: "Understanding Backing Ratios: Why 1.1x Matters",
    excerpt: "A deep dive into how we calculate and maintain the protocol's backing ratio, and what it means for token holders.",
    author: "Sarah Chen",
    date: "2026-06-28",
    readTime: "5 min",
    views: "9.3K",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
  },
];

const CATEGORY_ICONS = {
  Announcements: Megaphone,
  Updates: TrendingUp,
  Education: Lightbulb,
};

const CATEGORY_COLORS = {
  Announcements: "bg-violet-50 text-violet-700 ring-violet-200",
  Updates: "bg-blue-50 text-blue-700 ring-blue-200",
  Education: "bg-amber-50 text-amber-700 ring-amber-200",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = activeCategory === "All"
    ? MOCK_POSTS
    : MOCK_POSTS.filter((post) => post.category === activeCategory);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
            <p className="mt-2 text-gray-500">Announcements, product updates, and Web3 education.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === cat
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            const Icon = CATEGORY_ICONS[post.category];
            const colorClass = CATEGORY_COLORS[post.category];
            return (
              <article key={post.id} className="flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden hover:shadow-md transition">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${colorClass}`}>
                      <Icon className="h-3 w-3" />
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 leading-snug">{post.title}</h2>
                  <p className="mt-2 text-sm text-gray-600 flex-1">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                        <User className="h-3 w-3 text-gray-500" />
                      </div>
                      <span className="font-medium text-gray-700">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                    Read More <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        <section className="rounded-2xl bg-gray-900 p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">Stay in the Loop</h2>
            <p className="mt-2 text-gray-400">Get the latest posts, product updates, and protocol news delivered to your inbox.</p>
            {subscribed ? (
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-5 py-3 text-emerald-400 font-medium">
                <CheckCircle2 className="h-5 w-5" />
                You're subscribed! Welcome aboard.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 ring-1 ring-white/20 focus:outline-none focus:ring-white/40"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
