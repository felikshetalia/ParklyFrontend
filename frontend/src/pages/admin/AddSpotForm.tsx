import { useNavigate, useParams } from "react-router";
import { useState, type FormEvent } from "react";
import type { CreateSpotRequest } from "../../model/dto/admin_inventory_dto";
import { addParkingSpot } from "../../services/admin/inventory";

const styleInput = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "0.95rem",
  outline: "none",
};

export const AddSpotForm = () => {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { parkingId } = useParams<{ parkingId?: string }>();
  const parseNumber = (v: FormDataEntryValue | null): number | undefined => {
    if (v === null) return undefined;
    const n = Number(v);
    return Number.isNaN(n) ? undefined : n;
  };

  const toBool = (v: FormDataEntryValue | null): boolean =>
    String(v) === "true";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    const data: CreateSpotRequest = {
      localId: formData.get("localId")?.toString()!,
      pricePerHour: parseNumber(formData.get("pricehr")) ?? 0,
      pricePerDay: parseNumber(formData.get("pricedy")),
      big: toBool(formData.get("big")),
      ev: toBool(formData.get("ev")),
      disabled: toBool(formData.get("disabled")),
    };

    try {
      await addParkingSpot(parkingId!, data);
      navigate(-1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Add spot failed");
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
              Add a new spot
            </h1>
          </header>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
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
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              Local ID
            </label>
            <input style={styleInput} type="text" id="localId" name="localId" />
            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              Price per hour
            </label>
            <input
              style={styleInput}
              type="number"
              id="pricehr"
              name="pricehr"
            />

            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              Price per day
            </label>
            <input
              style={styleInput}
              type="number"
              id="pricedy"
              name="pricedy"
            />

            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              Big
            </label>
            <select style={styleInput} id="big" name="big">
              <option value="true">True</option>
              <option value="false">False</option>
            </select>

            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              Ev
            </label>
            <select style={styleInput} id="ev" name="ev">
              <option value="true">True</option>
              <option value="false">False</option>
            </select>

            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              Disabled
            </label>
            <select style={styleInput} id="disabled" name="disabled">
              <option value="true">True</option>
              <option value="false">False</option>
            </select>

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
                onClick={() => navigate(-1)}
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
