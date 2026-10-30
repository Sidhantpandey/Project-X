# Project X

Project X is an AI-powered application consisting of multiple services for data ingestion, agent workflows, and dashboard management.

## Project Structure

```bash
Project X/
│
├── agent/       # AI agent logic and workflows
├── dashboard/   # Frontend dashboard application
├── ingestor/    # Data ingestion and processing service
└── README.md
```

## Overview

* **agent**: Handles AI interactions, orchestration, and automation workflows.
* **dashboard**: Provides the user interface for monitoring and management.
* **ingestor**: Processes and stores incoming data for downstream services.

## Getting Started

Clone the repository:

```bash
git clone <repository-url>
cd Project42AR
```

Install dependencies for each service:

```bash
cd agent && npm install
cd ../dashboard && npm install
cd ../ingestor && npm install
```

Run services individually:

```bash
npm run dev
```

## Tech Stack

Node.js
React
AI/LLM Integrations
Vector Databases and RAG Pipelines



## Why Node.js and Pino for the Ingestor

The ingestor mainly handles log files and streams data in real time, which is an I/O-heavy task. Node.js is a great fit for this because it uses a non-blocking event loop, allowing it to efficiently watch files and process incoming logs without blocking the application or creating extra threads.

Instead of constantly checking files for updates, Node.js can react immediately when new logs are written.


Node.js is used for real-time and I/O-heavy tasks such as:


log ingestion
streaming
socket connections
API gateways
event-driven workflows


Its non-blocking event loop makes it very efficient for handling many concurrent operations.

Python is used for AI and data-processing workloads such as:

machine learning
embeddings
RAG pipelines
NLP
model inference
data analysis


Keeping them separate gives several advantages:

Better performance for each workload
Independent scaling of services
Cleaner architecture and separation of concerns
Easier maintenance and deployment
Ability to use the best ecosystem for each task


## Typical Flow 

```bash
Node.js Ingestor
      |
      v
Message Queue / API
      |
      v
Python AI Service
      |
      v
Vector DB / LLM Response
```
<img width="1440" height="1640" alt="image" src="https://github.com/user-attachments/assets/18752b78-844d-42ab-ba81-d23d33c07683" />
