import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  ModalFooter,
  Button,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import * as z from 'zod';
import shallow from 'zustand/shallow';

import { Form, InputField } from '@/components';
import { useSellerStore } from '@/stores/seller';

type PhoneValue = {
  phoneNumber: string;
};

const schema = z.object({
  phoneNumber: z
    .string()
    .nonempty({ message: 'số điện thoại là bắt buộc' })
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'số điện thoại không đúng định dạng'),
});

export const MemberFormModal = () => {
  const { openModal, closeModal, fetchMember, isLoading } = useSellerStore(
    (state) => ({
      openModal: state.openModal,
      isLoading: state.isLoading,
      closeModal: state.closeModal,
      fetchMember: state.fetchMember,
    }),
    shallow,
  );
  const toast = useToast();
  return (
    <Modal onClose={closeModal} isOpen={openModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Form<PhoneValue, typeof schema>
          onSubmit={async ({ phoneNumber }) => {
            const hasMember = await fetchMember(phoneNumber);
            if (hasMember) {
              toast({
                position: 'top-right',
                status: 'success',
                title: 'Lấy thông tin khách hàng thành công',
                isClosable: true,
              });

              closeModal();
            }
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <ModalHeader>Khách hàng thành viên</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <InputField
                    type="text"
                    label="Nhập số điện thoại khách hàng"
                    registration={register('phoneNumber')}
                    error={formState.errors['phoneNumber']}
                  />
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={closeModal} mr={3}>
                  Trở lại
                </Button>
                <Button colorScheme="cyan" type="submit" isLoading={isLoading} color="white">
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </Form>
      </ModalContent>
    </Modal>
  );
};
