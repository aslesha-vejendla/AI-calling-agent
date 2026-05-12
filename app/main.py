from fastapi import FastAPI
from .routes.resume import router as resume_router
from .routes.session import router as session_router

app = FastAPI()
app.include_router(resume_router)
app.include_router(session_router)

@app.get("/")
def root():
    return {"message": "Interview Agent Running"}