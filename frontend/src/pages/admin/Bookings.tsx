import { useEffect, useState } from "react";
import { getBookingsPaginated } from "../../services/admin/analytics";
import type {
  AdminBookingResponse,
  PagedResponseAdminBookingResponse,
} from "../../model/dto/admin_analytics_dto";

export const Bookings = () => {
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [start, setStart] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().slice(0, 10);
  });
  const [end, setEnd] = useState<string>(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<PagedResponseAdminBookingResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getBookingsPaginated({ page, limit: size, start, end, search })
      .then((res) => {
        if (!mounted) return;
        setData(res);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError(
          err instanceof Error ? err.message : "Failed to load bookings",
        );
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [page, size]);

  const bookings = data?.content ?? [];

  return (
    <>
      <section className="bookings-title" style={{ alignItems: "center" }}>
        <h2>Bookings</h2>
      </section>

      <section
        className="bookings-search-row"
        style={{ display: "flex", alignItems: "center", marginBottom: 18 }}
      >
        <div className="search-bar">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user email"
          />
        </div>
        <div style={{ marginLeft: 12 }}>
          <label style={{ marginRight: 8 }}>Start</label>
          <input
            type="date"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
              setPage(0);
            }}
          />
        </div>
        <div style={{ marginLeft: 12 }}>
          <label style={{ marginRight: 8 }}>End</label>
          <input
            type="date"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
              setPage(0);
            }}
          />
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0 || loading}
          >
            Prev
          </button>
          <span style={{ margin: "0 8px" }}>
            Page {page + 1} of {data ? data.totalPages : "..."}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={data ? page + 1 >= data.totalPages || loading : loading}
          >
            Next
          </button>
        </div>
      </section>

      <section
        className="bookings-body"
        style={{ borderRadius: 12, padding: 16, marginBottom: 16 }}
      >
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}

        {!loading && !error && (
          <div className="bookings-table">
            <table>
              <thead>
                <tr>
                  <th>BookingID</th>
                  <th>Parking Spot name</th>
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
                {bookings.map((b: AdminBookingResponse) => (
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
        )}
      </section>
    </>
  );
};
