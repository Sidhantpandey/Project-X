import React, { useState } from "react";
import axiosInstance from "../../config/axios";

const serviceOptions = ["All services", "svc1", "auth-service", "payment-service", "inventory-service", "checkout-service"];

const LogsDashboard = () => {
  const [queryText, setQueryText] = useState("What caused the login failure?");
  const [selectedService, setSelectedService] = useState("All services");
  const [loading, setLoading] = useState(false);
  const [queryResult, setQueryResult] = useState(null);
  const [error, setError] = useState("");

  const handleQuery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setQueryResult(null);

    try {
      const payload = {
        query: queryText,
        service: selectedService === "All services" ? undefined : selectedService,
      };
      const response = await axiosInstance.post("/query/agentic", payload);
      setQueryResult(response.data);
    } catch (err) {
      setError(err?.response?.data?.detail || err?.message || "Query failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Agentic Query Dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Ask the RAG system about a selected microservice</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Logs are ingested automatically into Chroma. Use the dropdown below to target a specific microservice before asking your question.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleQuery} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Microservice</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Question</label>
              <textarea
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                placeholder="Ask about an error, incident, or service behavior"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Querying..." : "Run agentic query"}
            </button>
          </form>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {queryResult && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Agentic response</h3>
              <div className="mt-3 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">Answer</h4>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{queryResult.answer}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">Contexts</h4>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
                    {Array.isArray(queryResult.contexts) && queryResult.contexts.length > 0 ? (
                      queryResult.contexts.map((ctx, idx) => <li key={`${ctx}-${idx}`}>{ctx}</li>)
                    ) : (
                      <li>No context returned.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default LogsDashboard;
