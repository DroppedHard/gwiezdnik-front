import { useQuery } from '@tanstack/react-query';
import horroscopeBackend from 'utils/axios';
import { PERIOD_OPTIONS, ZodiacSign } from 'utils/strings';
import { HoroscopePeriod, HoroscopeResponse } from 'utils/types';

export const useFetchHoroscope = (
  sign: ZodiacSign,
  period: HoroscopePeriod,
  enabled: boolean = false
) => {
  return useQuery<HoroscopeResponse, Error>({
    queryKey: [sign, 'horroscope', period],
    queryFn: async () => {
      const { data } = await horroscopeBackend.get(`horoscope/${PERIOD_OPTIONS[period]}/${sign}`);
      return data;
    },
    enabled,
  });
};

// date in yyyy-mm-dd
export const useFetchDateHoroscope = (sign: ZodiacSign, date: string, enabled: boolean = false) => {
  return useQuery<HoroscopeResponse, Error>({
    queryKey: [sign, 'horroscope', 'day', date],
    queryFn: async () => {
      const { data } = await horroscopeBackend.get(`horoscope/day/${date}/${sign}`);
      return data;
    },
    enabled,
  });
};
