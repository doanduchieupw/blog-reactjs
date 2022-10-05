import { fromUnixTime, formatDistanceToNow, format } from 'date-fns';
import { vi } from 'date-fns/locale';

export const fromNow = (time) => {
  return formatDistanceToNow(fromUnixTime(time), { locale: vi });
};

export const getTime = (time) => {
  return format(fromUnixTime(time), 'PPpp', { locale: vi });
};
