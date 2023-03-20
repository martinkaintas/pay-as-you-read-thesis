import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import { UserContext } from './contexts/user.context';
import { WebLNProvider } from 'webln';
import SideNav from './components/side-nav';

function App() {
  const [user, setUser] = React.useState<WebLNProvider | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={'80px 1fr 30px'}
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
        <GridItem p='2' bg='gray.200' area={'nav'}>
          <SideNav />
        </GridItem>
        <GridItem p='2' bg='gray.50' area={'main'}>
          <Outlet />
        </GridItem>
        <GridItem pl='2' bg='gray.300' area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    </UserContext.Provider>
  );
}

export default App;
