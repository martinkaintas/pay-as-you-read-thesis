import { Box, Link } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Link as ReactRouterLink, useMatch, useParams } from 'react-router-dom';
import { fetchPosts } from '../../api/posts/queries';
import Loader from '../loader';

const SideNav = () => {
  const { data, isLoading, isError } = useQuery(['getPosts'], fetchPosts);
  const { articleId } = useParams();
  const activePost = useMatch(`/p/${articleId}` ?? '-1')?.pathnameBase;

  if (isError || isLoading) {
    return <Loader isLoading={isLoading} isError={isError} />;
  }

  return (
    <Box display='flex' flexDir='column'>
      {data?.map((postId) => (
        <Link
          as={ReactRouterLink}
          to={`/p/${postId}`}
          key={postId}
          color={activePost === `/p/${postId}` ? 'gray.800' : 'inherit'}
          textAlign='center'
          _hover={{
            textDecoration: 'underline',
            color: 'gray.800',
          }}
        >
          {postId}
        </Link>
      ))}
    </Box>
  );
};

export default SideNav;
