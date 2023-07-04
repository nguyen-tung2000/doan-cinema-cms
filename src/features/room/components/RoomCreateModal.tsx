import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import * as z from 'zod';

import { Form, InputField, InputNumberField, SelectField } from '@/components';
import { useScreens, useCreateRoom } from '@/features/room';
import { useAuth } from '@/lib/auth';

type RoomValues = {
  name: string;
  rowNumber: string;
  seatsInRow: string;
  screenId: string;
};

const schema = z.object({
  name: z.string().nonempty({ message: 'Tên phòng là bắt buộc' }),
  rowNumber: z.string().nonempty().max(2),
  seatsInRow: z.string().nonempty().max(2),
  screenId: z.string(),
});

export const RoomCreateModal = () => {
  const bg = useColorModeValue('gray.900', 'white');
  const color = useColorModeValue('white', 'gray.900');

  const initialRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const screensQuery = useScreens();
  const RoomCreateMutation = useCreateRoom();
  const { user } = useAuth();

  return (
    <>
      <Button
        leftIcon={<MdAdd />}
        backgroundColor={bg}
        color={color}
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
        onClick={onOpen}
      >
        Tạo phòng
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <Form<RoomValues, typeof schema>
            onSubmit={async (data) => {
              const cinemaId = user?.cinema.id as string;
              const rowNumber = parseInt(data.rowNumber, 10);
              const seatsInRow = parseInt(data.seatsInRow, 10);
              await RoomCreateMutation.mutateAsync({
                ...data,
                cinemaId,
                rowNumber,
                seatsInRow,
              });
              onClose();
            }}
            schema={schema}
          >
            {({ register, formState }) => (
              <>
                <ModalHeader fontWeight="bold">Thêm phòng</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={Stack} spacing={5} direction="column">
                  <InputField
                    type="text"
                    label="Tên Phòng"
                    registration={register('name')}
                    error={formState.errors['name']}
                  />
                  <SelectField
                    label="Màn hình"
                    registration={register('screenId')}
                    error={formState.errors['screenId']}
                    options={[
                      {
                        title: '',
                        items: screensQuery.data
                          ? screensQuery.data?.values.screens.map(({ id, name }) => ({
                              label: name,
                              value: id,
                            }))
                          : [],
                      },
                    ]}
                  />
                  <InputNumberField
                    label="Số hàng ghế"
                    max={20}
                    min={10}
                    defaultValue={15}
                    error={formState.errors['rowNumber']}
                    registration={register('rowNumber')}
                  />
                  <InputNumberField
                    label="Số ghế mỗi hàng"
                    max={15}
                    min={8}
                    defaultValue={10}
                    error={formState.errors['seatsInRow']}
                    registration={register('seatsInRow')}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose} mr={3} fontWeight="medium">
                    Cancel
                  </Button>
                  <Button
                    backgroundColor="cyan.400"
                    color="white"
                    fontWeight="medium"
                    type="submit"
                    _hover={{
                      backgroundColor: 'cyan.700',
                    }}
                    isLoading={RoomCreateMutation.isLoading}
                  >
                    Tạo phòng
                  </Button>
                </ModalFooter>
              </>
            )}
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
