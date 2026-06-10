# Human-in-the-Loop Feature - Test Guide

## 🎯 Feature: Price Change Approval Workflow

### What It Does
When the AI recommends a price change, it doesn't execute immediately. Instead, it shows you a beautiful approval card with:
- Current vs. New price comparison
- Reason for the change
- Impact analysis (margin, sales, competitive position)
- Approve/Reject buttons

This demonstrates **safety** and **human oversight** in AI decision-making.

---

## 🧪 How to Test

### Test Query 1: Simple Price Match Request
**Say:** `"Match SoundMax's price of $62.49"`

**Expected Flow:**
1. AI calls `request_price_change` tool
2. Approval card appears in chat showing:
   - Current: $74.99 → New: $62.49 (-17%)
   - Reason: Matching SoundMax
   - Margin Impact: -6.8%
   - Expected Sales: +25% increase
   - Competitive Position: More competitive
3. You see **Approve** and **Reject** buttons
4. Click **Approve** → AI confirms price change
5. Click **Reject** → AI acknowledges and maintains current price

---

### Test Query 2: AI-Suggested Price Change
**Say:** `"I think I should lower my price to compete better. What do you recommend?"`

**Expected Flow:**
1. AI analyzes market
2. Suggests optimal price (e.g., $65)
3. Calls `request_price_change`
4. Approval card appears
5. You review impact and approve/reject

---

### Test Query 3: Competitor-Triggered Price Change
**Say:** `"SoundMax just dropped their price. Should I respond?"`

**Expected Flow:**
1. AI analyzes threat
2. Recommends matching or strategic response
3. Requests approval with full impact analysis
4. You make informed decision

---

## 📸 What You'll See

The approval card will look like this:

```
⚠️ Price Change Approval Required
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Price        →    New Price
$74.99                    $62.49
                          -17%

Reason: Matching SoundMax (Matching SoundMax)

Impact Analysis
├─ Margin Impact: -6.8% margin impact
├─ Expected Sales: +26% increase
└─ Competitive Position: More competitive, closer to market average

[❌ Reject]  [✅ Approve Price Change]
```

---

## 🎨 Visual Features

- **Pending State**: Orange border, waiting for your decision
- **Approved State**: Green border, confirmation message
- **Rejected State**: Red border, maintains current price
- **Price Comparison**: Visual before/after with percentage change
- **Impact Grid**: Clear breakdown of business impact

---

## 💡 Why This is Impressive for POC

1. **Safety First**: Shows AI won't make critical business decisions without approval
2. **Transparency**: Full impact analysis before you decide
3. **Professional UI**: Beautiful, polished approval interface
4. **Real Business Value**: Prevents costly pricing mistakes
5. **Trust Building**: Clients see AI as a smart assistant, not a rogue agent

---

## 🚀 Advanced Test Scenarios

### Scenario 1: Multiple Price Changes
1. Request price change for earbuds
2. Approve it
3. Switch to power bank
4. Request another price change
5. Reject it
6. Both actions are tracked independently

### Scenario 2: Price Increase (Risky)
**Say:** `"I want to increase my price to $85"`

AI will show:
- Margin Impact: +4% (positive!)
- Expected Sales: -13% decrease (negative!)
- Competitive Position: Premium, may lose customers
- You can make informed decision

---

## 🔧 Technical Details

**Frontend:**
- `useHumanInTheLoop` hook from CopilotKit
- Custom `PriceChangeApproval` component
- Status tracking: pending → approved/rejected

**Backend:**
- `request_price_change` tool
- Automatic impact calculation
- Returns structured data for UI

**State Flow:**
```
User Query → AI Analysis → Tool Call → Approval Card → 
User Decision → AI Confirmation → State Update
```

---

## ✅ Success Criteria

- [ ] Approval card appears in chat
- [ ] All impact metrics are calculated correctly
- [ ] Approve button works and confirms change
- [ ] Reject button works and maintains current price
- [ ] Visual states (pending/approved/rejected) display correctly
- [ ] Multiple approvals can be handled in same session

---

## 🎯 Demo Script for Clients

**Opening:** "Let me show you how our AI handles critical business decisions safely."

**Step 1:** "Watch what happens when I ask the AI to match a competitor's price..."
- Type: `"Match SoundMax's price"`

**Step 2:** "Notice the AI doesn't just change the price. It shows me the full impact first."
- Point out margin impact, sales forecast, competitive position

**Step 3:** "I can review this analysis and make an informed decision."
- Click Approve or Reject based on scenario

**Step 4:** "This ensures AI is smart but safe - it always gets human approval for big decisions."

**Closing:** "This is just one example. We can add approval workflows for budget changes, campaign launches, or any critical action."

---

## 🔮 Next Steps

After Human-in-the-Loop is working, we can add:
1. **Generative UI** - AI creates custom comparison tables
2. **Contextual Suggestions** - Smart suggestions based on dashboard state
3. **Streaming Progress** - Show AI "thinking" process
4. **Tool Call Visibility** - Show when AI is using tools

---

Ready to test! Just say one of the test queries above and watch the magic happen! ✨
