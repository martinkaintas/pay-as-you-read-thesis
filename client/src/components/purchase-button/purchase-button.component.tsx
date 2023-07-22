import { Box, Button, Text, useToast } from '@chakra-ui/react';
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
  const [isHandlingPayment, setIsHandlingPayment] = useState(false);

  const toast = useToast()

  const disabled = isLoading || forceDisabled || isHandlingPayment;

  const buyParagraph = () => {
    if (disabled) return;

    setIsLoading(true);
    setIsHandlingPayment(true);
    paragraphIdx
      ? socket.emit('buyParagraph', [postId, paragraphIdx])
      : socket.emit('buyParagraph', [postId]);
  };

  useEffect(() => {
    function onInvoice(data: any) {
      user && user.sendPayment(data).finally(() => setIsLoading(false));
    }

    function onParagraph() {
      setIsHandlingPayment(false);
    }

    function onPaymentTimeout() {
      setIsHandlingPayment(false);
      const id = 'payment-failed'
      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'Payment confirmation timeout.',
          description: "Payment could not be confirmed. Please try again.",
          status: 'error',
          duration: null,
          isClosable: true,
        })
      }
    }

    socket.on('invoice', onInvoice);
    socket.on('paragraph', onParagraph);
    socket.on('payment-timeout', onPaymentTimeout);

    return () => {
      socket.off('invoice', onInvoice);
      socket.off('paragraph', onParagraph);
      socket.off('payment-timeout', onPaymentTimeout);
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
      {
        isHandlingPayment
          ? 'Confirming payment...'
          : label ?? 'Buy next paragraph'
      }
    </Button>
  );
};

export default PurchaseButton;
