import { createBrowserRouter, redirect } from "react-router";
import { Login } from "../pages/public/Login";
import { AdminLayout } from "../layouts/AdminLayout";
import { Dashboard } from "../pages/admin/Dashboard";
import { ParkingSpots } from "../pages/admin/ParkingSpots";
import { Bookings } from "../pages/admin/Bookings";
import { AddSpotForm } from "../pages/admin/AddSpotForm";
import ParkingsListPage from "../pages/admin/ParkingList";
import { EditSpotForm } from "../pages/admin/EditSpotForm";
import { AddParkingForm } from "../pages/admin/AddParkingForm";
import { EditParkingForm } from "../pages/admin/EditParkingForm";

export const isAuthed = () => Boolean(localStorage.getItem("token"));
export const isAdmin = () => localStorage.getItem("admin") === "true";

const authGuard = () => {
  if (!isAuthed() || !isAdmin()) throw redirect("/login");
  return null;
};

export const router = createBrowserRouter([
  {
    element: <Login />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    path: "/",
    loader: authGuard,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "/parkings", element: <ParkingsListPage /> },
          { path: "/parkings/new", element: <AddParkingForm /> },
          { path: "/parkings/:parkingId/edit", element: <EditParkingForm /> },
          { path: "/parkings/:parkingId/spots", element: <ParkingSpots /> },
          { path: "parkings/:parkingId/spots/new", element: <AddSpotForm /> },
          {
            path: "parkings/:parkingId/spots/:spotId/edit",
            element: <EditSpotForm />,
          },
          { path: "bookings", element: <Bookings /> },
        ],
      },
    ],
  },
  { path: "*", loader: () => redirect("/") },
]);
