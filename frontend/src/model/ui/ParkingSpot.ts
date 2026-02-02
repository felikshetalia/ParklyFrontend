import type { Address } from "./Address";

// whatever the hell this is after enums vanished from TS 5.8 >=
const ParkingStatusEnum = {
  Free: "Free",
  Occupied: "Occupied",
  Maintenance: "Maintenance",
} as const;

export type ParkingStatus =
  (typeof ParkingStatusEnum)[keyof typeof ParkingStatusEnum];

export interface ParkingSpot {
  id: string;
  name: string;
  address: Address;
  priceDay: number;
  status: ParkingStatus;
}

// terazniejszy model miejsce parkingowe
