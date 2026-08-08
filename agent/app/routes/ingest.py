import uuid
import json
import datetime

from fastapi import APIRouter

from app.models.schema import LogRequest
from app.services.chroma_service import collection
from app.services.embedding_service import encode
from app.config import settings

router = APIRouter()


@router.post("/ingest")
async def ingest_log(data: LogRequest):
    """Ingest route: either enqueue to Kafka (`raw-logs`) or write directly to Chroma.

    Use the `use_kafka` flag in settings to enable the queued path.
    """
    if settings.use_kafka:
        # Minimal producer per-request (prototype). Replace with app-level producer for production.
        from aiokafka import AIOKafkaProducer

        producer = AIOKafkaProducer(bootstrap_servers=settings.kafka_bootstrap_servers)
        await producer.start()
        try:
            msg = {
                "id": str(uuid.uuid4()),
                "service": data.service,
                "log": data.log,
                "ts": datetime.datetime.utcnow().isoformat(),
            }
            await producer.send_and_wait(settings.kafka_topic_raw, json.dumps(msg).encode("utf-8"))
        finally:
            await producer.stop()
        return {"status": "queued", "id": msg["id"]}

    # Fallback: direct write to Chroma (existing behavior)
    collection.add(
        ids=[str(uuid.uuid4())],
        documents=[data.log],
        embeddings=[encode(data.log)],
        metadatas=[{"service": data.service}],
    )
    return {"status": "stored"}
