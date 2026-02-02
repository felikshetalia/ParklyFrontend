import { type ReactNode } from "react";

type FormSkeletonProps = {
  title: string;
  children: ReactNode;
  onSubmit: () => void;
  onCancel: () => void;
};
export const FormSkeleton = (formProps: FormSkeletonProps) => {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f7fa",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          padding: "24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "720px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <header>
            <h1
              style={{
                margin: 0,
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "#111827",
              }}
            >
              {formProps.title}
            </h1>
          </header>

          <form
            onSubmit={formProps.onSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {formProps.children}

            <div
              className="actions"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <button
                type="button"
                onClick={formProps.onCancel}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  color: "#374151",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
