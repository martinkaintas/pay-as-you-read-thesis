import { Box, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const SideNav = () => {
  return (
    <Box display='flex' flexDir='column'>
      <Link as={ReactRouterLink} to='/p/code1'>
        Article 1
      </Link>
      <Link as={ReactRouterLink} to='/p/code2'>
        Article 2
      </Link>
    </Box>
  );
};

export default SideNav;
