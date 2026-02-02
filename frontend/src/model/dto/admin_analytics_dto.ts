/*
Admin Analytics DTOs

Used by /api/admin/bookings and /api/admin/reports/revenue:

AdminBookingResponse 
PagedResponseAdminBookingResponse
RevenueReportResponse
*/

export const BOOKING_STATUS = {
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  IN_PROGRESS: "InProgress",
} as const;

export type BookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const BOOKING_SOURCE = {
  PARKLY: "parkly",
  OFFICELY: "officely",
} as const;

export type BookingSource =
  (typeof BOOKING_SOURCE)[keyof typeof BOOKING_SOURCE];

export type AdminBookingResponse = {
  bookingId: string;
  userEmail: string;
  spotId: string;
  start: string;
  end: string;
  totalCost: number;
  status: BookingStatus;
  source: BookingSource;
};

export type PagedResponseAdminBookingResponse = {
  content: AdminBookingResponse[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type RevenueReportResponse = {
  periodStart: string;
  periodEnd: string;
  totalRevenue: number;
  totalBookingsCount: number;
};
