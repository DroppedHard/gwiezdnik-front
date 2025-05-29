import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import horroscopeBackend from 'utils/axios';
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  UserResponse,
  User,
} from 'utils/types';
import { getZodiacSignFromDate } from 'utils/utils';

export function useLogin(setUser: Dispatch<SetStateAction<User | null>>) {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const { data } = await horroscopeBackend.post('/user/login', credentials);
      return data;
    },
    onSuccess(data) {
      saveUser(setUser, data);
      console.log(data);
      toast('Succesfully logged in!');
    },
    onError: (error) => {
      console.error('Login failed:', error.stack);
      toast.error('Encountered error while logging in.');
    },
  });
}

export function useRegister() {
  return useMutation<UserResponse, Error, RegisterCredentials>({
    mutationFn: async (credentials) => {
      const { data } = await horroscopeBackend.post('/user', credentials);
      return data;
    },
    onSuccess(data) {
      console.log(data);
      toast('Succesfully registered new account! Please log in');
    },
    onError: (error) => {
      if (error.message.includes('code 400')) {
        toast.error('Account with given email exists.');
      } else {
        toast.error('Encountered error while registering account.');
      }
      console.error('Registering account failed:', error.message);
    },
  });
}

function saveUser(setUser: Dispatch<SetStateAction<User | null>>, data: LoginResponse) {
  setUser({
    email: data.user.email,
    username: data.user.name,
    birthDate: data.user.date_of_birth,
    sign: getZodiacSignFromDate(data.user.date_of_birth),
  });
  if (data.access) localStorage.setItem('access-token', data.access);
  if (data.refresh) localStorage.setItem('refresh-token', data.refresh);
}
// TODO - endpoint not working properly
// export function useLogout() {
//   return useMutation<RegisterResponse, Error, RegisterCredentials>({
//     mutationFn: async (credentials) => {
//       const { data } = await horroscopeBackend.post('/user', credentials);
//       return data;
//     },
//     onSuccess(data) {
//       console.log(data);
//       toast('Succesfully registered new account! Please log in');
//     },
//     onError: (error) => {
//       console.error('Registering account failed:', error.message);
//       toast.error('Encountered error while registering account.');
//     },
//   });
// }

export function useRestoreSession(setUser: Dispatch<SetStateAction<User | null>>) {
  return useMutation<UserResponse, Error>({
    mutationFn: async () => {
      const { data } = await horroscopeBackend.get('/user/current');
      return data;
    },
    onSuccess(data) {
      saveUser(setUser, {
        user: data,
        refresh: '',
        access: '',
      });
      console.log(data);
      toast('Succesfully restore session!');
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
      toast.error('Encountered error while restoring session.');
    },
  });
}
