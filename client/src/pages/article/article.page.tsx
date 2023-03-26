import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../api/posts/queries';
import Loader from '../../components/loader';
import PurchaseButton from '../../components/purchase-button';
import socket from '../../socket';

const Article = () => {
  const { articleId } = useParams();
  const { data: post, isLoading, isError } = useQuery(['getArticle', articleId], fetchPostById);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [isWholePostRendered, setIsWholePostRendered] = useState(false)

  useEffect(() => {
    setParagraphs([]);
    setIsWholePostRendered(false);
    return () => {
      socket.off('paragraph', appendParagraph);
    };
  },[articleId]);

  const appendParagraph = (paragraph: string) => {
    setParagraphs([...paragraphs, paragraph]);
  };

  socket.on('paragraph', appendParagraph);
  socket.on('end-of-post', () => setIsWholePostRendered(true));

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
      <PurchaseButton postId={articleId} disabled={isWholePostRendered} label={'Buy next paragraph'} />

      <Text color='gray.700' mt={5} maxW={'560px'}>
        {paragraphs.map((paragraph, index) => (
          <Text key={index}>{paragraph}</Text>
        ))}
      </Text>

      {isWholePostRendered && (
        <Text color='red.600' mt={5} maxW={'560px'}>
          This is the end of the post.
        </Text>
      )}
  
    </Box>
  );
};
export default Article;
