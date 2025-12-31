import { ProductData } from "../types";

export const MOCK_DATA: Record<string, ProductData> = {
    earbuds: {
        productName: "Premium Wireless Earbuds Pro",
        asin: "B09XYZ789",
        alertSummary: "8 competitors made significant changes in the last 24 hours • 3 price drops • 2 new entrants • 1 major stock-out",
        activityStats: {
            priceChanges: { count: 8, detail: "3 critical drops • Avg -12%" },
            reviewSpikes: { count: 2, detail: "AudioTech +462% • BrandZ +320%" },
            stockOuts: { count: 1, detail: "MarketLeader • 450 units/day" },
            newEntrants: { count: 2, detail: "UltraSound • BassPro" },
            featureUpdates: { count: 3, detail: "Wireless charging added" },
            promotions: { count: 5, detail: "Up to 30% off detected" }
        },
        priceHistory: {
            labels: ['Nov 5', 'Nov 8', 'Nov 11', 'Nov 14', 'Nov 17', 'Nov 20', 'Nov 23', 'Nov 26', 'Nov 29', 'Dec 2', 'Dec 5'],
            yourPrice: [74.99, 74.99, 74.99, 74.99, 74.99, 74.99, 74.99, 74.99, 74.99, 74.99, 74.99],
            competitors: {
                SoundMax: [74.99, 74.99, 74.99, 72.99, 72.99, 69.99, 69.99, 69.99, 62.49, 62.49, 62.49],
                AudioTech: [69.99, 69.99, 69.99, 69.99, 69.99, 69.99, 69.99, 69.99, 69.99, 69.99, 69.99],
                BassBoost: [59.99, 59.99, 59.99, 59.99, 59.99, 59.99, 59.99, 59.99, 59.99, 59.99, 59.99],
                MarketLeader: [72.99, 72.99, 72.99, 72.99, 72.99, 72.99, 72.99, 72.99, 72.99, 72.99, null],
                average: [69.49, 69.49, 69.49, 68.74, 68.74, 66.74, 66.74, 66.74, 66.12, 66.12, 66.12]
            }
        },
        marketShare: {
            labels: ['SoundMax', 'AudioTech', 'You', 'MarketLeader', 'Others'],
            data: [23, 18, 15, 12, 32]
        },
        bsrTrends: {
            labels: ['Nov 29', 'Nov 30', 'Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5'],
            data: {
                SoundMax: [1234, 1156, 1089, 982, 934, 892, 892],
                AudioTech: [1456, 1423, 1398, 1312, 1289, 1256, 1234],
                UltraSound: [4567, 3892, 3234, 2567, 1892, 1234, 892]
            }
        },
        movements: [
            {
                competitor: "SoundMax Pro X",
                asin: "B07ABC123",
                timestamp: "1.5 hours ago",
                type: "critical",
                badge: "Threat",
                changes: [
                    { icon: "💰", label: "Price Change", value: "$74.99 → $62.49 (-17%)", negative: true },
                    { icon: "📊", label: "BSR Movement", value: "#1,234 → #892 (⬆️ +342)", negative: true },
                    { icon: "📈", label: "Sales Velocity", value: "450 → 600 units/day (+33%)", positive: true }
                ]
            },
            {
                competitor: "MarketLeader Audio",
                asin: "B09GHI789",
                timestamp: "5 hours ago",
                type: "opportunity",
                badge: "Opportunity",
                changes: [
                    { icon: "📦", label: "Inventory Status", value: "In Stock → Out of Stock", positive: true },
                    { icon: "💵", label: "Available Demand", value: "~450 units/day ($16,200 opportunity)", neutral: true },
                    { icon: "⏱️", label: "Est. Restock", value: "7-14 days (based on history)", neutral: true }
                ]
            },
            {
                competitor: "AudioTech Elite",
                asin: "B08DEF456",
                timestamp: "3 hours ago",
                type: "critical",
                badge: "Threat",
                changes: [
                    { icon: "⭐", label: "Review Activity", value: "45 reviews in 7 days (+462%)", positive: true },
                    { icon: "📢", label: "Likely Cause", value: "Vine program or giveaway campaign", neutral: true }
                ]
            }
        ]
    },
    powerbank: {
        productName: "Portable Power Bank 20000mAh",
        asin: "B08ABC456",
        alertSummary: "5 competitors made changes in the last 24 hours • 2 price increases • 1 new feature • 1 stock-out",
        activityStats: {
            priceChanges: { count: 5, detail: "2 increases • Avg +8%" },
            reviewSpikes: { count: 1, detail: "PowerPlus +280%" },
            stockOuts: { count: 1, detail: "ChargeMax • 320 units/day" },
            newEntrants: { count: 1, detail: "MegaCharge Pro" },
            featureUpdates: { count: 2, detail: "Fast charge 2.0" },
            promotions: { count: 3, detail: "Up to 25% off" }
        },
        priceHistory: {
            labels: ['Nov 5', 'Nov 8', 'Nov 11', 'Nov 14', 'Nov 17', 'Nov 20', 'Nov 23', 'Nov 26', 'Nov 29', 'Dec 2', 'Dec 5'],
            yourPrice: [39.99, 39.99, 39.99, 39.99, 39.99, 39.99, 39.99, 39.99, 39.99, 39.99, 39.99],
            competitors: {
                Anker: [44.99, 44.99, 44.99, 44.99, 44.99, 44.99, 44.99, 44.99, 47.99, 47.99, 47.99],
                RAVPower: [42.99, 42.99, 42.99, 42.99, 42.99, 42.99, 42.99, 42.99, 42.99, 45.99, 45.99],
                PowerCore: [34.99, 34.99, 34.99, 34.99, 34.99, 34.99, 34.99, 34.99, 34.99, 34.99, 34.99],
                average: [40.74, 40.74, 40.74, 40.74, 40.74, 40.74, 40.74, 40.74, 41.74, 42.24, 42.24]
            }
        },
        marketShare: {
            labels: ['Anker', 'RAVPower', 'You', 'PowerCore', 'Others'],
            data: [28, 22, 18, 14, 18]
        },
        bsrTrends: {
            labels: ['Nov 29', 'Nov 30', 'Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5'],
            data: {
                Anker: [456, 445, 423, 412, 398, 387, 378],
                RAVPower: [789, 778, 756, 734, 723, 712, 698],
                PowerCore: [1234, 1198, 1167, 1145, 1123, 1098, 1076]
            }
        },
        movements: [
            {
                competitor: "Anker PowerCore",
                asin: "B08XYZ123",
                timestamp: "2 hours ago",
                type: "critical",
                badge: "Threat",
                changes: [
                    { icon: "💰", label: "Price Change", value: "$44.99 → $47.99 (+7%)", positive: false },
                    { icon: "⭐", label: "Feature Added", value: "Fast Charge 2.0 technology", neutral: true },
                    { icon: "📊", label: "BSR Movement", value: "#456 → #378 (⬆️ +78)", negative: true }
                ]
            }
        ]
    },
    phonecase: {
        productName: "Phone Case - Heavy Duty",
        asin: "B07DEF123",
        alertSummary: "4 competitors made changes • 1 price drop • 2 new designs • High promotion activity",
        activityStats: {
            priceChanges: { count: 4, detail: "1 drop • Avg -5%" },
            reviewSpikes: { count: 1, detail: "CaseX +180%" },
            stockOuts: { count: 0, detail: "None detected" },
            newEntrants: { count: 2, detail: "ArmorCase • ShieldPro" },
            featureUpdates: { count: 4, detail: "New colors/designs" },
            promotions: { count: 7, detail: "Up to 40% off" }
        },
        priceHistory: {
            labels: ['Nov 5', 'Nov 8', 'Nov 11', 'Nov 14', 'Nov 17', 'Nov 20', 'Nov 23', 'Nov 26', 'Nov 29', 'Dec 2', 'Dec 5'],
            yourPrice: [19.99, 19.99, 19.99, 19.99, 19.99, 19.99, 19.99, 19.99, 19.99, 19.99, 19.99],
            competitors: {
                OtterBox: [34.99, 34.99, 34.99, 34.99, 34.99, 34.99, 34.99, 34.99, 34.99, 34.99, 34.99],
                Spigen: [24.99, 24.99, 24.99, 24.99, 24.99, 24.99, 22.99, 22.99, 22.99, 22.99, 22.99],
                Caseology: [16.99, 16.99, 16.99, 16.99, 16.99, 16.99, 16.99, 16.99, 16.99, 16.99, 16.99],
                average: [24.24, 24.24, 24.24, 24.24, 24.24, 24.24, 23.74, 23.74, 23.74, 23.74, 23.74]
            }
        },
        marketShare: {
            labels: ['OtterBox', 'Spigen', 'You', 'Caseology', 'Others'],
            data: [32, 24, 16, 12, 16]
        },
        bsrTrends: {
            labels: ['Nov 29', 'Nov 30', 'Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5'],
            data: {
                OtterBox: [234, 228, 223, 218, 212, 207, 203],
                Spigen: [567, 556, 545, 534, 523, 512, 501],
                Caseology: [1234, 1223, 1212, 1198, 1187, 1176, 1165]
            }
        },
        movements: [
            {
                competitor: "Spigen Tough Armor",
                asin: "B07GHI456",
                timestamp: "4 hours ago",
                type: "critical",
                badge: "Threat",
                changes: [
                    { icon: "💰", label: "Price Change", value: "$24.99 → $22.99 (-8%)", negative: true },
                    { icon: "🎨", label: "New Colors", value: "Added 3 new color options", neutral: true }
                ]
            }
        ]
    }
};
