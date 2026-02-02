import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import type { LoginRequest } from "../../model/dto/auth_dto";
import { loginPost, saveAuthInfo } from "../../services/auth";

export const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    setError(null);
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    const loginData: LoginRequest = {
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
    };
    setLoading(true);
    try {
      const auth = await loginPost(loginData);
      saveAuthInfo(auth);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Register failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f7fa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <form
          style={{
            width: "320px",
            padding: "24px",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler(e);
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            Admin Login
          </h2>

          {error && (
            <div
              role="alert"
              aria-live="assertive"
              style={{
                padding: "10px 12px",
                borderRadius: "8px",
                backgroundColor: "#fee2e2",
                color: "#991b1b",
                border: "1px solid #fecaca",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </div>
          )}

          <label
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span style={{ fontSize: "0.9rem", color: "#374151" }}>Email</span>
            <input
              name="email"
              type="email"
              placeholder="admin@example.com"
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "0.95rem",
              }}
            />
          </label>

          <label
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span style={{ fontSize: "0.9rem", color: "#374151" }}>
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "0.95rem",
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              marginTop: "8px",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontSize: "0.95rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </>
  );
};
