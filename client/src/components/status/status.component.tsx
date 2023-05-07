import { Code, Stack } from '@chakra-ui/react';

interface Props {
  wsStatus?: 'connected' | 'disconnected';
  userStatus?: string;
}
export default function Status({ wsStatus, userStatus }: Props) {

  return (
    <>
      <Stack position='fixed' left='5' bottom='5'>
        <Code variant={'outline'} colorScheme='blue' >WS: {wsStatus}</Code>
        <Code variant={'outline'} colorScheme='blue'>User: {userStatus}</Code>
      </Stack>
    </>
  )
}
