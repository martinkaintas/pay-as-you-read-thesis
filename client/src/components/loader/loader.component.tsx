import { Box, Spinner } from '@chakra-ui/react';

interface LoaderProps {
  isLoading: boolean;
  isError: boolean;
}
const Loader = ({ isLoading, isError }: LoaderProps) => {
  return (
    <Box display='flex' flexDir='column'>
      {isError && <div>Something went wrong</div>}
      {isLoading && <Spinner />}
    </Box>
  );
};

export default Loader;
