import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      setUser(data.user);
      navigate("/dashboard");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8fb] bg-[linear-gradient(#eef1f5_1px,transparent_1px),linear-gradient(90deg,#eef1f5_1px,transparent_1px)] bg-size-[32px_32px] text-slate-950">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-lg font-black text-white">
            W
          </span>
          <span className="text-lg font-semibold tracking-normal">
            WorkBoard
          </span>
        </Link>

        <Link
          to="/register"
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white"
        >
          Register
        </Link>
      </nav>

      <section className="mx-auto flex min-h-[calc(100vh-82px)] w-full max-w-xl items-center justify-center px-6 pb-10 pt-4">
        <div className="w-full rounded-xl bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Welcome back
            </p>
            <h1 className="text-3xl font-black tracking-normal text-slate-950">
              Login
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Continue to your WorkBoard rooms.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="min-h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-base font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="min-h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-base font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-12 w-full rounded-lg bg-blue-600 px-5 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-700">
              Register here
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
export default Login;
