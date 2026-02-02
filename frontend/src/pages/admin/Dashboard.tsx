import { useState, useEffect } from "react";
import type {
  AdminBookingResponse,
  RevenueReportResponse,
} from "../../model/dto/admin_analytics_dto";
import { getRevenue } from "../../services/admin/analytics";
import { getBookingsPaginated } from "../../services/admin/analytics";

export const Dashboard = () => {
  const [revenue, setRevenue] = useState<RevenueReportResponse | null>(null);
  const [bookings, setBookings] = useState<AdminBookingResponse[]>([]);
  let todayDate = new Date();
  useEffect(() => {
    const start = "2026-01-01";
    const end = todayDate.toISOString().slice(0, 10);

    Promise.all([
      getRevenue({ start, end }),
      getBookingsPaginated({ page: 0, limit: 5, start, end }),
    ])
      .then(([rev, paged]) => {
        setRevenue(rev);
        setBookings(paged.content);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <section
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <div className="page-title">
          <h1>Welcome back, Admin</h1>
        </div>

        <div className="page-time" style={{ fontSize: "28px" }}>
          {todayDate.toUTCString()}
        </div>
      </section>

      <section
        className="dashboard-block bookings-today"
        style={{
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <h2>New bookings today</h2>

        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>BookingID</th>
                <th>Parking Spot ID</th>
                <th>User email</th>
                <th>Booking period</th>
                <th>Booked via</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6}>No bookings found</td>
                </tr>
              )}
              {bookings.slice(0, 5).map((b: AdminBookingResponse) => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.spotId}</td>
                  <td>{b.userEmail}</td>
                  <td>
                    {new Date(b.start).toLocaleString()} -{" "}
                    {new Date(b.end).toLocaleString()}
                  </td>
                  <td>{b.source}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="dashboard-block profit-kpi"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div className="kpi-value" style={{ margin: "10px" }}>
          {revenue?.totalRevenue}
        </div>
        <div className="kpi-label" style={{ margin: "10px" }}>
          PROFIT (last month)
        </div>
      </section>
    </>
  );
};
