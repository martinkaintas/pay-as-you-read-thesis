import { AppProps } from 'next/app';
import { useState } from 'react';
import { WebLNProvider } from 'webln';
import { UserContext } from '../contexts/user-context/user.context';
import '../styles/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<WebLNProvider>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />;
    </UserContext.Provider>
  );
}
