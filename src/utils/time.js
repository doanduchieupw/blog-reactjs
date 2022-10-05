import { fromUnixTime, formatDistanceToNow, format } from 'date-fns';
import { vi } from 'date-fns/locale';

export const fromNow = (time) => {
  return formatDistanceToNow(fromUnixTime(time), { locale: vi });
};

export const getTime = (time, formatType = 'PPpp') => {
  return format(fromUnixTime(time), formatType, { locale: vi });
};
