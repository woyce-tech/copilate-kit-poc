import { useState } from "react";

interface PriceChangeApprovalProps {
    currentPrice: number;
    newPrice: number;
    competitor: string;
    reason: string;
    impact: {
        marginChange: string;
        expectedSalesChange: string;
        competitivePosition: string;
    };
    respond: (response: string) => void;
}

export function PriceChangeApproval({
    currentPrice = 0,
    newPrice = 0,
    competitor,
    reason,
    impact,
    respond,
}: PriceChangeApprovalProps) {
    const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");
    const priceChange = currentPrice !== 0 ? ((newPrice - currentPrice) / currentPrice) * 100 : 0;
    const isIncrease = priceChange > 0;

    const handleResponse = (response: "approved" | "rejected") => {
        setStatus(response);
        respond(response);
    };

    if (status === "approved") {
        return (
            <div className="bg-gradient-to-br from-emerald-950 to-slate-800 border-2 border-emerald-500 rounded-xl p-8 my-6 max-w-2xl animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-4 mb-6 pb-5 border-b-2 border-slate-700">
                    <span className="text-4xl">✅</span>
                    <h3 className="text-2xl font-bold text-slate-100">Price Change Approved</h3>
                </div>
                <p className="text-lg text-emerald-300 font-medium mt-2">Price will be updated to ${newPrice.toFixed(2)}</p>
            </div>
        );
    }

    if (status === "rejected") {
        return (
         <div className="bg-gradient-to-br from-red-950 to-slate-800 border-2 border-red-500 rounded-xl p-6 my-4 max-w-2xl animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-slate-700">
                    <span className="text-3xl">❌</span>
                    <h3 className="text-xl font-bold text-slate-100">Price Change Rejected</h3>
                </div>
                <p className="text-base text-red-300 font-medium">Maintaining current price of ${currentPrice.toFixed(2)}</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-800 border-2 border-amber-500 rounded-xl p-8 my-6 max-w-2xl animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-4 mb-8 pb-5 border-b-2 border-slate-700">
                <span className="text-4xl">⚠️</span>
                <h3 className="text-2xl font-bold text-slate-100">Price Change Approval Required</h3>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-6 p-8 bg-slate-900 rounded-xl border border-slate-700">
                    <div className="flex flex-col gap-3">
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Current Price</span>
                        <span className="text-4xl font-bold text-slate-100">${currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-3xl text-slate-400 mx-2">→</div>
                    <div className="flex flex-col gap-3">
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">New Price</span>
                        <span className={`text-4xl font-bold ${isIncrease ? 'text-red-400' : 'text-emerald-400'}`}>
                            ${newPrice.toFixed(2)}
                        </span>
                    </div>
                    <div className="ml-auto">
                        <div className="text-2xl font-bold px-6 py-3 rounded-xl bg-white/5">
                            <span className={isIncrease ? 'text-red-400' : 'text-emerald-400'}>
                                {isIncrease ? '+' : ''}{priceChange.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-blue-500/10 border-l-4 border-blue-500 rounded-lg text-base leading-relaxed">
                    <strong className="text-blue-400 font-bold">Reason:</strong> <span className="text-slate-200">{reason}</span>
                    {competitor && <span className="text-slate-300"> (Matching {competitor})</span>}
                </div>

                <div>
                    <h4 className="text-sm text-slate-400 font-bold mb-5 uppercase tracking-wider">Impact Analysis</h4>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
                        <div className="p-5 bg-slate-900 rounded-xl border border-slate-700 flex flex-col gap-3">
                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Margin Impact</span>
                            <span className="text-base font-semibold text-slate-100">{impact.marginChange}</span>
                        </div>
                        <div className="p-5 bg-slate-900 rounded-xl border border-slate-700 flex flex-col gap-3">
                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Expected Sales</span>
                            <span className="text-base font-semibold text-slate-100">{impact.expectedSalesChange}</span>
                        </div>
                        <div className="p-5 bg-slate-900 rounded-xl border border-slate-700 flex flex-col gap-3">
                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Competitive Position</span>
                            <span className="text-base font-semibold text-slate-100">{impact.competitivePosition}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-slate-700">
                <button
                    className="min-w-44 px-8 py-4 text-base font-semibold rounded-xl border-none cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 bg-red-500 text-white hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(239,68,68,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    onClick={() => handleResponse("rejected")}
                    disabled={status !== "pending"}
                >
                    ❌ Reject
                </button>
                <button
                    className="min-w-44 px-8 py-4 text-base font-semibold rounded-xl border-none cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    onClick={() => handleResponse("approved")}
                    disabled={status !== "pending"}
                >
                    ✅ Approve Price Change
                </button>
            </div>
        </div>
    );
}
