from __future__ import annotations

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.schemas import (
    RenderedScriptResponse,
    ScriptCreatePayload,
    ScriptRenderPayload,
    ScriptResponse,
    ScriptUpdatePayload,
)
from app.services.script_service import ScriptService

router = APIRouter()
service = ScriptService()


def _to_response(script) -> ScriptResponse:
    return ScriptResponse(
        id=script.id,
        name=script.name,
        description=script.description,
        status=script.status.value,
        language=script.language,
        variables=script.variables,
        sections=script.sections,
        created_at=script.created_at,
        updated_at=script.updated_at,
    )


@router.get("", response_model=list[ScriptResponse])
def list_scripts(db: Session = Depends(get_db)) -> list[ScriptResponse]:
    return [_to_response(script) for script in service.list_scripts(db)]


@router.post("", response_model=ScriptResponse, status_code=status.HTTP_201_CREATED)
def create_script(payload: ScriptCreatePayload, db: Session = Depends(get_db)) -> ScriptResponse:
    return _to_response(service.create_script(db, payload))


@router.get("/{script_id}", response_model=ScriptResponse)
def get_script(script_id: str, db: Session = Depends(get_db)) -> ScriptResponse:
    return _to_response(service.get_script(db, script_id))


@router.put("/{script_id}", response_model=ScriptResponse)
def update_script(
    script_id: str,
    payload: ScriptUpdatePayload,
    db: Session = Depends(get_db),
) -> ScriptResponse:
    return _to_response(service.update_script(db, script_id, payload))


@router.post("/{script_id}/render", response_model=RenderedScriptResponse)
def render_script(
    script_id: str,
    payload: ScriptRenderPayload,
    db: Session = Depends(get_db),
) -> RenderedScriptResponse:
    script = service.get_script(db, script_id)
    rendered = service.render_sections(script, payload.variables)
    return RenderedScriptResponse(script_id=script.id, variables=payload.variables, sections=rendered)
