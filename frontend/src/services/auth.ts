import type { AuthResponse, LoginRequest } from "../model/dto/auth_dto";

export const loginPost = async (body: LoginRequest): Promise<AuthResponse> => {
  console.log("sending POST /api/auth/login", body);
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log(res.status, res.headers.get("location"));
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Login failed (${res.status}): ${err}`);
  }

  return (await res.json()) as AuthResponse;
};

// export const registerPost = async (
//   body: RegisterRequest,
// ): Promise<AuthResponse> => {
//   const res = await fetch("api/auth/register", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   if (!res.ok) {
//     const err = await res.text();
//     console.error("REGISTER FAILED:", res.status, err);
//     throw new Error(`Login failed (${res.status}): ${err}`);
//   }

//   return (await res.json()) as AuthResponse;
// };

export const saveAuthInfo = (auth: AuthResponse) => {
  localStorage.setItem("userId", auth.userId);
  localStorage.setItem("token", auth.token);
  localStorage.setItem("name", auth.name);
  localStorage.setItem("email", auth.email);
  localStorage.setItem("admin", String(auth.admin));
};

export const clearAuthInfo = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("admin");
};
