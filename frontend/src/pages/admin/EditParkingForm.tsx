import { useNavigate, useParams } from "react-router";
import { useEffect, useState, type FormEvent } from "react";
import type {
  ParkingResponse,
  UpdateParkingRequest,
} from "../../model/dto/admin_inventory_dto";
import {
  getParkingsList,
  updateParkingFacility,
} from "../../services/admin/inventory";

const styleInput = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "0.95rem",
  outline: "none",
};

export const EditParkingForm = () => {
  const startDate = new Date("2030-01-01T00:00:00Z").toISOString();
  const endDate = new Date("2030-02-02T00:00:00Z").toISOString();

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [currentParking, setCurrentParking] = useState<ParkingResponse | null>(
    null,
  );
  const { parkingId } = useParams<{
    parkingId?: string;
    spotId?: string;
  }>();

  useEffect(() => {
    if (!parkingId) return;
    let mounted = true;
    (async () => {
      try {
        const parkings = await getParkingsList(startDate, endDate);
        const found = parkings.find((p) => p.id === parkingId) ?? null;
        if (mounted) setCurrentParking(found);
      } catch (err) {
        console.error(err);
        if (mounted)
          setError(err instanceof Error ? err.message : "Failed to load spot");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [parkingId]);
  const parseNumber = (v: FormDataEntryValue | null): number | undefined => {
    if (v === null) return undefined;
    const n = Number(v);
    return Number.isNaN(n) ? undefined : n;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError(null);
    const formData = new FormData(e.currentTarget);
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    const data: UpdateParkingRequest = {
      name: formData.get("name")?.toString()!,
      city: formData.get("city")?.toString()!,
      country: formData.get("country")?.toString()!,
      postalCode: formData.get("postalCode")?.toString()!,
      streetName: formData.get("streetName")?.toString()!,
      streetNumber: formData.get("streetNumber")?.toString()!,
      lat: parseNumber(formData.get("lat")) ?? 0,
      lon: parseNumber(formData.get("lon")) ?? 0,
      mainPhotoId: formData.get("imgUrl")?.toString().slice(0, 36)!,
    };

    try {
      await updateParkingFacility(parkingId!, data);
      navigate(-1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Add spot failed");
    }
  };
  if (!currentParking) return <div>Parking facility not found</div>;
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
              Edit spot
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
              Name
            </label>
            <input
              defaultValue={currentParking.name}
              style={styleInput}
              type="text"
              id="name"
              name="name"
            />
            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              City
            </label>
            <input
              defaultValue={currentParking.city}
              style={styleInput}
              type="text"
              id="city"
              name="city"
            />

            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              Street name
            </label>
            <input
              defaultValue={currentParking.streetName}
              type="text"
              style={styleInput}
              id="streetName"
              name="streetName"
            />

            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              Street no.
            </label>
            <input
              defaultValue={currentParking.streetNumber}
              type="text"
              style={styleInput}
              id="streetNumber"
              name="streetNumber"
            />

            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              Latitude
            </label>
            <input
              defaultValue={currentParking.latitude}
              type="number"
              style={styleInput}
              id="lat"
              name="lat"
            />
            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              Longitude
            </label>
            <input
              defaultValue={currentParking.longitude}
              type="number"
              style={styleInput}
              id="lon"
              name="lon"
            />
            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              Photo URL
            </label>
            <input
              defaultValue={"*png, *jpg"}
              type="text"
              style={styleInput}
              id="imgUrl"
              name="imgUrl"
            />
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
