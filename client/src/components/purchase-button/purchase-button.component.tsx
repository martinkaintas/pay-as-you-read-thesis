import { Box, Button, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import CartIcon from '../../assets/component-icons/cart';
import socket from '../../socket';
import { UserContext } from '../../contexts/user.context';

type PurchaseProps = {
  postId: string;
  label?: string;
};

const PurchaseButton = ({ postId, label }: PurchaseProps) => {
  const { user } = useContext(UserContext);

  const [disabled, setDisabled] = useState(false);

  const buyParagraph = () => {
    if (disabled) return;

    setDisabled(true);
    socket.emit('buyParagraph', postId);
  };

  useEffect(() => {
    function onInvoice(data: any) {
      user && user.sendPayment(data).finally(() => setDisabled(false));
    }

    socket.on('invoice', onInvoice);

    return () => {
      socket.off('invoice', onInvoice);
    };
  }, [user]);

  if (!user)
    return (
      <Box mt={2}>
        <Text>Please login to buy this paragraph</Text>
      </Box>
    );

  return (
    <Button
      onClick={buyParagraph}
      isLoading={disabled}
      leftIcon={<CartIcon />}
      colorScheme='blue'
      variant='solid'
      mt={2}
    >
      {label ?? 'Buy Paragraph'}
    </Button>
  );
};

export default PurchaseButton;
