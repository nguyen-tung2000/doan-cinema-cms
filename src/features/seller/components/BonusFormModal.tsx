import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Spinner,
  Img,
  Table,
  Td,
  Th,
  Tr,
  FormControl,
  FormLabel,
  Input,
  Box,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import shallow from 'zustand/shallow';

import { Alert } from '@/components';
import { IGift } from '@/features/seller';
import { useSellerStore } from '@/stores/seller';

export const BonusFormModal = () => {
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const {
    openModal,
    gifts,
    isLoading,
    point,
    selectedGifts,
    selectedSeats,
    incGift,
    desGift,
    closeModal,
  } = useSellerStore(
    (state) => ({
      openModal: state.openModal,
      gifts: state.gifts,
      isLoading: state.isLoading,
      point: state.point,
      selectedGifts: state.selectedGifts,
      selectedSeats: state.selectedSeats,
      incGift: state.incGift,
      desGift: state.desGift,
      closeModal: state.closeModal,
    }),
    shallow,
  );
  const toast = useToast();

  const shouldDisableInc = (gift: IGift) => point < gift.point;

  const getQuantity = (gift: IGift) => {
    const crGift = selectedGifts.find((g) => g.id === gift.id);
    return crGift ? crGift.quantity : 0;
  };

  const onSave = () => {
    const ticketsGift = selectedGifts.find((g) => g.type === 0);
    if (ticketsGift && ticketsGift.quantity > selectedSeats.length) {
      toast({
        title: `Bạn chỉ đổi được tối đa ${selectedSeats.length} vé`,
        status: 'info',
        position: 'top-right',
        isClosable: true,
      });
    } else {
      if (selectedGifts && selectedGifts.length) {
        setOpenAlert(!openAlert);
      } else {
        closeModal();
      }
    }
  };

  return (
    <Modal size="6xl" onClose={onSave} isOpen={openModal} closeOnEsc>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bonus Form</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Flex justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          ) : (
            <>
              <Flex width="50%" ml="auto" mb="20px">
                <FormControl id="point can add" mt={3} display="flex">
                  <FormLabel flex={1} flexShrink={0}>
                    Điểm hiện có
                  </FormLabel>
                  <Input flex={1} value={point} isReadOnly />
                </FormControl>
              </Flex>
              <Table size="md">
                <thead>
                  <Tr>
                    <Th>Quà</Th>
                    <Th></Th>
                    <Th>Điểm</Th>
                    <Th>Chọn</Th>
                  </Tr>
                </thead>
                <tbody>
                  {gifts &&
                    gifts.map((gift) => (
                      <Tr key={gift.id}>
                        <Td paddingX={0}>
                          <Img
                            src={gift.image}
                            htmlHeight="60px"
                            htmlWidth="100px"
                            alt={gift.name}
                          />
                        </Td>
                        <Td>{gift.name}</Td>
                        <Td>{gift.point}</Td>
                        <Td>
                          <Flex>
                            <IconButton
                              aria-label="minus gift"
                              icon={<HiMinusCircle />}
                              colorScheme="white"
                              variant="ghost"
                              isDisabled={getQuantity(gift) === 0}
                              onClick={() => desGift(gift)}
                            />
                            <Box
                              display="flex"
                              border="1px solid"
                              borderColor="gray.200"
                              rounded="md"
                              width="60px"
                              justifyContent="center"
                              alignItems="center"
                            >
                              {getQuantity(gift)}
                            </Box>
                            <IconButton
                              aria-label="increase gift"
                              icon={<HiPlusCircle />}
                              colorScheme="white"
                              variant="ghost"
                              isDisabled={shouldDisableInc(gift)}
                              onClick={() => incGift(gift)}
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                </tbody>
              </Table>
              <Alert
                isOpen={openAlert}
                title="Đổi thưởng"
                content="Bạn có chắc là đổi những phần thưởng này"
                showCloseButton={true}
                closeButtonText="Trở lại"
                triggerButton={{
                  children: 'Xác nhận',
                  variant: 'solid',
                  colorScheme: 'cyan',
                  onClick: () => closeModal(),
                  ml: 3,
                  color: 'white',
                }}
                onClose={() => setOpenAlert(!openAlert)}
              />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="cyan" type="submit" color="white" mr={3} onClick={onSave}>
            Lưu
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
