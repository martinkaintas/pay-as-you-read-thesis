import { Box, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink, useMatch, useResolvedPath } from 'react-router-dom';

interface HeaderItemProps {
  title: string;
  path?: string;
  positionAlone?: boolean;
}

const HeaderItem = ({ title, path, positionAlone }: HeaderItemProps) => {
  const isActive = useMatch(path ?? '-1')?.pathnameBase;
  const isLink = path !== undefined;
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: positionAlone ? 'absolute' : 'relative',
        right: positionAlone ? '0px' : 'auto',
      }}
    >
      <Link
        fontSize='2xl'
        as={isLink && ReactRouterLink}
        to={path}
        cursor={isLink ? 'pointer' : 'default'}
        color={isActive ? 'gray.800' : 'inherit'}
        _hover={{
          textDecoration: isLink ? 'underline' : 'none',
          color: isLink ? 'gray.800' : 'inherit',
        }}
      >
        {title}
      </Link>
    </Box>
  );
};

export default HeaderItem;
