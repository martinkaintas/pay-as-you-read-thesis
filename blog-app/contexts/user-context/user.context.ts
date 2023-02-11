import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (user: any) => { },
});
