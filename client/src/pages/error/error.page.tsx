import { Text, Link } from '@chakra-ui/react';
import { useRouteError, Link as ReactRouterLink } from 'react-router-dom';
import PageWrapper from '../../components/page-wrapper';

interface Error {
  status: number;
  statusText: string;
  data: string;
}

export default function ErrorPage() {
  const error: Error = useRouteError() as Error;

  return (
    <PageWrapper>
      <Text fontSize='2xl'>Oops!</Text>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>
        <i>{`${error.status} ${error.statusText || error.data}`}</i>
      </Text>
      <Link as={ReactRouterLink} to='/'>
        Go back to home page
      </Link>
    </PageWrapper>
  );
}
