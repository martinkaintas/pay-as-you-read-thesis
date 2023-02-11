import Container from '../components/container';
import MoreStories from '../components/more-stories';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import Post from '../interfaces/post';
import { useEffect } from 'react';
import io, { Socket } from 'Socket.IO-client';

let socket: Socket;

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const posts = allPosts;

  useEffect(() => void socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });
  };

  return (
    <>
      <Layout>
        <Head>
          <title>{`📎Pay as you read`}</title>
        </Head>
        <Container>
          <Intro />
          {posts.length > 0 && <MoreStories posts={posts} />}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

  return {
    props: { allPosts },
  };
};
