import { Box, Button, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import CartIcon from '../../assets/component-icons/cart';
import socket from '../../socket';
import { UserContext } from '../../contexts/user.context';

type PurchaseProps = {
  postId: string;
  paragraphIdx?: number;
  label?: string;
  disabled?: boolean;
};

const PurchaseButton = ({ postId, paragraphIdx, label, disabled: forceDisabled }: PurchaseProps) => {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const disabled = isLoading || forceDisabled;

  const buyParagraph = () => {
    if (disabled) return;

    setIsLoading(true);
    paragraphIdx
      ? socket.emit('buyParagraph', [postId, paragraphIdx])
      : socket.emit('buyParagraph', [postId]);
  };

  useEffect(() => {
    function onInvoice(data: any) {
      user && user.sendPayment(data).finally(() => setIsLoading(false));
    }

    socket.on('invoice', onInvoice);

    return () => {
      socket.off('invoice', onInvoice);
    };
  }, [user]);

  if (!user)
    return (
      <Box mt={2}>
        <Text>Please login to start buying paragraphs</Text>
      </Box>
    );

  return (
    <Button
      onClick={buyParagraph}
      isLoading={isLoading}
      isDisabled={disabled}
      leftIcon={<CartIcon fill='white' />}
      colorScheme='blue'
      variant='solid'
      mt={2}
    >
      {label ?? 'Buy Paragraph'}
    </Button>
  );
};

export default PurchaseButton;
