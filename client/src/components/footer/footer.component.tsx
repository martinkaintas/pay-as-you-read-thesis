import { Link, Box, Container, Stack, useColorModeValue, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>Pay only for what you need.</Text>
        <Stack direction={'row'}>
          <Link isExternal href='https://github.com/martinkaintas/pay-as-you-read-thesis#readme'>
            Read Documentation
          </Link>
          <Link isExternal href='https://github.com/martinkaintas/pay-as-you-read-thesis'>
            View on GitHub
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
