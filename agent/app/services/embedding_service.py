from functools import lru_cache

from sentence_transformers import SentenceTransformer

from app.config import settings
import asyncio


@lru_cache
def get_embedding_model() -> SentenceTransformer:
    return SentenceTransformer(settings.embedding_model)


def encode(text: str) -> list[float]:
    return get_embedding_model().encode(text).tolist()


async def encode_async(text: str) -> list[float]:
    """Async wrapper around the sync encoder using a thread to avoid blocking the event loop."""
    return await asyncio.to_thread(encode, text)
