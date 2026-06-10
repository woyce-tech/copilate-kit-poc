"use client";

import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";
import { PriceHistory, MarketShare, BSRTrends } from "@/lib/types";

interface PriceChartProps {
    data: PriceHistory;
}

export function PriceChart({ data }: PriceChartProps) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Destroy existing chart
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        const config: ChartConfiguration = {
            type: "line",
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: "Your Price",
                        data: data.yourPrice,
                        borderColor: "#3b82f6",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        borderWidth: 3,
                        tension: 0.4,
                    },
                    ...Object.entries(data.competitors).map(([name, values], idx) => {
                        const colors = ["#ef4444", "#f59e0b", "#10b981", "#8b5cf6"];
                        return {
                            label: name,
                            data: values,
                            borderColor: colors[idx % colors.length],
                            backgroundColor: colors[idx % colors.length] + "20",
                            borderWidth: 2,
                            tension: 0.4,
                        };
                    }),
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: "#94a3b8",
                            font: { size: 12 },
                        },
                    },
                },
                scales: {
                    y: {
                        ticks: { color: "#94a3b8" },
                        grid: { color: "#334155" },
                    },
                    x: {
                        ticks: { color: "#94a3b8" },
                        grid: { color: "#334155" },
                    },
                },
            },
        };

        chartInstance.current = new Chart(ctx, config);

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className="chart-container">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

interface MarketShareChartProps {
    data: MarketShare;
}

export function MarketShareChart({ data }: MarketShareChartProps) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        const config: ChartConfiguration = {
            type: "doughnut",
            data: {
                labels: data.labels,
                datasets: [
                    {
                        data: data.data,
                        backgroundColor: ["#ef4444", "#f59e0b", "#3b82f6", "#10b981", "#94a3b8"],
                        borderColor: "#1e293b",
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "#94a3b8",
                            font: { size: 11 },
                            padding: 10,
                        },
                    },
                },
            },
        };

        chartInstance.current = new Chart(ctx, config);

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className="chart-container-small">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

interface BSRChartProps {
    data: BSRTrends;
}

export function BSRChart({ data }: BSRChartProps) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        const colors = ["#ef4444", "#f59e0b", "#3b82f6"];
        const datasets = Object.entries(data.data).map(([name, values], idx) => ({
            label: name,
            data: values,
            borderColor: colors[idx % colors.length],
            backgroundColor: colors[idx % colors.length] + "20",
            borderWidth: 2,
            tension: 0.4,
        }));

        const config: ChartConfiguration = {
            type: "line",
            data: {
                labels: data.labels,
                datasets,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: "#94a3b8",
                            font: { size: 12 },
                        },
                    },
                },
                scales: {
                    y: {
                        reverse: true,
                        ticks: { color: "#94a3b8" },
                        grid: { color: "#334155" },
                    },
                    x: {
                        ticks: { color: "#94a3b8" },
                        grid: { color: "#334155" },
                    },
                },
            },
        };

        chartInstance.current = new Chart(ctx, config);

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className="chart-container-mini">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}
