import { fromUnixTime, formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export const fromNow = (time) => {
  return formatDistanceToNow(fromUnixTime(time), { locale: vi });
};
