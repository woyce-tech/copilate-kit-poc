"""
This is the main entry point for the agent.
It defines the workflow graph, state, tools, nodes and edges.
"""

from typing import List

from copilotkit import CopilotKitState
from langchain.tools import tool
from langchain_core.messages import BaseMessage, SystemMessage
from langchain_core.runnables import RunnableConfig
from langchain_openai import ChatOpenAI
from langgraph.graph import END, StateGraph
from langgraph.prebuilt import ToolNode
from langgraph.types import Command


class AgentState(CopilotKitState):
    proverbs: List[str]
    # Competitive Intelligence State
    currentProduct: str = "earbuds"
    competitors: List[dict] = []
    alerts: List[dict] = []
    insights: List[str] = []


@tool
def get_weather(location: str):
    """
    Get the weather for a given location.
    """
    return f"The weather for {location} is 70 degrees."


@tool
def analyze_competitor_threat(competitor_name: str):
    """
    Analyze a specific competitor to determine their threat level and provide strategic recommendations.
    
    Args:
        competitor_name: The name of the competitor to analyze (e.g., "SoundMax", "AudioTech")
    """
    # Mock analysis - in production, this would query real data
    threat_analyses = {
        "SoundMax": {
            "threat_level": "HIGH",
            "key_factors": [
                "17% price drop in last 24 hours",
                "BSR improved by 342 positions",
                "Sales velocity increased 33%"
            ],
            "recommendation": "Consider matching their price or highlighting your unique value propositions. Monitor closely for further aggressive moves."
        },
        "AudioTech": {
            "threat_level": "MEDIUM",
            "key_factors": [
                "462% spike in review velocity",
                "Likely running Vine program or giveaway",
                "Stable pricing"
            ],
            "recommendation": "Their review spike is artificial. Focus on organic review generation and highlight your authentic customer feedback."
        },
        "MarketLeader": {
            "threat_level": "LOW (OPPORTUNITY)",
            "key_factors": [
                "Out of stock",
                "450 units/day demand available",
                "$16,200 daily opportunity"
            ],
            "recommendation": "Increase PPC bids by 40% to capture their lost traffic. Consider running a promotion to convert their customers."
        }
    }
    
    analysis = threat_analyses.get(competitor_name, {
        "threat_level": "UNKNOWN",
        "key_factors": ["No recent data available"],
        "recommendation": "Monitor this competitor for any significant changes."
    })
    
    return f"""
Competitor Threat Analysis: {competitor_name}

Threat Level: {analysis['threat_level']}

Key Factors:
{chr(10).join(f"• {factor}" for factor in analysis['key_factors'])}

Strategic Recommendation:
{analysis['recommendation']}
"""


@tool
def get_pricing_recommendation(current_price: float, competitor_prices: str):
    """
    Get AI-powered pricing recommendations based on competitive landscape.
    
    Args:
        current_price: Your current product price
        competitor_prices: Comma-separated list of competitor prices (e.g., "62.49,69.99,59.99")
    """
    prices = [float(p.strip()) for p in competitor_prices.split(",")]
    avg_price = sum(prices) / len(prices)
    min_price = min(prices)
    max_price = max(prices)
    
    if current_price > avg_price * 1.1:
        strategy = "REDUCE"
        recommendation = f"Your price (${current_price}) is {((current_price/avg_price - 1) * 100):.1f}% above market average (${avg_price:.2f}). Consider reducing to ${avg_price:.2f} to stay competitive."
    elif current_price < avg_price * 0.9:
        strategy = "INCREASE"
        recommendation = f"You're underpriced at ${current_price} vs market average ${avg_price:.2f}. You could increase to ${avg_price * 0.95:.2f} and still be competitive while improving margins."
    else:
        strategy = "MAINTAIN"
        recommendation = f"Your price (${current_price}) is well-positioned at the market average (${avg_price:.2f}). Monitor competitor movements and maintain current pricing."
    
    return f"""
Pricing Strategy Recommendation

Current Price: ${current_price}
Market Average: ${avg_price:.2f}
Price Range: ${min_price} - ${max_price}

Strategy: {strategy}

Recommendation:
{recommendation}

Competitive Position: {"Premium" if current_price > avg_price else "Value" if current_price < avg_price else "Market-aligned"}
"""


@tool
def identify_market_opportunities():
    """
    Identify current market opportunities based on competitor movements and market conditions.
    """
    opportunities = [
        {
            "type": "Stock-Out Opportunity",
            "competitor": "MarketLeader Audio",
            "impact": "HIGH",
            "description": "MarketLeader is out of stock with 450 units/day demand. Estimated $16,200 daily revenue opportunity.",
            "action": "Increase PPC bids by 40% and target their keywords. Consider running a limited-time promotion."
        },
        {
            "type": "Price Gap",
            "competitor": "SoundMax",
            "impact": "MEDIUM",
            "description": "SoundMax dropped price to $62.49. Creates perception of value difference.",
            "action": "Either match their price or create a comparison chart highlighting your superior features to justify premium."
        },
        {
            "type": "Review Manipulation",
            "competitor": "AudioTech",
            "impact": "LOW",
            "description": "AudioTech's 462% review spike is likely artificial (Vine/giveaway).",
            "action": "Highlight authentic reviews and customer satisfaction. Report suspicious review activity if appropriate."
        }
    ]
    
    result = "Current Market Opportunities:\n\n"
    for i, opp in enumerate(opportunities, 1):
        result += f"{i}. {opp['type']} - {opp['impact']} Impact\n"
        result += f"   Competitor: {opp['competitor']}\n"
        result += f"   {opp['description']}\n"
        result += f"   Recommended Action: {opp['action']}\n\n"
    
    return result


