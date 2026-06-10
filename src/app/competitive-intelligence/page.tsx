"use client";

import { useState } from "react";
import { useCoAgent, useFrontendTool, useHumanInTheLoop } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { CompetitiveState } from "@/lib/types";
import { MOCK_DATA } from "@/lib/competitive/mockData";
import { CompetitorCard } from "@/components/competitive/CompetitorCard";
import { ActivityStatsGrid } from "@/components/competitive/ActivityStats";
import { PriceChart, MarketShareChart, BSRChart } from "@/components/competitive/Charts";
import { PriceChangeApproval } from "@/components/competitive/PriceChangeApproval";
import { ApiKeyModal } from "@/components/ApiKeyModal";

export default function CompetitiveIntelligencePage() {
    const [apiKey, setApiKey] = useState("");

    const handleApiKeySave = async (key: string) => {
        // Send API key to backend
        await fetch("/api/copilotkit/set-key", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey: key }),
        });
        setApiKey(key);
    };

    return (
        <>
            <ApiKeyModal isOpen={!apiKey} onSave={handleApiKeySave} />
            <CopilotSidebar
                disableSystemMessage={true}
                clickOutsideToClose={false}
                labels={{
                    title: "Competitive Intelligence AI",
                    initial: "👋 Hi! I'm your competitive intelligence assistant. Ask me about competitor movements, pricing strategies, or market insights.",
                }}
                suggestions={[
                    {
                        title: "Competitor Analysis",
                        message: "Which competitor is the biggest threat right now?",
                    },
                    {
                        title: "Pricing Strategy",
                        message: "Should I adjust my pricing based on recent competitor changes?",
                    },
                    {
                        title: "Deep Dive",
                        message: "Analyze the SoundMax price drop and its impact.",
                    },
                ]}
            >
                <CompetitiveDashboard />
            </CopilotSidebar>
        </>
    );
}

