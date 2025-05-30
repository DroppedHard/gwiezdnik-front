import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import horroscopeBackend from 'utils/axios';
import { DreambookRecord } from 'utils/types';

export const useFetchDateDreambooks = (date: string) => {
  return useQuery<DreambookRecord[], Error>({
    queryKey: [date, 'dreambook'],
    queryFn: async () => {
      const { data } = await horroscopeBackend.get(`dreambook/current-user/by-date/${date}`);
      return data;
    },
  });
};

export function usePostDreambok() {
  return useMutation<DreambookRecord, Error, DreambookRecord>({
    mutationFn: async (dreambook: DreambookRecord) => {
      const { data } = await horroscopeBackend.post('/dreambook', dreambook);
      return data;
    },
    onSuccess(data) {
      console.log(data);
      toast('Succesfully created new dreambook!');
    },
    onError: (error) => {
      toast.error('Encountered error while adding a new dreambook.');
      console.error('Creating new dreambook failed:', error.message);
    },
  });
}

export function usePutDreambok() {
  return useMutation<DreambookRecord, Error, DreambookRecord>({
    mutationFn: async (dreambook: DreambookRecord) => {
      const { data } = await horroscopeBackend.put(`/dreambook/${dreambook.id}`, dreambook);
      return data;
    },
    onSuccess(data) {
      console.log(data);
      toast('Succesfully edited dreambook!');
    },
    onError: (error) => {
      toast.error('Encountered error while editing dreambook.');
      console.error('Editing dreambook failed:', error.message);
    },
  });
}

export function useDeleteDreambok() {
  return useMutation<DreambookRecord, Error, number>({
    mutationFn: async (id: number) => {
      const { data } = await horroscopeBackend.delete(`/dreambook/${id}`);
      return data;
    },
    onSuccess(data) {
      console.log(data);
      toast('Succesfully deleted dreambook!');
    },
    onError: (error) => {
      toast.error('Encountered error while deleting dreambook.');
      console.error('Deleting dreambook failed:', error.message);
    },
  });
}
