import { Box, Heading, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../api/posts/queries';
import Loader from '../../components/loader';

const Article = () => {
  const { articleId } = useParams();
  const { data, isLoading, isError } = useQuery(['getArticle', articleId], fetchPostById);

  if (isError || isLoading) {
    return <Loader isLoading={isLoading} isError={isError} />;
  }

  return (
    <Box>
      <Heading color='gray.700' as='h1'>
        {data?.title}
      </Heading>
      <Text as={'i'} color='gray.500'>
        {data?.author} {data?.date}
      </Text>
      <Text color='gray.700' mt={5} maxW={'560px'}>
        {data?.excerpt}
      </Text>
    </Box>
  );
};
export default Article;
