export interface Country {
  code: string;
  name: string;
  prefix: string;
  flag: string;
}

export const countries: Country[] = [
  { code: 'FR', name: 'France', prefix: '+33', flag: '🇫🇷' },
  { code: 'BE', name: 'Belgique', prefix: '+32', flag: '🇧🇪' },
  { code: 'CH', name: 'Suisse', prefix: '+41', flag: '🇨🇭' },
  { code: 'CA', name: 'Canada', prefix: '+1', flag: '🇨🇦' },
  { code: 'LU', name: 'Luxembourg', prefix: '+352', flag: '🇱🇺' },
  { code: 'MC', name: 'Monaco', prefix: '+377', flag: '🇲🇨' },
];