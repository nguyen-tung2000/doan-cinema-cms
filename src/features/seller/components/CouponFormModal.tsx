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
import * as React from 'react';
import * as z from 'zod';
import shallow from 'zustand/shallow';

import { Form, InputField } from '@/components';
import { getCouponGift } from '@/features/seller';
import { useSellerStore } from '@/stores/seller';

type CouponValues = {
  code: string;
  userId: string;
};

const schema = z.object({
  code: z.string().nonempty({ message: 'Code là bắt buộc' }),
  //   .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'code không hợp lệ'),
});

export const CouponFormModal = () => {
  const { openModal, isLoading, member, closeModal, fetchCoupon, setLoading } = useSellerStore(
    (state) => ({
      openModal: state.openModal,
      member: state.member,
      isLoading: state.isLoading,
      screenId: state.screenId,
      selectedGifts: state.selectedGifts,
      selectedSeats: state.selectedSeats,
      closeModal: state.closeModal,
      fetchCoupon: state.fetchCoupon,
      setLoading: state.setLoading,
    }),
    shallow,
  );
  const toast = useToast();

  return (
    <Modal onClose={closeModal} isOpen={openModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Form<CouponValues, typeof schema>
          onSubmit={async ({ code }) => {
            try {
              setLoading(true);
              const data = { code, userId: member._id };
              const { values } = await getCouponGift(data);
              toast({
                position: 'top-right',
                status: 'success',
                title: 'Lấy coupon thành công',
                isClosable: true,
              });
              fetchCoupon(values.coupon);
              closeModal();
            } catch {
              setLoading(false);
            }
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <ModalHeader>Coupon</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <InputField
                    type="text"
                    label="Nhập code"
                    registration={register('code')}
                    error={formState.errors['code']}
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
