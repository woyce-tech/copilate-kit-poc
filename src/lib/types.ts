export interface AgentState {
  proverbs: string[];
}

// Competitive Intelligence Types
export interface CompetitiveState {
  currentProduct: string;
  competitors: CompetitorMovement[];
  alerts: Alert[];
  insights: string[];
}

export interface CompetitorMovement {
  competitor: string;
  asin: string;
  timestamp: string;
  type: "critical" | "opportunity";
  badge: string;
  changes: CompetitorChange[];
}

export interface CompetitorChange {
  icon: string;
  label: string;
  value: string;
  negative?: boolean;
  positive?: boolean;
  neutral?: boolean;
}

export interface Alert {
  id: string;
  competitor: string;
  condition: string;
  active: boolean;
}

export interface ProductData {
  productName: string;
  asin: string;
  alertSummary: string;
  activityStats: ActivityStats;
  priceHistory: PriceHistory;
  marketShare: MarketShare;
  bsrTrends: BSRTrends;
  movements: CompetitorMovement[];
}

export interface ActivityStats {
  priceChanges: { count: number; detail: string };
  reviewSpikes: { count: number; detail: string };
  stockOuts: { count: number; detail: string };
  newEntrants: { count: number; detail: string };
  featureUpdates: { count: number; detail: string };
  promotions: { count: number; detail: string };
}

export interface PriceHistory {
  labels: string[];
  yourPrice: number[];
  competitors: Record<string, (number | null)[]>;
}

export interface MarketShare {
  labels: string[];
  data: number[];
}

export interface BSRTrends {
  labels: string[];
  data: Record<string, number[]>;
}
