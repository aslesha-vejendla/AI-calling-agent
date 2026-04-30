from fastapi import APIRouter

from app.api.routes import calls, health, resume, scripts, sessions

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(resume.router, prefix="/resume", tags=["resume"])
api_router.include_router(scripts.router, prefix="/scripts", tags=["scripts"])
api_router.include_router(sessions.router, prefix="/sessions", tags=["sessions"])
api_router.include_router(calls.router, prefix="/calls", tags=["calls"])
