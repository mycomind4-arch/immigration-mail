import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — Immigration Mail" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSignUp) {
        const res = await signUp(email, password);
        if (res?.error) {
          setError(res.error.message || "Failed to sign up.");
        } else {
          navigate({ to: "/dashboard" });
        }
      } else {
        const res = await signIn(email, password);
        if (res?.error) {
          setError(res.error.message || "Invalid email or password.");
        } else {
          navigate({ to: "/dashboard" });
        }
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid overflow-hidden rounded-2xl border border-rule md:grid-cols-2">
          {/* Left panel: Dark gradient with benefits list */}
          <div
            className="p-8 md:p-10"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.25 0.05 260) 0%, oklch(0.2 0.04 258) 100%)",
            }}
          >
            <div
              className="postmark w-fit"
              style={{
                borderColor: "rgba(255,255,255,.2)",
                color: "oklch(0.75 0.08 72)",
                background: "rgba(255,255,255,.05)",
              }}
            >
              Immigration Mail
            </div>
            <h1 className="mt-8 font-serif text-3xl text-white">
              Your correspondence, organized and sent.
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Create an account to save drafts, track mailings, and keep a
              permanent record of your correspondence.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Save and resume workflows",
                "Track all mailings in one place",
                "Keep proof of timely submission",
                "Re-use recipient addresses",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <svg
                    className="h-4 w-4 text-stamp"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right panel: Authentication form */}
          <div className="flex flex-col justify-center bg-card p-8 md:p-10">
            <h2 className="font-serif text-2xl">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignUp
                ? "Enter your details below to create your account."
                : "Enter your credentials to sign in to your account."}
            </p>

            {error && (
              <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label className="input-label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  className="input-field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="input-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  className="input-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting || authLoading || !email.trim() || !password.trim()
                }
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-stamp transition-transform hover:-translate-y-0.5 disabled:opacity-30 disabled:transform-none disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {isSignUp ? "Creating account..." : "Signing in..."}
                  </span>
                ) : isSignUp ? (
                  "Create account →"
                ) : (
                  "Sign in →"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="font-medium text-stamp underline hover:text-foreground cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="font-medium text-stamp underline hover:text-foreground cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>
              )}
            </div>

            <p className="mt-5 text-xs text-muted-foreground text-center">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-stamp hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-stamp hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
