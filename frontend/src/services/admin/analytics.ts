import type {
  PagedResponseAdminBookingResponse,
  RevenueReportResponse,
} from "../../model/dto/admin_analytics_dto";

type GetRevenueReportProps = {
  start: string;
  end: string;
};

export const getRevenue = async (
  props: GetRevenueReportProps,
): Promise<RevenueReportResponse> => {
  const params = new URLSearchParams({
    start: props.start,
    end: props.end,
  });
  const res = await fetch(`/api/admin/reports/revenue?${params.toString()}`);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch revenue report (${res.status}): ${err}`);
  }

  return (await res.json()) as RevenueReportResponse;
};

type GetBookingsProps = {
  page?: number;
  limit?: number;
  start?: string;
  end?: string;
  search?: string;
};

export const getBookingsPaginated = async ({
  page = 0,
  limit = 20,
  start,
  end,
  search,
}: GetBookingsProps): Promise<PagedResponseAdminBookingResponse> => {
  const params = new URLSearchParams();
  params.set("page", String(page + 1));
  params.set("limit", String(limit));
  params.set("start", start!);
  params.set("end", end!);
  if (search) params.set("search", search);

  const res = await fetch(`/api/admin/bookings?${params.toString()}`);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch bookings (${res.status}): ${err}`);
  }
  return (await res.json()) as PagedResponseAdminBookingResponse;
};
