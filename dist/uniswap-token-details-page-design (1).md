# Uniswap Token Details Page (TDP) — Design Reference

> Covers `app.uniswap.org/explore/tokens/ethereum/NATIVE?chain=multichain` — the **Token Details Page** for native ETH, viewed in **multichain aggregate mode**.
> Reconstructed from the live product, Uniswap Labs' support docs, and `Uniswap/interface` (`apps/web/src/pages/TokenDetails`, `packages/ui/src/theme`). No official design spec is publicly published — this is the working equivalent, built from what's actually shipped.

---

## 1. What this page is

The TDP is Uniswap's **single-token research + swap surface** — one level deeper than the Explore tokens table. It combines:
1. A live price/volume/TVL chart
2. Full token stats (TVL, market cap, FDV, 1D volume)
3. A persistent swap widget (this page *is* a swap entry point, not just a readout)
4. Recent transactions + top pools for that token
5. Token description/links, and — because this URL is `NATIVE` on Ethereum with `?chain=multichain` — a **cross-chain aggregation layer**, since ETH exists natively/canonically across many networks.

### Why `NATIVE` + `?chain=multichain` matters here specifically
- `NATIVE` is the placeholder address Uniswap uses for a chain's native gas token (ETH on Ethereum, MATIC on Polygon, etc.) — there's no ERC-20 contract to key off, so routing uses this sentinel.
- `?chain=multichain` switches the page from "show me ETH on Ethereum only" to an **aggregated view**: chart data, stats, and volume are rolled up across every chain where this token exists, with a **network pill dropdown** letting the user drill into one specific chain.
- This is handled by a dedicated store layer: `useTDPMultichainAggregate`, `useTDPSelectedMultichainChain`, `useMultichainTokenEntries`, `getHighestVolumeChain`, `getHighestBalanceChain` — i.e. multichain isn't a bolt-on, it's a first-class state mode with its own hooks and URL sync (`TDPChainSearchParamSync`).

---

## 2. Page Anatomy

```
┌───────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Explore › Tokens › ETH                                  │  TDPBreadcrumb
├───────────────────────────────────────────────────────────────────┤
│ Sticky Collapsible Header                                            │  StickyCollapsibleHeader
│  — Token logo + name + symbol, shrinks/collapses on scroll            │  + TokenDetailsHeader
│  — Multichain network pill (dropdown: "Multichain ▾" → per-chain list)│  + TokenDetailsNetworkFilter
│  — Address copy (hidden for NATIVE — no contract address to show)     │
│  — Header actions: favorite/star, share, report issue                 │  Desktop/MobileHeaderActions
├──────────────────────────────────┬───────────────────────────────────┤
│ LEFT COLUMN (flexGrow, ~fluid)     │  RIGHT COLUMN (fixed 360px)         │
│                                    │                                    │
│ ChartSection                      │  TDPSwapComponent                  │
│  — Price / Volume / TVL tabs       │   — always visible on desktop       │
│  — 1H/1D/1W/1M/1Y range toggle      │   — persists across scroll (uses    │
│  — Line vs candlestick toggle       │     display:none, not unmount, to   │
│                                    │     preserve swap form state)       │
│ (OffHoursLiquidityBanner —          │                                    │
│  RWA-only, not applicable to ETH)   │  Balance/Earn/Bridged info (if      │
│                                    │   user has a position) — only on    │
│ BalanceSummary (if wallet connected │   desktop; folds into left column   │
│  + holds ETH)                       │   on narrower viewports             │
│                                    │                                    │
│ StatsSection                       │                                    │
│  — TVL · Market Cap · FDV · 1D Vol  │                                    │
│                                    │                                    │
│ MoreWaysToTrade (RWA-related,       │                                    │
│  conditionally shown)               │                                    │
│                                    │                                    │
│ TokenDescription                   │                                    │
│  — About text, contract link,       │                                    │
│    social/website links             │                                    │
│                                    │                                    │
│ ActivitySection                    │                                    │
│  — Transactions tab (time/type/     │                                    │
│    amount/fiat value/wallet)        │                                    │
│  — Pools tab (top 20 pools by TVL)  │                                    │
│                                    │                                    │
│ TokenCarousel ("Popular on          │                                    │
│  Ethereum") — feature-flagged       │                                    │
│                                    │                                    │
│ RelatedTokens                      │                                    │
└──────────────────────────────────┴───────────────────────────────────┘
```

