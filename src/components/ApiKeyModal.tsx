"use client";

import { useState } from "react";

interface ApiKeyModalProps {
    isOpen: boolean;
    onSave: (apiKey: string) => void;
}

export function ApiKeyModal({ isOpen, onSave }: ApiKeyModalProps) {
    const [apiKey, setApiKey] = useState("");
    const [showKey, setShowKey] = useState(false);

    if (!isOpen) return null;

    const handleSave = () => {
        if (apiKey.trim()) {
            onSave(apiKey.trim());
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl max-w-md w-full p-8 shadow-2xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">🔑 Enter OpenAI API Key</h2>
                    <p className="text-sm text-slate-400">
                        Required to enable AI features
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                            API Key
                        </label>
                        <div className="relative">
                            <input
                                type={showKey ? "text" : "password"}
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="sk-..."
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                            />
                            <button
                                type="button"
                                onClick={() => setShowKey(!showKey)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                            >
                                {showKey ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <details className="text-sm text-slate-400">
                        <summary className="cursor-pointer hover:text-slate-300 font-semibold">
                            How to get an API key?
                        </summary>
                        <ol className="mt-2 ml-4 space-y-1 list-decimal text-xs">
                            <li>Visit <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">platform.openai.com</a></li>
                            <li>Sign in or create account</li>
                            <li>Go to API Keys section</li>
                            <li>Create new secret key</li>
                            <li>Copy and paste here</li>
                        </ol>
                    </details>

                    <button
                        onClick={handleSave}
                        disabled={!apiKey.trim()}
                        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
