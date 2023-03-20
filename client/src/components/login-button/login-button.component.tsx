import { Button, useToast, Text } from '@chakra-ui/react';
import React from 'react';
import { requestProvider } from 'webln';
import LightningIcon from '../../assets/component-icons/lightning';
import { UserContext } from '../../contexts/user.context';

interface Props {
  label?: string;
}
export default function LoginButton({ label = 'Login via Lightning' }: Props) {
  const { setUser, user } = React.useContext(UserContext);
  const [disabled, setDisabled] = React.useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    if (disabled) return;

    setDisabled(true);
    await requestProvider().then(
      (webln) => {
        setUser(webln);
      },
      () => {
        toast({
          title: 'Error',
          description:
            'Could not connect to Lightning wallet, please refresh the page and try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    );
  };

  return user ? (
    <Text>You are logged in</Text>
  ) : (
    <Button
      onClick={handleLogin}
      isLoading={disabled}
      leftIcon={<LightningIcon />}
      colorScheme='yellow'
      variant='solid'
    >
      {label}
    </Button>
  );
}
