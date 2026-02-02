// import { useNavigate } from "react-router";
// import { useState, type FormEvent } from "react";
// import type { RegisterRequest } from "../../model/dto/auth_dto";
// import { registerPost, saveAuthInfo } from "../../services/auth";

// export const Register = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
//     const formData = new FormData(e.currentTarget);
//     if (!e.currentTarget.checkValidity()) {
//       e.currentTarget.reportValidity();
//       return;
//     }
//     const registerData: RegisterRequest = {
//       name: formData.get("name")!.toString(),
//       surname: formData.get("surname")!.toString(),
//       email: formData.get("email")!.toString(),
//       phoneNumber: formData.get("phoneNumber")!.toString(),
//       password: formData.get("password")!.toString(),
//     };
//     try {
//       const auth = await registerPost(registerData);
//       setLoading(true);
//       saveAuthInfo(auth);
//       navigate("/", { replace: true });
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Register failed");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <>
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           backgroundColor: "#f5f7fa",
//           fontFamily: "system-ui, sans-serif",
//         }}
//       >
//         {loading === true ? (
//           <p>Loading...</p>
//         ) : (
//           <form
//             style={{
//               width: "320px",
//               padding: "24px",
//               borderRadius: "8px",
//               backgroundColor: "#ffffff",
//               boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
//               display: "flex",
//               flexDirection: "column",
//               gap: "16px",
//             }}
//             onSubmit={(e) => {
//               e.preventDefault();
//               registerHandler(e);
//             }}
//           >
//             <h2
//               style={{
//                 textAlign: "center",
//                 marginBottom: "8px",
//               }}
//             >
//               Register as Administrator
//             </h2>

//             <label
//               style={{ display: "flex", flexDirection: "column", gap: "4px" }}
//             >
//               <span style={{ fontSize: "0.9rem", color: "#374151" }}>Name</span>
//               <input
//                 name="name"
//                 type="text"
//                 placeholder="Name"
//                 required
//                 style={{
//                   padding: "10px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "0.95rem",
//                 }}
//               />
//             </label>
//             <label
//               style={{ display: "flex", flexDirection: "column", gap: "4px" }}
//             >
//               <span style={{ fontSize: "0.9rem", color: "#374151" }}>
//                 Surname
//               </span>
//               <input
//                 name="surname"
//                 type="text"
//                 placeholder="Surname"
//                 required
//                 style={{
//                   padding: "10px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "0.95rem",
//                 }}
//               />
//             </label>
//             <label
//               style={{ display: "flex", flexDirection: "column", gap: "4px" }}
//             >
//               <span style={{ fontSize: "0.9rem", color: "#374151" }}>
//                 Email
//               </span>
//               <input
//                 name="email"
//                 type="email"
//                 placeholder="admin@example.com"
//                 required
//                 style={{
//                   padding: "10px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "0.95rem",
//                 }}
//               />
//             </label>
//             <label
//               style={{ display: "flex", flexDirection: "column", gap: "4px" }}
//             >
//               <span style={{ fontSize: "0.9rem", color: "#374151" }}>
//                 Phone number
//               </span>
//               <input
//                 name="phoneNumber"
//                 type="text"
//                 placeholder="+12345678900"
//                 required
//                 style={{
//                   padding: "10px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "0.95rem",
//                 }}
//               />
//             </label>

//             <label
//               style={{ display: "flex", flexDirection: "column", gap: "4px" }}
//             >
//               <span style={{ fontSize: "0.9rem", color: "#374151" }}>
//                 Password
//               </span>
//               <input
//                 name="password"
//                 type="password"
//                 required
//                 style={{
//                   padding: "10px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "0.95rem",
//                 }}
//               />
//             </label>

//             <button
//               type="submit"
//               style={{
//                 marginTop: "8px",
//                 padding: "10px",
//                 borderRadius: "6px",
//                 border: "none",
//                 backgroundColor: "#2563eb",
//                 color: "#ffffff",
//                 fontSize: "0.95rem",
//                 fontWeight: 500,
//                 cursor: "pointer",
//               }}
//             >
//               Register
//             </button>
//           </form>
//         )}
//       </div>
//     </>
//   );
// };
