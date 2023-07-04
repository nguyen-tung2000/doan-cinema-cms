import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';

interface WarningModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
  message?: string;
}

export const WarningModal: React.FC<WarningModalProps> = (props) => {
  const { onCancel, onConfirm, visible, message } = props;
  const cancelRef: any = React.useRef();
  const dialogBody = 'Bạn có chắc không? ' + message;

  return (
    <AlertDialog isOpen={visible} leastDestructiveRef={cancelRef} onClose={onCancel}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Xoá
        </AlertDialogHeader>
        <AlertDialogBody>{dialogBody}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onCancel}>
            Huỷ bỏ
          </Button>
          <Button fontWeight="bold" colorScheme="red" onClick={onConfirm} ml={3}>
            Xoá
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
