import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import NumberModal from "../components/NumberModal";
import {
  ArrowRightLeft,
  Droplets,
  Wallet,
  TrendingUp,
  BarChart3,
  MousePointer2,
  Text,
  Ruler,
  RefreshCw,
  Minus,
  MoveHorizontal,
  Square,
  Triangle,
} from "lucide-react";

const TOKENS = [
  { value: "STRK", label: "STRK" },
  { value: "USDC", label: "USDC" },
  { value: "USDT", label: "UST" },
  { value: "ETH", label: "ETH" },
  { value: "BTC", label: "BTC" },
];

const now = Math.floor(Date.now() / 1000);
const MOCK_PRICE_HISTORY = [
  { time: now - 5 * 3600, open: 4370.50, high: 4372.10, low: 4369.80, close: 4371.20 },
  { time: now - 4 * 3600, open: 4371.20, high: 4375.40, low: 4370.10, close: 4374.80 },
  { time: now - 3 * 3600, open: 4374.80, high: 4378.60, low: 4373.20, close: 4376.90 },
  { time: now - 2 * 3600, open: 4376.90, high: 4380.10, low: 4375.30, close: 4378.40 },
  { time: now - 1 * 3600, open: 4378.40, high: 4382.70, low: 4377.10, close: 4380.20 },
  { time: now, open: 4380.20, high: 4382.710, low: 4375.660, close: 4374.940 },
];

const MOCK_ORDER_BOOK = {
  bids: [
    { price: 0.00030, amount: 120000, total: "36.00" },
    { price: 0.00029, amount: 85000, total: "24.65" },
    { price: 0.00028, amount: 210000, total: "58.80" },
    { price: 0.00027, amount: 55000, total: "14.85" },
    { price: 0.00026, amount: 95000, total: "24.70" },
  ],
  asks: [
    { price: 0.00031, amount: 140000, total: "43.40" },
    { price: 0.00032, amount: 75000, total: "24.00" },
    { price: 0.00033, amount: 160000, total: "52.80" },
    { price: 0.00034, amount: 90000, total: "30.60" },
    { price: 0.00035, amount: 110000, total: "38.50" },
  ],
};

const MOCK_LIQUIDITY = {
  totalLiquidity: 2450000,
  yourLpTokens: 12500,
  apr: 18.4,
};

const TIMEFRAMES = ["1m", "15m", "1h", "4h", "D"];
const SLIPPAGE_OPTIONS = ["0.1%", "0.5%", "1%"];

const DRAW_TOOLS = [
  { id: "cursor", Icon: MousePointer2, label: "Cursor", cursor: "default" },
  { id: "trendline", Icon: TrendingUp, label: "Trend Line", cursor: "crosshair" },
  { id: "hline", Icon: Minus, label: "Horizontal Line", cursor: "crosshair" },
  { id: "vline", Icon: MoveHorizontal, label: "Vertical Line", cursor: "crosshair" },
  { id: "rectangle", Icon: Square, label: "Rectangle", cursor: "crosshair" },
  { id: "triangle", Icon: Triangle, label: "Triangle", cursor: "crosshair" },
  { id: "text", Icon: Text, label: "Text", cursor: "text" },
  { id: "measure", Icon: Ruler, label: "Measure", cursor: "crosshair" },
  { id: "fibonacci", Icon: TrendingUp, label: "Fibonacci", cursor: "crosshair" },
];

