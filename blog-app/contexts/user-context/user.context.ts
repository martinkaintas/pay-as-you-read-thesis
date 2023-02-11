import { createContext } from 'react';
import { WebLNProvider } from 'webln';

interface UserContextI {
  user: WebLNProvider;
  setUser: (user: WebLNProvider) => void;
}

export const UserContext = createContext<UserContextI>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (user: WebLNProvider) => { },
});
