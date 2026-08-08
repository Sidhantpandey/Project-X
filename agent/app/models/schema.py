from pydantic import BaseModel


class LogRequest(BaseModel):
    service: str
    log: str


class QueryRequest(BaseModel):
    query: str
    service: str | None = None


class AgenticQueryResponse(BaseModel):
    query: str
    answer: str
    contexts: list[str]