@tool
def approve_price_change(newPrice: float, reason: str, competitor: str = "", currentPrice: float = 74.99, marginChange: str = "", expectedSalesChange: str = "", competitivePosition: str = ""):
    """
    Request approval for a price change with impact analysis. Use this when the user wants to change prices.
    
    Args:
        newPrice: The proposed new price
        reason: Reason for the price change
        competitor: Competitor name if matching their price (optional)
        currentPrice: Current product price (defaults to $74.99 for earbuds)
        marginChange: Estimated margin impact (optional, will be calculated if not provided)
        expectedSalesChange: Expected sales change (optional, will be calculated if not provided)
        competitivePosition: Competitive position after change (optional, will be calculated if not provided)
    """
    # Use provided currentPrice or default
    if currentPrice <= 0:
        currentPrice = 74.99
    
    # Calculate impact if not provided
    if not marginChange or not expectedSalesChange or not competitivePosition:
        price_change_pct = ((newPrice - currentPrice) / currentPrice) * 100
        margin_impact_pct = price_change_pct * 0.4
        
        if price_change_pct < 0:
            sales_impact = f"+{abs(price_change_pct * 1.5):.0f}% increase"
        else:
            sales_impact = f"-{price_change_pct * 1.2:.0f}% decrease"
        
        if newPrice < currentPrice:
            position = "More competitive, closer to market average"
        else:
            position = "Premium positioning, may lose price-sensitive customers"
        
        marginChange = f"{margin_impact_pct:+.1f}% margin impact"
        expectedSalesChange = sales_impact
        competitivePosition = position
    
    # This tool returns the data that will be passed to the frontend approval UI
    return {
        "currentPrice": currentPrice,
        "newPrice": newPrice,
        "competitor": competitor,
        "reason": reason,
        "marginChange": marginChange,
        "expectedSalesChange": expectedSalesChange,
        "competitivePosition": competitivePosition
    }


# Extract tool names from backend_tools for comparison
backend_tools = [
    get_weather,
    analyze_competitor_threat,
    get_pricing_recommendation,
    identify_market_opportunities,
    approve_price_change
]
backend_tool_names = [tool.name for tool in backend_tools]


async def chat_node(state: AgentState, config: RunnableConfig) -> Command[str]:
    # 1. Define the model
    # OPENAI_API_KEY is set via environment from CopilotKit runtime
    model = ChatOpenAI(model="gpt-4o-mini")

    # 2. Bind the tools to the model
    model_with_tools = model.bind_tools(
        [
            *state.get("copilotkit", {}).get("actions", []),
            *backend_tools,
        ],
        parallel_tool_calls=False,
    )

    # 3. Define the system message by which the chat model will be run
    competitive_context = f"""
You are a competitive intelligence AI assistant for Amazon sellers. 

Current Product: {state.get('currentProduct', 'earbuds')}
Active Alerts: {len(state.get('alerts', []))}
Insights Generated: {len(state.get('insights', []))}

You help sellers:
- Analyze competitor threats and opportunities
- Provide pricing strategy recommendations  
- Identify market opportunities
- Monitor competitive movements
- Generate actionable insights

The current proverbs are {state.get('proverbs', [])}.
"""
    
    system_message = SystemMessage(content=competitive_context)

    # 4. Run the model to generate a response
    response = await model_with_tools.ainvoke(
        [
            system_message,
            *state["messages"],
        ],
        config,
    )

    # only route to tool node if tool is not in the tools list
    if route_to_tool_node(response):
        print("routing to tool node")
        return Command(
            goto="tool_node",
            update={
                "messages": [response],
            },
        )

    # 5. We've handled all tool calls, so we can end the graph.
    return Command(
        goto=END,
        update={
            "messages": [response],
        },
    )


def route_to_tool_node(response: BaseMessage):
    """
    Route to tool node if any tool call in the response matches a backend tool name.
    """
    tool_calls = getattr(response, "tool_calls", None)
    if not tool_calls:
        return False

    for tool_call in tool_calls:
        if tool_call.get("name") in backend_tool_names:
            return True
    return False


# Define the workflow graph
workflow = StateGraph(AgentState)
workflow.add_node("chat_node", chat_node)
workflow.add_node("tool_node", ToolNode(tools=backend_tools))
workflow.add_edge("tool_node", "chat_node")
workflow.set_entry_point("chat_node")

graph = workflow.compile()
