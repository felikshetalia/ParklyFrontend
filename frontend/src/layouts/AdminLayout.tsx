import {
  type NavLinkRenderProps,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router";
import { BiBell } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { clearAuthInfo } from "../services/auth";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const linkClassName = ({ isActive }: NavLinkRenderProps) => {
    return isActive ? "activeLink" : "";
  };
  return (
    <>
      <div
        className="shell"
        style={{
          display: "flex",
          height: "100vh",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#f5f7fa",
          overflow: "hidden",
        }}
      >
        <aside
          style={{
            width: "240px",
            backgroundColor: "#0f172a",
            color: "#e5e7eb",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              flex: 1,
            }}
          >
            <NavLink className={linkClassName} to="/">
              Dashboard
            </NavLink>
            <NavLink className={linkClassName} to="/parkings">
              Parking lots
            </NavLink>
            <NavLink className={linkClassName} to="/bookings">
              Bookings
            </NavLink>
            <button
              onClick={() => {
                clearAuthInfo();
                navigate("/");
              }}
              style={{
                marginTop: "auto",
                padding: "10px 12px",
                borderRadius: "6px",
                background: "none",
                border: "none",
                fontWeight: 600,
                color: "#fca5a5",
                fontSize: "0.95rem",
                textAlign: "left",
                cursor: "pointer",
              }}
              className="logout-btn"
            >
              Log out
            </button>
          </nav>
        </aside>
        <div
          className="app-body"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          <header
            className="top-navbar"
            style={{
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            <div className="navbar-left">
              <button className="btn-toggle">Toggle</button>
            </div>

            <div className="navbar-right">
              <button className="notifications">
                <BiBell />
              </button>
              <button className="profile">
                <BsPerson />
              </button>
            </div>
          </header>
          <main
            style={{
              padding: "28px",
              overflow: "auto",
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
