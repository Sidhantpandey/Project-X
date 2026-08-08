import asyncio
import json
import logging

from aiokafka import AIOKafkaConsumer

from app.config import settings
from app.services.embedding_service import encode_async
from app.services.chroma_service import collection

logger = logging.getLogger("ingest_worker")


async def handle_message(msg_value: bytes) -> None:
    try:
        payload = json.loads(msg_value.decode("utf-8"))
        _id = payload.get("id")
        service = payload.get("service")
        text = payload.get("log")
        ts = payload.get("ts")

        # Compute embedding in a non-blocking way
        embedding = await encode_async(text)

        # Upsert into Chroma using the provided id
        collection.add(
            ids=[_id],
            documents=[text],
            embeddings=[embedding],
            metadatas=[{"service": service, "ts": ts}],
        )
        logger.info("Processed message id=%s service=%s", _id, service)
    except Exception:
        logger.exception("Failed to process message")


async def main() -> None:
    consumer = AIOKafkaConsumer(
        settings.kafka_topic_raw,
        bootstrap_servers=settings.kafka_bootstrap_servers,
        group_id="ingest-worker-group",
        enable_auto_commit=True,
        auto_offset_reset="earliest",
    )
    await consumer.start()
    logger.info("Ingest worker started, listening on topic %s", settings.kafka_topic_raw)
    try:
        async for msg in consumer:
            await handle_message(msg.value)
    finally:
        await consumer.stop()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())
