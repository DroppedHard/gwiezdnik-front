export type User = {
  username?: string;
  email: string;
  password?: string;
  birthDate?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  refresh: string;
  access: string;
  user: {
    name: string;
    email: string;
    date_of_birth: string;
  };
};
