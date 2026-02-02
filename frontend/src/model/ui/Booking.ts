import type { BookingStatus, BookingSource } from "../dto/admin_analytics_dto";

export type Booking = {
  id: string;
  name: string;
  start: string;
  end: string;
  status: BookingStatus;
  source: BookingSource;
};
