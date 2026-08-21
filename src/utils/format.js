export function formatCompact(val) {
  if (val == null) return "0";
  const num = typeof val === "number" ? val : parseFloat(val);
  if (isNaN(num)) return String(val);
  const abs = Math.abs(num);
  if (abs >= 1_000_000) {
    const formatted = (num / 1_000_000).toFixed(2);
    return formatted.replace(/\.?0+$/, "") + "M";
  }
  if (abs >= 1_000) {
    const formatted = (num / 1_000).toFixed(1);
    return formatted.replace(/\.0$/, "") + "K";
  }
  return String(num);
}

export function formatCurrency(val) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);
}
