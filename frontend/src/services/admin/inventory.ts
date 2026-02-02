import type {
  CreateParkingRequest,
  CreateSpotRequest,
  ParkingResponse,
  SpotResponse,
  UpdateParkingRequest,
  UpdateSpotRequest,
} from "../../model/dto/admin_inventory_dto";
const API = import.meta.env.VITE_API_BASE_URL;
export const getParkingsList = async (): Promise<ParkingResponse[]> => {
  const res = await fetch(`${API}/api/admin/parkings`);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(
      `Failed to fetch parking facilities (${res.status}): ${err}`,
    );
  }
  return (await res.json()) as ParkingResponse[];
};

export const getParkingSpots = async (id: string): Promise<SpotResponse[]> => {
  const res = await fetch(`${API}/api/admin/parkings/${id}/spots`);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch parking spots (${res.status}): ${err}`);
  }
  return (await res.json()) as SpotResponse[];
};

export const deleteParkingSpot = async (id: string): Promise<void> => {
  const res = await fetch(`${API}/api/admin/spots/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to delete: (${res.status}): ${err}`);
  }
};

export const addParkingSpot = async (
  parkingId: string,
  body: CreateSpotRequest,
): Promise<void> => {
  const rep = await fetch(`${API}/api/admin/parkings/${parkingId}/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!rep.ok) {
    throw new Error(`Failed to add new parking spot: ${rep.status}`);
  }
};

export const updateParkingSpot = async (
  spotId: string,
  body: UpdateSpotRequest,
): Promise<void> => {
  const rep = await fetch(`${API}/api/admin/spots/${spotId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!rep.ok) {
    throw new Error(`Failed to update the parking spot: ${rep.status}`);
  }
};

export const createParkingFacility = async (
  body: CreateParkingRequest,
): Promise<void> => {
  const rep = await fetch(`${API}/api/admin/parkings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!rep.ok) {
    throw new Error(`Failed to add new parking facility: ${rep.status}`);
  }
};

export const updateParkingFacility = async (
  parkingId: string,
  body: UpdateParkingRequest,
): Promise<void> => {
  const rep = await fetch(`${API}/api/admin/parkings/${parkingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!rep.ok) {
    throw new Error(`Failed to update the parking facility: ${rep.status}`);
  }
};
