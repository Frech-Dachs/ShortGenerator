from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.assets_route import router as assets_router
from app.api.routes.auth_route import router as auth_router
from app.api.routes.protected_route import router as protected_router
from app.api.routes.videos_route import router as videos_router
from app.db.base import Base
from app.db.session import engine
from app.models.user_model import User

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(videos_router)
app.include_router(assets_router)
app.include_router(protected_router)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "API is running"}