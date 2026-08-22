export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface RegisterInput {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export type UserResponse = {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  createdAt: string;
};