function CompetitiveDashboard() {
    const [currentProduct, setCurrentProduct] = useState("earbuds");
    const [isRefreshing, setIsRefreshing] = useState(false);

    // 🪁 Shared State with Agent
    const { state, setState } = useCoAgent<CompetitiveState>({
        name: "sample_agent",
        initialState: {
            currentProduct: "earbuds",
            competitors: MOCK_DATA.earbuds.movements,
            alerts: [],
            insights: [],
        },
    });

    const productData = MOCK_DATA[currentProduct as keyof typeof MOCK_DATA];

    // 🪁 Frontend Tool: Switch Product
    useFrontendTool({
        name: "switchProduct",
        parameters: [
            {
                name: "productId",
                description: "The product ID to switch to (earbuds, powerbank, or phonecase)",
                type: "string",
                required: true,
            },
        ],
        handler: ({ productId }) => {
            setCurrentProduct(productId);
            setState({
                ...(state || {}),
                currentProduct: productId,
                competitors: MOCK_DATA[productId as keyof typeof MOCK_DATA].movements,
            });
        },
    });

    // 🪁 Frontend Tool: Set Alert
    useFrontendTool({
        name: "setCompetitorAlert",
        parameters: [
            {
                name: "competitor",
                description: "The competitor name to set an alert for",
                type: "string",
                required: true,
            },
            {
                name: "condition",
                description: "The condition to monitor (e.g., 'price drop', 'restock', 'review spike')",
                type: "string",
                required: true,
            },
        ],
        handler: ({ competitor, condition }) => {
            const newAlert = {
                id: Date.now().toString(),
                competitor,
                condition,
                active: true,
            };
            setState({
                ...(state || {}),
                alerts: [...(state?.alerts || []), newAlert],
            });
            alert(`✅ Alert set for ${competitor}: ${condition}`);
        },
    });

    // 🪁 Frontend Tool: Add Insight
    useFrontendTool({
        name: "addInsight",
        parameters: [
            {
                name: "insight",
                description: "An AI-generated insight about the competitive landscape",
                type: "string",
                required: true,
            },
        ],
        handler: ({ insight }) => {
            setState({
                ...(state || {}),
                insights: [...(state?.insights || []), insight],
            });
        },
    });

    // 🪁 Human-in-the-Loop: Price Change Approval
    useHumanInTheLoop(
        {
            name: "approve_price_change",
            description: "Request approval for a price change with impact analysis",
            render: ({ respond, status, args }) => {
                return (
                    <PriceChangeApproval
                        currentPrice={args.currentPrice || 0}
                        newPrice={args.newPrice || 0}
                        competitor={args.competitor || ""}
                        reason={args.reason || ""}
                        impact={{
                            marginChange: args.marginChange || "N/A",
                            expectedSalesChange: args.expectedSalesChange || "N/A",
                            competitivePosition: args.competitivePosition || "N/A",
                        }}
                        respond={respond || (() => {})}
                    />
                );
            },
        },
        []
    );

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newProduct = e.target.value;
        setCurrentProduct(newProduct);
        setState({
            ...(state || {}),
            currentProduct: newProduct,
            competitors: MOCK_DATA[newProduct as keyof typeof MOCK_DATA].movements,
        });
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            alert("✅ All competitor data refreshed!");
        }, 1500);
    };

    const handleAnalyze = (competitor: string) => {
        alert(`🔍 Deep analysis requested for ${competitor}. This would trigger detailed competitor profiling.`);
    };

    const handlePriceMatch = (competitor: string) => {
        alert(`💰 Dynamic pricing agent activated for ${competitor}. This would analyze and suggest pricing adjustments.`);
    };

    const handleSetAlert = (competitor: string) => {
        const newAlert = {
            id: Date.now().toString(),
            competitor,
            condition: "restock",
            active: true,
        };
        setState({
            ...(state || {}),
            alerts: [...(state?.alerts || []), newAlert],
        });
        alert(`🔔 Alert set for ${competitor} restock notification`);
    };

    return (
        <div className="font-sans bg-slate-900 text-slate-100 leading-relaxed p-6 min-h-screen">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
                <h1 className="text-3xl font-bold mb-2">🎯 Competitive Intelligence</h1>
                <p className="text-slate-400 text-base">
                    Real-time monitoring of competitor actions, market movements, and competitive threats
                </p>
            </div>

            <div className="max-w-[1800px] mx-auto">
                {/* Product Selector */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Monitoring Competitors For:</span>
                        <select className="bg-slate-900 border border-slate-700 text-slate-100 px-4 py-2.5 rounded-lg text-base font-semibold cursor-pointer min-w-[350px]" value={currentProduct} onChange={handleProductChange}>
                            <option value="earbuds">🎧 Premium Wireless Earbuds Pro (B09XYZ789)</option>
                            <option value="powerbank">🔋 Portable Power Bank 20000mAh (B08ABC456)</option>
                            <option value="phonecase">📱 Phone Case - Heavy Duty (B07DEF123)</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-emerald-500 text-sm">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span>Live • Updated 2m ago</span>
                        </div>
                        <button className="px-5 py-2.5 rounded-lg border-none font-semibold text-sm cursor-pointer transition-all duration-200 inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleRefresh} disabled={isRefreshing}>
                            {isRefreshing ? "⏳ Refreshing..." : "🔄 Refresh"}
                        </button>
                    </div>
                </div>

                {/* Market Alert */}
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500 rounded-xl p-6 mb-6 animate-pulse">
                    <div>
                        <div className="text-lg font-bold text-amber-300 mb-2">⚡ High Market Activity Detected</div>
                        <div className="text-slate-200 text-sm leading-relaxed">{productData.alertSummary}</div>
                    </div>
                </div>

                {/* Activity Stats */}
                <ActivityStatsGrid stats={productData.activityStats} />

                {/* AI Insights */}
                {state?.insights && state.insights.length > 0 && (
                    <div className="mb-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                                <span>🤖</span>
                                AI-Generated Insights
                            </h2>
                        </div>
                        <div>
                            {state.insights.map((insight, idx) => (
                                <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-4 hover:border-slate-600 transition-colors">
                                    <p className="text-slate-200">{insight}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Graphs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                <span>📈</span>
                                Competitive Price Tracking
                            </h3>
                        </div>
                        <PriceChart data={productData.priceHistory} />
                    </div>

                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                <span>🥧</span>
                                Market Share
                            </h3>
                        </div>
                        <MarketShareChart data={productData.marketShare} />
                    </div>
                </div>

                {/* BSR Trends */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                            <span>📊</span>
                            Competitor BSR Trends (7 Days)
                        </h3>
                    </div>
                    <BSRChart data={productData.bsrTrends} />
                </div>

                {/* Movement Cards */}
                <div className="mb-6">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                            <span>🚨</span>
                            Critical Competitor Movements
                        </h2>
                    </div>
                    <div>
                        {productData.movements.map((movement, idx) => (
                            <CompetitorCard
                                key={idx}
                                movement={movement}
                                onAnalyze={handleAnalyze}
                                onPriceMatch={handlePriceMatch}
                                onSetAlert={handleSetAlert}
                            />
                        ))}
                    </div>
                </div>

                {/* Active Alerts */}
                {state?.alerts && state.alerts.length > 0 && (
                    <div className="mb-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                                <span>🔔</span>
                                Active Alerts ({state.alerts.length})
                            </h2>
                        </div>
                        <div>
                            {state.alerts.map((alert) => (
                                <div key={alert.id} className="bg-gradient-to-br from-green-900/20 to-slate-800 border-2 border-emerald-500 rounded-xl p-5 mb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-lg font-bold text-slate-100 mb-1">{alert.competitor}</div>
                                            <div className="text-sm text-slate-400">Condition: {alert.condition}</div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">Active</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
