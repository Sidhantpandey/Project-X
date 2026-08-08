import { Kafka } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger.js';

const brokers = (process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092').split(',');
const topic = process.env.KAFKA_TOPIC_RAW || 'raw-logs';
const useKafka = (process.env.USE_KAFKA || 'false').toLowerCase() === 'true';
const PYTHON_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';

async function forwardToPython(service, log) {
  const resp = await fetch(`${PYTHON_URL}/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ service, log }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    logger.error({ msg: 'Python ingest failed', status: resp.status, body: text });
    throw new Error('python ingest failed');
  }

  return resp.json();
}

async function postLog(req, res) {
  const { service, log } = req.body;
  if (!service || !log) {
    return res.status(400).json({ success: false, message: 'service and log are required' });
  }

  const msg = { id: uuidv4(), service, log, ts: new Date().toISOString() };

  if (useKafka) {
    const kafka = new Kafka({ brokers });
    const producer = kafka.producer();

    try {
      await producer.connect();
      await producer.send({
        topic,
        messages: [{ key: msg.id, value: JSON.stringify(msg) }],
      });
      await producer.disconnect();

      logger.info({ msg: 'enqueued log', id: msg.id, service });
      return res.status(202).json({ success: true, id: msg.id });
    } catch (err) {
      logger.error({ err, msg: 'failed to enqueue log; falling back to python ingest' });
      try {
        await producer.disconnect();
      } catch (e) {
        // ignore
      }
    }
  }

  try {
    const data = await forwardToPython(msg.service, msg.log);
    logger.info({ msg: 'forwarded log to python', id: msg.id });
    return res.status(202).json({ success: true, forwarded: true, python: data });
  } catch (err) {
    logger.error({ err, msg: 'failed to forward to python ingest' });
    return res.status(500).json({ success: false, message: 'failed to forward to python' });
  }
}

export default { postLog };
