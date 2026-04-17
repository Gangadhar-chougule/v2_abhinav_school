"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/admin/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(username, password);

      if (result.success) {
        router.push("/admin/dashboard");
      } else {
        setError(result.error || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#effaf0_0%,#eef7ff_48%,#fff9e6_100%)] px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden rounded-[2rem] bg-[linear-gradient(145deg,#0f172a_0%,#164e63_45%,#1b5e20_100%)] p-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.28)] lg:block">
          <span className="section-kicker border-white/15 bg-white/8 text-white shadow-none">Admin Portal</span>
          <h1 className="mt-6 text-5xl font-extrabold leading-tight">Sant Dnyaneshwar Shikshan Sanstha</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/78">
            Secure access for school administration. Website functionality and backend flow remain unchanged.
          </p>
          <div className="mt-10 flex items-center gap-4 rounded-[1.5rem] border border-white/15 bg-white/10 p-5">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white/12 text-accent">
              <ShieldCheck size={26} />
            </span>
            <div>
              <p className="text-lg font-semibold">Authorized access only</p>
              <p className="mt-1 text-sm text-white/70">Use your existing admin credentials to continue.</p>
            </div>
          </div>
        </div>

        <div className="surface-card-strong mx-auto w-full max-w-md p-8 md:p-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <LockKeyhole size={18} />
            </span>
            Back to Website
          </Link>

          <div className="mt-8">
            <h2 className="text-3xl font-bold text-foreground">Admin Portal</h2>
            <p className="mt-2 text-sm text-muted-foreground">Sant Dnyaneshwar Shikshan Sanstha</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error ? (
              <div className="rounded-[1.2rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-semibold text-foreground">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="button-primary w-full rounded-2xl py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
