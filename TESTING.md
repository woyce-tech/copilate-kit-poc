# Competitive Intelligence Dashboard - Test Cases

## 🧪 Basic Test Cases

### Test Case 1: Threat Analysis
**Query:** `"Which competitor is the biggest threat right now?"`

**Expected Behavior:**
- AI analyzes current competitor data
- Identifies SoundMax Pro X as the biggest threat
- Mentions key factors: 17% price drop, BSR improvement (+342), sales velocity increase (+33%)
- Provides strategic recommendation

**Success Criteria:**
- ✅ AI responds within 3 seconds
- ✅ Response mentions SoundMax
- ✅ Response includes specific metrics
- ✅ Provides actionable recommendation

---

### Test Case 2: Pricing Recommendation
**Query:** `"Should I adjust my pricing? My current price is $74.99 and competitors are at 62.49, 69.99, 59.99"`

**Expected Behavior:**
- AI calls `get_pricing_recommendation` tool
- Calculates market average ($64.16)
- Determines your price is ~17% above average
- Suggests REDUCE strategy

**Success Criteria:**
- ✅ Tool call visible in logs: `get_pricing_recommendation`
- ✅ Response includes market average calculation
- ✅ Clear strategy recommendation (REDUCE/INCREASE/MAINTAIN)
- ✅ Specific price target suggested

---

### Test Case 3: Market Opportunities
**Query:** `"What market opportunities are available right now?"`

**Expected Behavior:**
- AI calls `identify_market_opportunities` tool
- Lists 3 opportunities:
  1. Stock-Out Opportunity (MarketLeader - HIGH impact)
  2. Price Gap (SoundMax - MEDIUM impact)
  3. Review Manipulation (AudioTech - LOW impact)
- Provides recommended actions for each

**Success Criteria:**
- ✅ Tool call visible: `identify_market_opportunities`
- ✅ All 3 opportunities listed
- ✅ Impact levels specified
- ✅ Action recommendations included

---

### Test Case 4: Competitor Deep Dive
**Query:** `"Analyze the SoundMax competitor threat in detail"`

**Expected Behavior:**
- AI calls `analyze_competitor_threat` with parameter "SoundMax"
- Returns threat level: HIGH
- Lists key factors (price drop, BSR movement, sales velocity)
- Provides strategic recommendation

**Success Criteria:**
- ✅ Tool call with correct parameter
- ✅ Threat level clearly stated
- ✅ Minimum 3 key factors listed
- ✅ Actionable strategy provided

---

### Test Case 5: Product Switching (Frontend Tool)
**Query:** `"Switch to monitoring the power bank product"`

**Expected Behavior:**
- AI calls `switchProduct` frontend tool with parameter "powerbank"
- Dashboard updates to show Power Bank data
- Charts refresh with new competitor data (Anker, RAVPower, PowerCore)
- Activity stats update

**Success Criteria:**
- ✅ Frontend tool called successfully
- ✅ Product dropdown changes to Power Bank
- ✅ Charts display new data
- ✅ Competitor cards show Anker, RAVPower, PowerCore
- ✅ No page reload required

---

### Test Case 6: Alert Creation (Frontend Tool)
**Query:** `"Set an alert for when MarketLeader restocks"`

**Expected Behavior:**
- AI calls `setCompetitorAlert` frontend tool
- Parameters: competitor="MarketLeader", condition="restock"
- New alert appears in "Active Alerts" section
- Browser alert confirmation shown

**Success Criteria:**
- ✅ Frontend tool called with correct parameters
- ✅ Alert appears in Active Alerts section
- ✅ Alert shows competitor name and condition
- ✅ Alert badge shows "Active" status

---

## 🚀 Advanced Test Cases

### Test Case 7: Multi-Step Analysis with Context
**Query Sequence:**
1. `"What's the current situation with the earbuds market?"`
2. `"Which competitor should I be most worried about?"`
3. `"What specific action should I take today?"`

**Expected Behavior:**
- AI maintains conversation context across queries
- First query: Provides market overview (8 competitors, 3 price drops, 2 new entrants)
- Second query: Identifies SoundMax as top threat
- Third query: Provides specific, actionable recommendation (e.g., "Match SoundMax price or increase PPC by 40%")

**Success Criteria:**
- ✅ AI remembers context from previous messages
- ✅ Responses build on each other logically
- ✅ Final recommendation is specific and actionable
- ✅ No repeated information across responses

---

### Test Case 8: Cross-Product Comparison (NEW!)
**Query:** `"Compare the competitive landscape between earbuds and power banks. Which market is more competitive?"`

