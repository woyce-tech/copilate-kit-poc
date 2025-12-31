import { ActivityStats } from "@/lib/types";

interface ActivityStatsGridProps {
    stats: ActivityStats;
}

export function ActivityStatsGrid({ stats }: ActivityStatsGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-gradient-to-br from-red-500/10 to-slate-800 border-2 border-red-500/50 rounded-xl p-4 hover:border-red-500 transition-colors">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Price Changes (24h)</div>
                <div className="text-3xl font-bold text-slate-100 mb-2">{stats.priceChanges.count}</div>
                <div className="text-xs text-slate-400 leading-snug">{stats.priceChanges.detail}</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-slate-800 border-2 border-amber-500/50 rounded-xl p-4 hover:border-amber-500 transition-colors">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Review Velocity Spikes</div>
                <div className="text-3xl font-bold text-slate-100 mb-2">{stats.reviewSpikes.count}</div>
                <div className="text-xs text-slate-400 leading-snug">{stats.reviewSpikes.detail}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-slate-800 border-2 border-emerald-500/50 rounded-xl p-4 hover:border-emerald-500 transition-colors">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Stock-Outs Detected</div>
                <div className="text-3xl font-bold text-slate-100 mb-2">{stats.stockOuts.count}</div>
                <div className="text-xs text-slate-400 leading-snug">{stats.stockOuts.detail}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-slate-800 border-2 border-blue-500/50 rounded-xl p-4 hover:border-blue-500 transition-colors">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">New Competitors</div>
                <div className="text-3xl font-bold text-slate-100 mb-2">{stats.newEntrants.count}</div>
                <div className="text-xs text-slate-400 leading-snug">{stats.newEntrants.detail}</div>
            </div>
            <div className="bg-gradient-to-br from-red-500/10 to-slate-800 border-2 border-red-500/50 rounded-xl p-4 hover:border-red-500 transition-colors">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Feature Updates</div>
                <div className="text-3xl font-bold text-slate-100 mb-2">{stats.featureUpdates.count}</div>
                <div className="text-xs text-slate-400 leading-snug">{stats.featureUpdates.detail}</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-slate-800 border-2 border-amber-500/50 rounded-xl p-4 hover:border-amber-500 transition-colors">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Active Promotions</div>
                <div className="text-3xl font-bold text-slate-100 mb-2">{stats.promotions.count}</div>
                <div className="text-xs text-slate-400 leading-snug">{stats.promotions.detail}</div>
            </div>
        </div>
    );
}