At the `$xl` breakpoint (≤1024px) the two-column layout **collapses to a single stacked column** — the right panel (swap) moves to `flexDirection: 'column'`, becomes full-width (`maxWidth: 780`), and drops below the chart/stats content rather than sitting beside it. Below that, the swap widget is instead surfaced via `MobileBottomBar` (`TDPActionTabs`) — a persistent bottom action bar rather than an inline panel, so it's reachable without scrolling back up.

---

## 3. Section-by-Section UX

### Header
- **Multichain pill** (`MultichainPillDropdown` / `TokenInfoButton`): a bordered, rounded pill button (`$rounded12`, 1px `$surface3` border) reading the current chain context; clicking opens a popover (280×256px, `$rounded20`, shadow-elevated) listing every chain the token exists on, each selectable.
- **Address copy**: suppressed for `NATIVE` tokens (`getShowAddressCopy` explicitly returns false when `isNative` is true) — there's nothing to copy since native ETH isn't a contract.
- Header **shrinks on scroll** via `StickyCollapsibleHeader` + `HEADER_TRANSITION` — logo/title scale down (`getHeaderLogoSize`, `getHeaderTitleVariant`) as the user scrolls past it, keeping token identity visible without permanently consuming vertical space.
- **RWA-specific header identity** (`getRWAHeaderIdentity`, `RWAIssuerHeaderDetails`) exists in the codebase but does not apply here — ETH isn't a real-world asset.

### Chart Section
- Three data modes on one chart surface: **Price**, **Volume**, **TVL** (`ChartType`), each its own panel component (`TDPPriceChartPanel`, `TDPVolumeChartPanel`, `TDPTvlChartPanel`).
- Time range control: 1H / 1D / 1W / 1M / 1Y.
- Price mode has a **line ↔ candlestick toggle** (`AdvancedPriceChartToggle`, `disableCandlestickUI` state) — candlestick is the more advanced/optional view.
- In multichain mode, the chart target resolution (`getTDPChartGraphqlTarget`) picks between the selected specific chain or the aggregate, depending on `selectedMultichainChainId` — i.e. switching the header pill live-updates the chart's data source.

### Stats Section
Four core metrics, as documented by Uniswap Labs support:
- **TVL** — aggregate liquidity across all Uniswap pools for the token
- **Market Cap** — circulating-supply market value
- **FDV** — fully diluted valuation (all tokens counted as circulating)
- **1D Volume** — trailing 24h trade volume

### Swap Panel (Right Column)
- This is not a "buy" button linking elsewhere — it's the actual embedded swap widget (`TDPSwapComponent`), pre-populated with this token as one leg of the trade.
- **Persistence trick**: on desktop, it's kept mounted with `display: isDesktop ? 'flex' : 'none'` rather than conditionally rendered — explicitly to preserve in-progress swap form state (amounts typed, token selection) if the viewport or layout changes.
- Fixed width: **360px** on desktop.

### Activity Section
Tabbed sub-view:
- **Transactions** — time, buy/sell type (filterable), token amount, fiat value, wallet address.
- **Pools** — top 20 pools by TVL for this token, columns: rank, pool pair, protocol version (v2/v3/v4), fee tier, TVL (sortable), 1-day APR, 1D volume, 30D volume.

### Balance / Earn / Bridged Info
- Only renders if the connected wallet actually holds the token, or a bridged variant, or has an Earn position — otherwise this whole block is absent (`showTokenInfo`, `showBalanceInfo` gates).
- Positioned in the **right column on desktop**, but folds into the **left column** on narrower/tablet layouts (`showBalanceInfo = isDesktop && showTokenInfo`) — a responsive re-parenting rather than just a size change.

---

## 4. Multichain-Specific Interaction Model

This is the part unique to your URL (`?chain=multichain`) and worth calling out on its own:

1. **URL is the source of truth for chain selection** — `TDPChainSearchParamSync` keeps the `?chain=` query param and internal state in sync both ways (deep-linkable, back-button-safe).
2. **Default chain resolution** uses heuristics when landing on multichain without a specific selection: `getHighestVolumeChain` / `getHighestBalanceChain` pick a sensible default (e.g. prioritize the chain where the user holds the most balance, or where the token trades the most) rather than defaulting arbitrarily.
3. **Aggregate vs. single-chain is a toggle, not two separate pages** — same URL structure, same component tree; only the data-fetching target and header pill state change.
4. **Multi-chain-aware address copy / explorer links** — since each chain deployment has its own contract address (except NATIVE, which has none anywhere), the popover content adapts per selected chain.

