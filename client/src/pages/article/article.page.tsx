import { Box, Heading, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../api/posts/queries';
import Loader from '../../components/loader';
import PurchaseButton from '../../components/purchase-button';

const Article = () => {
  const { articleId } = useParams();
  const { data: post, isLoading, isError } = useQuery(['getArticle', articleId], fetchPostById);

  if (isError || isLoading || !post || !articleId) {
    return <Loader isLoading={isLoading} isError={isError} />;
  }

  return (
    <Box>
      <Heading color='gray.700' as='h1'>
        {post?.title}
      </Heading>
      <Text as={'i'} color='gray.500'>
        {post?.author} {post?.date}
      </Text>
      <Text color='gray.700' mt={5} maxW={'560px'}>
        {post?.excerpt}
      </Text>
      <PurchaseButton postId={articleId} label={'Buy next paragraph'} />
    </Box>
  );
};
export default Article;
