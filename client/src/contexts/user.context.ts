import { createContext } from 'react';
import { WebLNProvider } from 'webln';

interface UserContextI {
  user: WebLNProvider | null;
  setUser: (user: WebLNProvider) => void;
}

export const UserContext = createContext<UserContextI>({
  user: null,
  setUser: () => {},
});
