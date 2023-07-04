import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialogCloseButton,
  ButtonProps,
} from '@chakra-ui/react';
import * as React from 'react';

interface AlertProps {
  title: string;
  content: string | React.ReactNode;
  showCloseButton?: boolean;
  triggerButton: ButtonProps;
  closeButtonText: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = (props) => {
  const {
    title,
    content,
    showCloseButton = false,
    triggerButton,
    closeButtonText,
    isOpen,
    onClose,
  } = props;

  const cancelRef: any = React.useRef();
  const footerActions = [];

  if (showCloseButton) {
    footerActions.push(
      <Button
        ref={cancelRef}
        onClick={onClose}
        key="closeButton"
        variant={!triggerButton ? 'solid' : undefined}
      >
        {closeButtonText}
      </Button>,
    );
  }

  if (triggerButton) {
    footerActions.push(
      <Button
        key="triggetButton"
        onClick={triggerButton.onClick}
        loading={triggerButton ? triggerButton.isLoading : undefined}
        variant={triggerButton.variant}
        disabled={triggerButton.disabled}
        {...triggerButton}
      >
        {triggerButton.children}
      </Button>,
    );
  }

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          {showCloseButton && <AlertDialogCloseButton />}

          <AlertDialogBody>{content}</AlertDialogBody>

          <AlertDialogFooter>
            {footerActions}
            {/* <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onClose} ml={3}>
              Delete
            </Button> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
