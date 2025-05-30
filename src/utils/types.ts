import { ZodiacSign } from './strings';

export type User = {
  username?: string;
  email: string;
  password?: string;
  birthDate?: string;
  sign?: ZodiacSign;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  name: string;
  date_of_birth: string;
  password: string;
  confirmPassword?: string;
};

export type LoginResponse = {
  refresh: string;
  access: string;
  user: UserResponse;
};

export type UserResponse = {
  name: string;
  email: string;
  date_of_birth: string;
};

export type HoroscopeResponse = {
  horoscope: string;
};

export type HoroscopePeriod = 'day' | 'week' | 'month';

export type DreambookRecord = {
  id?: number;
  title: string;
  description: string;
  created_at: string;
};
