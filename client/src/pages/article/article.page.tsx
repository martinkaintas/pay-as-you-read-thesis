import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../api/posts/queries';
import Loader from '../../components/loader';
import PurchaseButton from '../../components/purchase-button';
import socket from '../../socket';
import { useArticleContext } from '../../contexts/article.context';

const Article = () => {
  const { articleId } = useParams();
  const { data: post, isLoading, isError } = useQuery(['getArticle', articleId], fetchPostById);
  const {
    getArticleById,
    addParagraph,
    setHasPurchasedFullArticle,
  } = useArticleContext();
  const article = getArticleById(articleId || '')

  useEffect(() => {
    return () => {
      socket.off('paragraph', appendParagraph);
    };
  }, [articleId]);


  const appendParagraph = (paragraph: string) => {
    if (articleId) {
      console.log('appendParagraph', articleId)

      addParagraph(articleId, paragraph);
    }
  };

  socket.on('paragraph', appendParagraph);
  // TODO sometimes when end-of-post happens before paragraph, paragraph is not appended
  socket.on('end-of-post', () => {
    if (articleId) {
      setHasPurchasedFullArticle(articleId);
    }
  });

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
      <Text color='gray.700' mt={5} maxW={'560px'} fontWeight='medium'>
        {post?.excerpt}
      </Text>
      <PurchaseButton
        postId={articleId}
        paragraphIdx={article?.paragraphs.length}
        disabled={article?.hasPurchasedFullArticle}
        label={'Buy next paragraph'}
      />

      <Text color='gray.700' mt={5} maxW={'560px'} fontWeight='medium'>
        {article?.paragraphs.map((paragraph, index) => (
          <Text key={index} mb={2}>{paragraph}</Text>
        ))}
      </Text>

      {article?.hasPurchasedFullArticle && (
        <Text color='red.600' mt={5} maxW={'560px'}>
          This is the end of the post.
        </Text>
      )}

    </Box>
  );
};
export default Article;
