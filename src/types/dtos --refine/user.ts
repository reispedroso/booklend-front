export interface UserRead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
}

export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}
