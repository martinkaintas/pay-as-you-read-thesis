import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' w='80%'>
      {children}
    </Box>
  );
};

export default PageWrapper;
