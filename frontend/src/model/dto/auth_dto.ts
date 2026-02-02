// Authentication DTOs

// Used by /api/auth/login and /api/auth/register:

// LoginRequest
// RegisterRequest
// AuthResponse
// ErrorResponse

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  userId: string;
  token: string;
  name: string;
  admin: boolean;
  email: string;
};

export type ErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
};
