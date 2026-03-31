from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.videos_route import router as videos_router

app = FastAPI(title="Video Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(videos_router)

@app.get("/")
def root():
    return {"message": "API is running"}
