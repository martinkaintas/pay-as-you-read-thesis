import { Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import { UserContext } from './contexts/user.context';
import { WebLNProvider } from 'webln';
import SideNav from './components/side-nav';
import Footer from './components/footer';
import socket from './socket';
import Status from './components/status';

function App() {
  const [user, setUser] = React.useState<WebLNProvider | null>(null);
  const [wsStatus, setWsStatus] = React.useState<'connected' | 'disconnected'>('disconnected');
  const [userStatus, setUserStatus] = React.useState<'logged out' | 'logged in'>('logged out');

  useEffect(() => {
    if (user) {
      setUserStatus('logged in');
    } else {
      setUserStatus('logged out');
    }
  }, [user]);

  useEffect(() => {
    function onConnect() {
      setWsStatus('connected');
    }
    function onDisconnect() {
      setWsStatus('disconnected');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Status wsStatus={wsStatus} userStatus={userStatus} />
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={'80px 1fr 60px'}
        gridTemplateColumns={'150px 1fr'}
        h='100vh'
        w={'100%'}
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
        maxW='1280px'
        m='0 auto'
      >
        <GridItem p='2' bg='gray.100' area={'header'}>
          <Header />
        </GridItem>
        <GridItem p='2' bg='gray.100' area={'nav'}>
          <SideNav />
        </GridItem>
        <GridItem p='2' bg='gray.50' area={'main'}>
          <Outlet />
        </GridItem>
        <GridItem pl='2' bg='gray.100' area={'footer'}>
          <Footer />
        </GridItem>
      </Grid>
    </UserContext.Provider>
  );
}

export default App;
