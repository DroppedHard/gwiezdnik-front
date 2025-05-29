import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import horroscopeBackend from 'utils/axios';
import { LoginCredentials, LoginResponse, User } from 'utils/types';

export function useLogin(setUser: Dispatch<SetStateAction<User | null>>) {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const { data } = await horroscopeBackend.post('/user/login', credentials);
      return data;
    },
    onSuccess(data) {
      setUser({
        email: data.user.email,
        username: data.user.name,
        birthDate: data.user.date_of_birth,
      });
      localStorage.setItem('access-token', data.access);
      localStorage.setItem('refresh-token', data.refresh);
      console.log(data);
      toast('Succesfully logged in!');
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
      toast.error('Encountered error while logging in.');
    },
  });
}
