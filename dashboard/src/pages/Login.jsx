import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.login();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="hidden lg:block">
          <div className="inline-flex px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <span className="text-blue-600 text-sm font-medium">AI Powered Log Analytics</span>
          </div>

          <h1 className="text-6xl font-bold leading-tight text-gray-900">
            AI-Powered Server Log
            <br />
            Insights for Ops
            <br />
            and SRE Teams.
          </h1>

          <p className="mt-8 text-lg text-gray-600 max-w-xl">
            Bring your server logs into a RAG-powered observability experience. LogInsight uses retrieval-augmented generation to surface root causes, anomalies, and incident summaries in seconds.
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
            <h2 className="text-3xl font-bold text-gray-900">Sign in to LogInsight</h2>
            <p className="text-gray-500 mt-2">Access AI-assisted log queries, server health insights, and the RAG knowledge layer for your platform.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="mt-2 relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
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
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition">
                Sign In
              </button>
            </form>

            <p className="mt-6 text-center text-gray-500">
              Don't have an account? <Link to="/register" className="text-blue-600 font-medium">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
