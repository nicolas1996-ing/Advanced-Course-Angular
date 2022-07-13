export interface User {
  name: string;
  email: string;
  password?: string;
  google?: boolean;
  role?: string;
  img: string;
  uid?: string;
}

export interface CreateUser {
  name?: string;
  email?: string;
  password?: string;
}

export interface LoginUser {
  email?: string;
  password?: string;
  remember?: string; 
}

export interface CreateUserResponse extends User {
  message: string;
  token: string;
}

export interface LoginUserResponse {
  success: boolean;
  userdBD: UserdBD;
  token:   string;
  message: string;
}

export interface UserdBD {
  name:   string;
  email:  string;
  role:   string;
  google: boolean;
  img:    string;
  uid:    string;
}

export interface UpdateUser{
  name: string; 
  email: string; 
  role?: string
}