---

## 5. Design Tokens Actually Used on This Page

(Same underlying system as the Explore list page — `packages/ui/src/theme` — but here are the specific values this page's own components hard-code, which tells you the intended density/scale for a detail page vs. a table page.)

| Token / value | Used for |
|---|---|
| `SWAP_COMPONENT_WIDTH = 360` | Right-column swap panel fixed width |
| Layout `gap: 80` (desktop) | Space between left content column and right swap column |
| Layout `mt: '$spacing32'`, `pb: '$spacing48'`, `px: '$spacing40'` | Outer page padding |
| `$lg` override: `px: '$padding20'`, `pb: 52`, `pt: 0` | Tablet-width padding tightening |
| `$xl` override: `flexDirection: 'column'`, `gap: '$none'` | Breakpoint where 2-col → 1-col stacking happens |
| Right panel `gap: 40`, `$xl: { width: '100%', maxWidth: 780, py: 40 }` | Stacked-mode swap panel becomes full width, capped at 780px |
| Multichain popover: `width: 280`, `maxHeight: 256`, `borderRadius: '$rounded20'` | Chain-picker dropdown sizing |
| Token pill: `borderRadius: '$rounded12'`, `borderWidth: 1`, `borderColor: '$surface3'`, `px: '$padding12'`, `py: '$padding8'` | Multichain pill button styling |

For the full color/type/spacing/breakpoint system, see the Explore-page design doc — this page draws from the identical token set (Basel Grotesk type, `$neutral1–3` / `$surface1–5` semantic colors, 4px-rooted spacing scale, same `xxs→xxxl` breakpoints).

---

## 6. Component Inventory (UX → source file)

| UX element | Component file |
|---|---|
| Page shell / two-column layout | `components/TokenDetails.tsx`, `components/skeleton/Skeleton.tsx` |
| Breadcrumb | `components/header/TDPBreadcrumb.tsx` |
| Sticky collapsing header | `components/header/TokenDetailsHeader.tsx` |
| Multichain network pill | `components/header/TokenDetailsNetworkFilter.tsx`, `components/info/MultichainPillDropdown.tsx` |
| Chart (price/volume/TVL) | `components/chart/ChartSection.tsx` + `TDPPriceChartPanel.tsx` / `TDPVolumeChartPanel.tsx` / `TDPTvlChartPanel.tsx` |
| Chart controls (range, line/candle) | `components/chart/ChartControls.tsx`, `AdvancedPriceChartToggle.tsx` |
| Stats (TVL/Mcap/FDV/Vol) | `components/info/StatsSection.tsx` |
| Swap widget | `components/swap/TDPSwapComponent.tsx` |
| Balance summary | `components/balances/BalanceSummary.tsx`, `Balance.tsx` |
| Bridged asset handling | `components/info/BridgedAssetSection.tsx`, `components/balances/BridgedAssetWithdrawButton.tsx` |
| Token description/links | `components/info/TokenDescription.tsx` |
| Transactions + pools tabs | `components/activity/ActivitySection.tsx`, `TransactionsTable.tsx`, `TokenDetailsPoolsTable.tsx` |
| "Popular on [chain]" carousel | `components/TokenCarousel/TokenCarousel.tsx`, `TokenCarouselCard.tsx` |
| Related tokens | `components/rwa/RelatedTokens.tsx` |
| Mobile bottom swap bar | `~/components/NavBar/MobileBottomBar.tsx` (`TDPActionTabs`) |
| Multichain aggregate logic | `hooks/useTDPMultichainAggregate.ts`, `useTDPSelectedMultichainChain.ts`, `useMultichainTokenEntries.ts` |
| Default-chain heuristics | `hooks/getHighestVolumeChain.ts`, `getHighestBalanceChain.ts` |
| URL ↔ state sync | `context/TDPChainSearchParamSync.tsx`, `context/tdpUrlUtils.ts` |
| Page-level store | `context/TDPStoreContextProvider.tsx`, `context/createTDPStore.ts` |

---

## 7. What's not publicly available

Same caveat as the Explore list page: no internal Figma, no design rationale docs, no A/B test history behind decisions like the multichain default-chain heuristic or the persisted-swap-panel trick. This doc reflects **what's shipped**, not **why** it was designed that way.
