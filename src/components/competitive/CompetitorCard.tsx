import { CompetitorMovement } from "@/lib/types";

interface CompetitorCardProps {
    movement: CompetitorMovement;
    onAnalyze?: (competitor: string) => void;
    onPriceMatch?: (competitor: string) => void;
    onSetAlert?: (competitor: string) => void;
}

export function CompetitorCard({ movement, onAnalyze, onPriceMatch, onSetAlert }: CompetitorCardProps) {
    const cardBgClass = movement.type === 'opportunity' 
        ? 'bg-gradient-to-br from-green-900/20 to-slate-800 border-emerald-500' 
        : 'bg-gradient-to-br from-red-900/20 to-slate-800 border-red-500';
    
    const badgeClass = movement.type === 'opportunity'
        ? 'bg-emerald-500 text-white'
        : 'bg-red-500 text-white';

    return (
        <div className={`${cardBgClass} border-2 rounded-xl p-5 mb-4 hover:border-opacity-80 transition-all`}>
            <div className="flex justify-between items-start mb-5">
                <div>
                    <div className="text-lg font-bold text-slate-100 mb-1">{movement.competitor}</div>
                    <div className="text-sm text-slate-400">ASIN: {movement.asin}</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-2">{movement.timestamp}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeClass}`}>
                        {movement.badge}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5 pb-5 border-b border-slate-700">
                {movement.changes.map((change, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <span className="text-2xl">{change.icon}</span>
                        <div className="flex-1">
                            <div className="text-xs text-slate-400 mb-1">{change.label}</div>
                            <div className={`text-sm font-bold ${
                                change.negative ? 'text-red-400' : 
                                change.positive ? 'text-emerald-400' : 
                                'text-slate-100'
                            }`}>
                                {change.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-3 flex-wrap">
                {movement.type === 'opportunity' ? (
                    <>
                        <button 
                            className="px-5 py-2.5 rounded-lg border-none font-semibold text-sm cursor-pointer transition-all duration-200 inline-flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
                            onClick={() => onSetAlert?.(movement.competitor)}
                        >
                            🔔 Alert on Restock
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            className="px-5 py-2.5 rounded-lg border-none font-semibold text-sm cursor-pointer transition-all duration-200 inline-flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
                            onClick={() => onAnalyze?.(movement.competitor)}
                        >
                            🔍 Deep Analysis
                        </button>
                        <button 
                            className="px-5 py-2.5 rounded-lg border-none font-semibold text-sm cursor-pointer transition-all duration-200 flex-col items-start bg-purple-600 text-white hover:bg-purple-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed inline-flex" 
                            onClick={() => onPriceMatch?.(movement.competitor)}
                        >
                            <span>→ Dynamic Pricing</span>
                            <span className="text-xs font-normal text-purple-200">Match their price</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
