import { Heading, Text, Link } from '@chakra-ui/react';
import PageWrapper from '../../components/page-wrapper';

const Home = () => {
  return (
    <PageWrapper>
      <Heading color='gray.700' as='h1'>Pay-As-You-Read Thesis</Heading>
      <Text color='gray.700' mt={5} maxW={'560px'} align='justify' fontWeight='medium'>
        This is a demo blog application that showcases how a pay-as-you-read model can be implemented using the Lightning Network.
        The application consists of a client application and a server application.
        The client application allows users to buy individual paragraphs of blog posts, while the server application handles the payment processing and content delivery.
      </Text>

      <Heading color='gray.700' as='h2' mt={8}>How it works</Heading>
      <Text color='gray.700' mt={5} maxW={'560px'} align='justify' fontWeight='medium'>
        The pay-as-you-read model is implemented using the Lightning Network, a layer-2 payment protocol that allows for fast and cheap payments using Bitcoin.
        Users of the demo application need to have a Lightning Network wallet to be able to purchase paragraphs.
        We suggest that users use Alby, a Lightning Network wallet that is easy to use and has a user-friendly interface.

      </Text>
      <Text color='gray.700' mt={5} maxW={'560px'} align='justify' fontWeight='medium'>
        If you need a funded test account you can add one from <Link color={'#ecc94b'} textDecoration={'underline'} href='https://github.com/getAlby/lightning-browser-extension/wiki/Test-setup' isExternal target='_blank'>here</Link> to your wallet.
      </Text>
    </PageWrapper>
  );
};
export default Home;
