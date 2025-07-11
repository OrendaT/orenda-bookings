import { Moon, Sun, SunDim, Sunrise } from 'lucide-react';

export const INTAKE_FORM_URL = 'https://forms.orendapsych.com/intake';
export const ORENDA_LOGO =
  'https://mcusercontent.com/f49e77d8389e110b514988d07/images/bd4a6ffd-dce6-72c2-e379-2223ce4d0a6b.png';

export const US_STATES = [
  { value: 'New York' },
  { value: 'Massachusetts' },
  { value: 'New Jersey' },
  { value: 'Connecticut' },
];

export const timePeriods = [
  {
    label: 'Morning',
    Icon: Sunrise,
    periods: [
      { label: '8 AM', value: '8' },
      { label: '9 AM', value: '9' },
      { label: '10 AM', value: '10' },
      { label: '11 AM', value: '11' },
    ],
  },
  {
    label: 'Afternoon',
    Icon: Sun,
    periods: [
      { label: '12 PM', value: '12' },
      { label: '1 PM', value: '13' },
      { label: '2 PM', value: '14' },
      { label: '3 PM', value: '15' },
    ],
  },
  {
    label: 'Late Afternoon',
    Icon: SunDim,
    periods: [
      { label: '4 PM', value: '16' },
      { label: '5 PM', value: '17' },
      { label: '6 PM', value: '18' },
    ],
  },
  {
    label: 'Evening',
    Icon: Moon,
    periods: [
      { label: '7 PM', value: '19' },
      { label: '8 PM', value: '20' },
      { label: '9 PM', value: '21' },
      { label: '10 PM', value: '22' },
    ],
  },
];