**Expected Behavior:**
- AI analyzes data from both products
- Compares key metrics:
  - Number of active competitors
  - Price volatility (earbuds: 3 drops, powerbank: 2 increases)
  - Market concentration (earbuds: more fragmented, powerbank: Anker dominates)
  - Threat level (earbuds: higher with SoundMax aggression)
- Provides comparative analysis
- Recommends which market needs more attention

**Success Criteria:**
- ✅ AI references both product datasets
- ✅ Specific metrics compared (price changes, market share, BSR trends)
- ✅ Clear conclusion about which market is more competitive
- ✅ Strategic recommendation (e.g., "Focus on earbuds defense, powerbank is stable")
- ✅ Response includes data from both MOCK_DATA.earbuds and MOCK_DATA.powerbank

**How to Verify:**
1. Ask the query
2. Check that response mentions both products
3. Look for specific numbers from both datasets
4. Verify recommendation makes sense based on data
5. Optionally switch products to verify data accuracy

---

### Test Case 9: Insight Generation (Frontend Tool)
**Query:** `"Generate an insight about the current competitive situation and add it to my dashboard"`

**Expected Behavior:**
- AI analyzes current market data
- Generates a strategic insight (e.g., "SoundMax's aggressive pricing suggests they're clearing inventory for a new product launch")
- Calls `addInsight` frontend tool
- Insight appears in "AI-Generated Insights" section on dashboard

**Success Criteria:**
- ✅ AI generates unique, data-driven insight
- ✅ `addInsight` tool called successfully
- ✅ New section "AI-Generated Insights" appears on dashboard
- ✅ Insight is actionable and specific
- ✅ Insight persists on page (doesn't disappear)

---

## 📊 Performance Test Cases

### Test Case 10: Response Time
**Query:** `"Quick analysis: biggest threat?"`

**Expected Behavior:**
- AI responds within 2 seconds
- Uses cached data efficiently
- Provides concise answer

**Success Criteria:**
- ✅ Response time < 2 seconds
- ✅ Answer is accurate despite brevity
- ✅ No unnecessary tool calls

---

### Test Case 11: Error Handling
**Query:** `"Analyze competitor XYZ123"` (non-existent competitor)

**Expected Behavior:**
- AI gracefully handles unknown competitor
- Provides helpful response (e.g., "I don't have data for XYZ123. Current competitors are: SoundMax, AudioTech, BassBoost, MarketLeader")
- Suggests valid alternatives

**Success Criteria:**
- ✅ No error thrown
- ✅ Helpful error message
- ✅ Lists available competitors
- ✅ Maintains conversation flow

---

## 🎯 Integration Test Cases

### Test Case 12: Full Workflow
**Complete User Journey:**
1. Open dashboard at `/competitive-intelligence`
2. Ask: `"What's the biggest opportunity?"`
3. AI identifies MarketLeader stock-out
4. Ask: `"Set an alert for this"`
5. Alert created and visible
6. Ask: `"Switch to power bank"`
7. Dashboard updates
8. Ask: `"Any threats here?"`
9. AI analyzes power bank market

**Success Criteria:**
- ✅ All steps complete without errors
- ✅ State persists across interactions
- ✅ UI updates reflect AI actions
- ✅ Conversation context maintained
- ✅ Total time < 30 seconds

---

## 📝 Test Execution Checklist

Before each test:
- [ ] Clear browser cache
- [ ] Restart dev server (`pnpm dev`)
- [ ] Verify both UI and agent are running
- [ ] Open browser console to monitor tool calls

During test:
- [ ] Note response time
- [ ] Check for tool calls in logs
- [ ] Verify UI updates
- [ ] Screenshot any issues

After test:
- [ ] Document actual vs expected behavior
- [ ] Note any performance issues
- [ ] Check for console errors
- [ ] Verify data accuracy

---

## 🔍 Debugging Tips

**If AI doesn't call tools:**
- Check agent logs for errors
- Verify OpenAI API key is set
- Ensure tool descriptions are clear

**If frontend tools don't work:**
- Check browser console for errors
- Verify CopilotKit connection
- Check state updates in React DevTools

**If data is incorrect:**
- Verify [mockData.ts](file:///Users/hardikdevmurari/Work/murli/product/src/lib/competitive/mockData.ts)
- Check product selector value
- Ensure state is syncing properly

---

## 📈 Success Metrics

**Overall Integration Health:**
- ✅ 100% of basic test cases pass
- ✅ 80%+ of advanced test cases pass
- ✅ Average response time < 3 seconds
- ✅ Zero critical errors
- ✅ All frontend tools functional
- ✅ All backend tools functional

**Ready for Production When:**
- All test cases documented ✅
- All basic tests passing ✅
- Advanced tests passing ✅
- Performance acceptable ✅
- Error handling robust ✅
- User experience smooth ✅
