import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ParkingResponse } from "../../model/dto/admin_inventory_dto";
import { getParkingsList } from "../../services/admin/inventory";
import { BiSolidPencil } from "react-icons/bi";

export default function ParkingsListPage() {
  const startDate = new Date("2026-01-01T00:00:00Z").toISOString();
  const endDate = new Date("2026-02-02T00:00:00Z").toISOString();

  const [parkingList, setParkingList] = useState<ParkingResponse[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getParkingsList(startDate, endDate)
      .then(setParkingList)
      .catch(console.error);
  }, []);
  return (
    <>
      <h2>Parking lots</h2>
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
          <button onClick={() => navigate("new")}>Add new facility</button>
        </div>
      </section>
      <section
        className="facilities"
        style={{
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <div className="facilities-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>City</th>
                <th>Street</th>
                <th>No.</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {parkingList.map((p) => (
                <tr
                  key={p.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/parkings/${p.id}/spots`)}
                >
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.city}</td>
                  <td>{p.streetName}</td>
                  <td>{p.streetNumber}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`${p.id}/edit`);
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
}
