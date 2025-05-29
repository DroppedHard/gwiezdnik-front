import { HoroscopePeriod } from './types';

export enum MonthName {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export const MONTH_NAMES_ARRAY = Object.values(MonthName).filter(
  (v) => typeof v === 'string'
) as string[];

export enum ZodiacSign {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
}

export const PERIOD_OPTIONS: Record<HoroscopePeriod, string> = {
  day: 'day/today',
  week: 'weekly',
  month: 'monthly',
};
