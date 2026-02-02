/*

Admin Inventory DTOs

Used by /api/admin/parkings... and /api/admin/spots...:

CreateParkingRequest (Create facility) 
UpdateParkingRequest (Edit facility) 
ParkingListResponse (Lightweight list for dropdowns)
CreateSpotRequest (Add spot to facility)
UpdateSpotRequest (Edit spot: pricing/active) 
SpotResponse (List of spots in a facility)

(Photos upload is multipart/form-data without a named schema object; you’ll just model it as FormData in the client.) 

*/

export type SpotResponse = {
  spotId: string;
  localId: string;
  pricePerHour: number;
  pricePerDay: number;
  active: boolean;
  big: boolean;
  ev: boolean;
  disabled: boolean;
};

export type CreateParkingRequest = {
  name: string;
  city: string;
  country: string;
  postalCode: string;
  streetName: string;
  streetNumber: string;
  lat: number;
  lon: number;
};

export type UpdateParkingRequest = {
  name: string;
  city: string;
  country: string;
  postalCode: string;
  streetName: string;
  streetNumber: string;
  lat: number;
  lon: number;
  mainPhotoId: string;
};

export type ParkingListResponse = {
  id: string;
  name: string;
};

export type CreateSpotRequest = {
  localId: string;
  pricePerHour: number;
  pricePerDay?: number;
  big: boolean;
  ev: boolean;
  disabled: boolean;
};

export type UpdateSpotRequest = {
  localId: string;
  pricePerHour: number;
  pricePerDay?: number;
  isBig: boolean;
  isEv: boolean;
  isDisabled: boolean;
  isActive: boolean;
};

export type ParkingResponse = {
  id: string;
  name: string;
  city: string;
  streetName: string;
  streetNumber: string;
  latitude: number;
  longitude: number;
  priceForPeriod: number;
  mainImgUrl: string;
};
