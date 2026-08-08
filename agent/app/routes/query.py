from fastapi import APIRouter, Depends, HTTPException

from app.config import settings
from app.models.schema import AgenticQueryResponse, QueryRequest
from app.services.chroma_service import collection
from app.services.embedding_service import encode
from app.services.gpt_service import generate_rag_answer

router = APIRouter()


def _build_query_kwargs(data: QueryRequest) -> dict:
    kwargs = {
        "query_embeddings": [encode(data.query)],
        "n_results": settings.query_n_results,
    }
    if data.service:
        kwargs["where"] = {"service": data.service}
    return kwargs


@router.post("/query")
async def query_logs(data: QueryRequest):
    results = collection.query(**_build_query_kwargs(data))
    return results


@router.post("/query/agentic", response_model=AgenticQueryResponse)
async def query_logs_agentic(data: QueryRequest):
    results = collection.query(**_build_query_kwargs(data))

    documents = results.get("documents", [])
    contexts = documents[0] if documents else []

    if not contexts:
        return AgenticQueryResponse(
            query=data.query,
            answer="No relevant context found in the vector database for the selected service.",
            contexts=[],
        )

    try:
        answer = await generate_rag_answer(query=data.query, contexts=contexts)
    except ValueError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=502, detail=f"LLM API call failed: {str(exc)}"
        ) from exc

    return AgenticQueryResponse(query=data.query, answer=answer, contexts=contexts)
