import { Box, Heading } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import HeaderItem from './header-item.component';

const Header = () => {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState<string | null>();
  useEffect(() => {
    if (user) {
      user
        .enable()
        .then(() => user.getInfo())
        .then((info) => setUsername(info?.node.alias ?? 'Stranger'));
    }
  }, [user]);

  return (
    <Box
      h={'100%'}
      gap={5}
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      position='relative'
    >
      <Heading size={'lg'} mr={4}>
        Pay as you read.
      </Heading>
      <HeaderItem title='Home' path='/' />
      <HeaderItem title={username ? `Hello ${username}` : 'Login'} path='/login' positionAlone />
    </Box>
  );
};

export default Header;
