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
  rows: string;
  seats_per_row: string;
  vip_seat_start: string;
  vip_seat_end: string;
  couple_row: string;
  number_seat_couple: string;
  screen_id: string;
};

const schema = z.object({
  name: z.string().nonempty({ message: 'Tên phòng là bắt buộc' }),
  rows: z.string().nonempty().max(2),
  seats_per_row: z.string().nonempty().max(2),
  vip_seat_start: z.string().nonempty().max(2),
  vip_seat_end: z.string().nonempty().max(2),
  couple_row: z.string().nonempty().max(1),
  number_seat_couple: z.string().nonempty().max(1),
  screen_id: z.string(),
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
              const rows = parseInt(data.rows, 10);
              const seats_per_row = parseInt(data.seats_per_row, 10);
              const vip_seat_start = parseInt(data.vip_seat_start, 10);
              const vip_seat_end = parseInt(data.vip_seat_end, 10);
              const couple_row = parseInt(data.couple_row, 10);
              const number_seat_couple = parseInt(data.number_seat_couple, 10);
              await RoomCreateMutation.mutateAsync({
                ...data,
                rows,
                seats_per_row,
                vip_seat_start,
                vip_seat_end,
                couple_row,
                number_seat_couple,
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
                    registration={register('screen_id')}
                    error={formState.errors['screen_id']}
                    options={[
                      {
                        title: '',
                        items: screensQuery.data
                          ? screensQuery.data?.values.map(({ id, name }) => ({
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
                    min={8}
                    defaultValue={10}
                    error={formState.errors['rows']}
                    registration={register('rows')}
                  />
                  <InputNumberField
                    label="Số ghế mỗi hàng"
                    max={15}
                    min={8}
                    defaultValue={10}
                    error={formState.errors['seats_per_row']}
                    registration={register('seats_per_row')}
                  />
                  <InputNumberField
                    label="Hàng ghế vip đầu tiên"
                    max={10}
                    min={3}
                    defaultValue={6}
                    error={formState.errors['seats_per_row']}
                    registration={register('vip_seat_start')}
                  />
                  <InputNumberField
                    label="Hàng ghế vip cuối cùng"
                    max={15}
                    min={8}
                    defaultValue={10}
                    error={formState.errors['seats_per_row']}
                    registration={register('vip_seat_end')}
                  />
                  <InputNumberField
                    label="Hàng ghê couple"
                    max={1}
                    min={0}
                    defaultValue={1}
                    error={formState.errors['seats_per_row']}
                    registration={register('couple_row')}
                  />
                  <InputNumberField
                    label="Số ghế couple"
                    max={8}
                    min={2}
                    defaultValue={4}
                    error={formState.errors['seats_per_row']}
                    registration={register('number_seat_couple')}
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
