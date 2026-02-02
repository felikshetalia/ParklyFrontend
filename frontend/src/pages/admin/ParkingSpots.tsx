import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { useNavigate, useParams } from "react-router";
import type { SpotResponse } from "../../model/dto/admin_inventory_dto";
import { useEffect, useState } from "react";
import {
  deleteParkingSpot,
  getParkingSpots,
} from "../../services/admin/inventory";

export const ParkingSpots = () => {
  const [parkingSpotsList, setParkingSpotsList] = useState<SpotResponse[]>([]);
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();
  const { parkingId } = useParams();
  useEffect(() => {
    if (!parkingId) return;
    getParkingSpots(parkingId).then(setParkingSpotsList).catch(console.error);
  }, []);

  const deleteSpotHandler = async (id: string) => {
    try {
      await deleteParkingSpot(id);
      if (parkingId) setParkingSpotsList(await getParkingSpots(parkingId));
      navigate(-1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete spot failed");
      console.error(err);
    }
  };
  return (
    <>
      <h2>Parking spots</h2>
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
      <section
        className="top-row"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div className="search-bar">
          <input type="text"></input>
        </div>
        <div className="search-filter">
          <button>Filter</button>
        </div>
        <div className="add-spot">
          <button onClick={() => navigate("new")}>Add new spot</button>
        </div>
      </section>
      <section
        className="parking-spots"
        style={{
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <div className="spots-table">
          <table>
            <thead>
              <tr>
                <th>SpotID</th>
                <th>Local ID</th>
                <th>Price/hr</th>
                <th>Price/day</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parkingSpotsList.map((p) => (
                <tr key={p.spotId} style={{ cursor: "pointer" }}>
                  <td>{p.spotId}</td>
                  <td>{p.localId}</td>
                  <td>{p.pricePerHour}</td>
                  <td>{p.pricePerDay}</td>
                  <td>{p.active ? "Active" : "Disabled"}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSpotHandler(p.spotId);
                      }}
                    >
                      <BiTrash />
                    </button>
                    <button
                      className="btn-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`${p.spotId}/edit`);
                      }}
                    >
                      <BiSolidPencil />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