export default function TradePage() {
  const [fromToken, setFromToken] = useState("STRK");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5%");
  const [timeframe, setTimeframe] = useState("1h");
  const [modalValue, setModalValue] = useState(null);
  const [side, setSide] = useState("buy");
  const [activeTool, setActiveTool] = useState("cursor");
  const [drawShapes, setDrawShapes] = useState([]);
  const [tempShape, setTempShape] = useState(null);
  const [svgSize, setSvgSize] = useState({ w: 800, h: 400 });
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const svgRef = useRef(null);
  const drawingState = useRef({});

  const quote = fromAmount ? (parseFloat(fromAmount) * 0.00031).toFixed(2) : "0.00";
  const maxPrice = Math.max(...MOCK_PRICE_HISTORY.map((p) => p.high));
  const minPrice = Math.min(...MOCK_PRICE_HISTORY.map((p) => p.low));

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  const getChartCoords = (clientX, clientY) => {
    if (!chartContainerRef.current || !chartRef.current) return null;
    const rect = chartContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const time = chartRef.current.timeScale().coordinateToTime(x);
    const price = chartRef.current.priceScale().coordinateToPrice(y);
    if (time == null || price == null) return null;
    return { x, y, time, price: +price.toFixed(2) };
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const isDark = document.documentElement.classList.contains("dark");
    const gridColor = isDark ? "#27272a" : "#E5E7EB";
    const borderColor = isDark ? "#3f3f46" : "#D1D5DB";
    const textColor = isDark ? "#a1a1aa" : "#6B7280";

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "transparent" },
        textColor,
      },
      grid: {
        vertLines: { color: gridColor },
        horzLines: { color: gridColor },
      },
      crosshair: {
        mode: activeTool === "cursor" ? 1 : 0,
        vertLine: { color: activeTool === "cursor" ? "#2563EB" : "transparent", labelBackgroundColor: "#2563EB", style: 1 },
        horzLine: { color: activeTool === "cursor" ? "#2563EB" : "transparent", labelBackgroundColor: "#2563EB", style: 1 },
      },
      rightPriceScale: {
        borderColor,
      },
      timeScale: {
        borderColor,
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10B981",
      downColor: "#EF4444",
      borderUpColor: "#10B981",
      borderDownColor: "#EF4444",
      wickUpColor: "#10B981",
      wickDownColor: "#EF4444",
    });

    candlestickSeries.setData(MOCK_PRICE_HISTORY);
    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        const w = chartContainerRef.current.clientWidth;
        const h = chartContainerRef.current.clientHeight;
        chart.applyOptions({ width: w, height: h });
        setSvgSize({ w, h });
      }
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(chartContainerRef.current);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [activeTool]);

  const handleSvgMouseDown = (e) => {
    if (activeTool === "cursor") return;
    const coords = getChartCoords(e.clientX, e.clientY);
    if (!coords) return;
    drawingState.current = { tool: activeTool, start: coords, end: coords };
  };

  const handleSvgMouseMove = (e) => {
    if (!drawingState.current.start) return;
    const coords = getChartCoords(e.clientX, e.clientY);
    if (!coords) return;
    setTempShape({ ...drawingState.current, end: coords });
  };

  const handleSvgMouseUp = () => {
    const ds = drawingState.current;
    if (!ds.start || !ds.end) return;
    if (ds.start.x === ds.end.x && ds.start.y === ds.end.y && ds.tool !== "hline" && ds.tool !== "vline" && ds.tool !== "text") {
      drawingState.current = {};
      setTempShape(null);
      return;
    }
    setDrawShapes((prev) => [...prev, ds]);
    drawingState.current = {};
    setTempShape(null);
  };

  const handleSvgDoubleClick = (e) => {
    if (activeTool !== "text") return;
    const coords = getChartCoords(e.clientX, e.clientY);
    if (!coords) return;
    const text = prompt("Enter text:");
    if (text) {
      setDrawShapes((prev) => [...prev, { tool: "text", start: coords, text }]);
    }
  };

  const handleToolClick = (toolId) => {
    setActiveTool(toolId);
    drawingState.current = {};
    setTempShape(null);
  };

  const clearDrawings = () => {
    setDrawShapes([]);
    setTempShape(null);
    drawingState.current = {};
  };

  const allShapes = [...drawShapes, tempShape].filter(Boolean);

  const renderShape = (shape, index) => {
    const { tool, start, end, text } = shape;
    const isTemp = index >= drawShapes.length;
    const color = isTemp ? "#52525b" : "#a1a1aa";

    if (tool === "trendline") {
      return (
        <g key={index}>
          <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={color} strokeWidth="2" strokeDasharray={isTemp ? "6,4" : "none"} />
          <circle cx={start.x} cy={start.y} r="4" fill={color} />
          <circle cx={end.x} cy={end.y} r="4" fill={color} />
        </g>
      );
    }

    if (tool === "hline") {
      return (
        <line key={index} x1="0" y1={start.y} x2={svgSize.w} y2={start.y} stroke={color} strokeWidth="1.5" strokeDasharray={isTemp ? "6,4" : "none"} />
      );
    }

    if (tool === "vline") {
      return (
        <line key={index} x1={start.x} y1="0" x2={start.x} y2={svgSize.h} stroke={color} strokeWidth="1.5" strokeDasharray={isTemp ? "6,4" : "none"} />
      );
    }

    if (tool === "rectangle") {
      const x = Math.min(start.x, end.x);
      const y = Math.min(start.y, end.y);
      const w = Math.abs(end.x - start.x);
      const h = Math.abs(end.y - start.y);
      return (
        <rect key={index} x={x} y={y} width={w} height={h} fill="none" stroke={color} strokeWidth="2" strokeDasharray={isTemp ? "6,4" : "none"} />
      );
    }

    if (tool === "triangle") {
      const x1 = start.x;
      const y1 = start.y;
      const x2 = end.x;
      const y2 = end.y;
      const midX = (x1 + x2) / 2;
      const midY = Math.max(y1, y2) - Math.abs(x2 - x1) * 0.5;
      return (
        <polygon key={index} points={`${x1},${y1} ${x2},${y2} ${midX},${midY}`} fill="none" stroke={color} strokeWidth="2" strokeDasharray={isTemp ? "6,4" : "none"} />
      );
    }

    if (tool === "text") {
      return (
        <g key={index}>
          <rect x={start.x - 4} y={start.y - 18} width={(text?.length || 8) * 8 + 8} height="22" fill="rgba(0,0,0,0.75)" rx="4" />
          <text x={start.x} y={start.y} fill="white" fontSize="12" fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="600">
            {text || "Text"}
          </text>
        </g>
      );
    }

    if (tool === "measure") {
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const dist = Math.sqrt(dx * dx + dy * dy).toFixed(0);
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      return (
        <g key={index}>
          <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={color} strokeWidth="1.5" strokeDasharray={isTemp ? "6,4" : "none"} />
          <circle cx={start.x} cy={start.y} r="4" fill={color} />
          <circle cx={end.x} cy={end.y} r="4" fill={color} />
          <rect x={midX - 30} y={midY - 24} width="60" height="20" fill="rgba(0,0,0,0.8)" rx="4" />
          <text x={midX} y={midY - 9} textAnchor="middle" fill="white" fontSize="11" fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="600">
            {dist}px
          </text>
        </g>
      );
    }

    if (tool === "fibonacci") {
      const y1 = Math.min(start.y, end.y);
      const y2 = Math.max(start.y, end.y);
      const range = y2 - y1;
      const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
      return (
        <g key={index}>
          <line x1={start.x} y1={y1} x2={end.x} y2={y2} stroke={color} strokeWidth="1.5" strokeDasharray="6,4" />
          {levels.map((lvl) => {
            const y = y1 + range * lvl;
            return (
              <line key={lvl} x1={start.x} y1={y} x2={svgSize.w} y2={y} stroke={color} strokeWidth="1" opacity="0.5" />
            );
          })}
          <circle cx={start.x} cy={y1} r="3" fill={color} />
          <circle cx={start.x} cy={y2} r="3" fill={color} />
        </g>
      );
    }

    return null;
  };

  const cursorStyle = DRAW_TOOLS.find((t) => t.id === activeTool)?.cursor || "default";

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        <div className="hidden lg:flex w-12 flex-col items-center border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-black py-2 gap-1">
          {DRAW_TOOLS.map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => handleToolClick(id)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                activeTool === id
                  ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
              title={label}
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
          <button
            onClick={clearDrawings}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition mt-auto"
            title="Clear drawings"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 px-4 py-2 bg-white dark:bg-black">
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <img src="/Logo.jpeg" alt="" className="h-7 w-7 rounded-full object-cover border-2 border-white dark:border-black relative z-10" />
                <img src="/usdc.png" alt="" className="h-7 w-7 rounded-full object-cover border-2 border-white dark:border-black" />
              </div>
              <h1 className="text-base font-bold text-gray-900 dark:text-white">SYK / USDC</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition">Save</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-zinc-800 overflow-x-auto no-scrollbar">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-xs sm:text-sm font-medium rounded transition whitespace-nowrap ${
                  timeframe === tf
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                }`}
              >
                {tf}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24M6.34 6.34L2.1 2.1m17.8 17.8l-4.24-4.24M6.34 17.66l-4.24 4.24M23 12h-6m-6 0H1m20.07-4.93l-4.24 4.24M6.34 6.34l-4.24-4.24"/></svg>
              </button>
            </div>
          </div>

          <div className="flex-1 relative min-h-[300px] sm:min-h-0 bg-gray-50 dark:bg-zinc-900/50">
            <div ref={chartContainerRef} className="w-full h-full min-h-[300px]" />
            {activeTool !== "cursor" && (
              <svg
                ref={svgRef}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: cursorStyle, pointerEvents: "all" }}
                onMouseDown={handleSvgMouseDown}
                onMouseMove={handleSvgMouseMove}
                onMouseUp={handleSvgMouseUp}
                onMouseLeave={handleSvgMouseUp}
                onDoubleClick={handleSvgDoubleClick}
              >
                {allShapes.map((shape, i) => renderShape(shape, i))}
              </svg>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-black">
            <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar">
              <button className="px-3 py-1.5 text-xs sm:text-sm font-semibold bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg whitespace-nowrap">Open trades: 0</button>
              <button className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition whitespace-nowrap">Pending orders: 0</button>
              <button className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition whitespace-nowrap">Closed trades</button>
            </div>
            <div className="px-4 py-6 text-center">
              <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base mb-1">No open trades</p>
              <p className="text-xs sm:text-sm text-gray-500">Check out the Watchlist to see what's available to trade on</p>
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-zinc-800 bg-white dark:bg-black flex flex-col">
          <div className="flex border-b border-gray-200 dark:border-zinc-800">
            <button
              onClick={() => setSide("sell")}
              className={`flex-1 py-3 text-sm font-semibold transition ${
                side === "sell"
                  ? "text-rose-600 border-b-2 border-rose-600 bg-rose-50 dark:bg-rose-950/30"
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800"
              }`}
            >
              ↓ Sell
            </button>
            <button
              onClick={() => setSide("buy")}
              className={`flex-1 py-3 text-sm font-semibold transition ${
                side === "buy"
                  ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800"
              }`}
            >
              Buy ↑
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Available:</span>
              <span className="font-semibold text-gray-900 dark:text-white">847.5k $SYK</span>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Trade amount</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-blue-500 transition"
                />
                <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-zinc-700 px-2.5 py-2 rounded-lg">
                  <img src="/Logo.jpeg" alt="" className="h-5 w-5 rounded-full object-cover" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">$SYK</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {["0.24 lots", "0.25 lots", "0.5 lots", "0.75 lots"].map((lot) => (
                <button
                  key={lot}
                  className="flex-1 px-2 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
                >
                  {lot}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-xs font-medium text-gray-500">Take profit</span>
              <button className="w-10 h-5 bg-gray-200 dark:bg-zinc-700 rounded-full relative transition">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs font-medium text-gray-500">Stop loss</span>
              <button className="w-10 h-5 bg-gray-200 dark:bg-zinc-700 rounded-full relative transition">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs font-medium text-gray-500">Pending order</span>
              <button className="w-10 h-5 bg-gray-200 dark:bg-zinc-700 rounded-full relative transition">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
            <button
              disabled={!fromAmount}
              className={`w-full py-3.5 rounded-2xl text-sm font-bold transition ${
                side === "buy"
                  ? "bg-emerald-500 hover:bg-emerald-400 text-white"
                  : "bg-rose-500 hover:bg-rose-400 text-white"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              Open {side} trade
            </button>
          </div>
        </aside>
      </div>
      {modalValue !== null && <NumberModal value={modalValue} onClose={() => setModalValue(null)} />}
    </div>
  );
}
