import { createStandaloneToast } from '@chakra-ui/react';

type TypeProps = 'error' | 'success' | 'info' | 'warning';

export const Toast = (message: string, type?: TypeProps) => {
  const toast = createStandaloneToast();
  toast({
    title: message,
    status: type || 'success',
    isClosable: true,
    position: 'top-right',
  });
};
