import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await auth.register(name, email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="hidden lg:block">
          <div className="inline-flex px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <span className="text-blue-600 text-sm font-medium">AI Powered Log Analytics</span>
          </div>

          <h1 className="text-6xl font-bold leading-tight text-gray-900">
            Start analyzing
            <br />
            your server logs
            <br />
            with RAG intelligence.
          </h1>

          <p className="mt-8 text-lg text-gray-600 max-w-xl">
            Create an account to transform raw server logs into AI-generated incident reports, anomaly investigations, and knowledge-backed log search.
          </p>

          <div className="mt-12 flex items-center gap-4 flex-wrap">
            <div className="px-5 py-3 rounded-xl border bg-white shadow-sm">Logs</div>
            <span>→</span>
            <div className="px-5 py-3 rounded-xl border bg-white shadow-sm">RAG</div>
            <span>→</span>
            <div className="px-5 py-3 rounded-xl border bg-white shadow-sm">GPT</div>
            <span>→</span>
            <div className="px-5 py-3 rounded-xl border bg-white shadow-sm">Insights</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -left-10 h-72 w-72 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="relative bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
            <h2 className="text-3xl font-bold text-gray-900">Create your LogInsight account</h2>
            <p className="text-gray-500 mt-2">Join to unlock AI-based log analytics, RAG-powered context, and server incident intelligence instantly.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <div className="mt-2 relative">
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full pl-4 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="mt-2 relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="mt-2 relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-500">
              Already have an account? <Link to="/login" className="text-blue-600 font-medium">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
