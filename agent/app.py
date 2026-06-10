from fastapi import FastAPI

# Importing graph ensures it is constructed at startup
try:
    from main import graph  # noqa: F401
except Exception as e:
    # If graph import fails, still start server but log error
    print("Warning: failed to import graph:", e)

app = FastAPI()

@app.get('/health')
async def health():
    return {"status": "ok"}
