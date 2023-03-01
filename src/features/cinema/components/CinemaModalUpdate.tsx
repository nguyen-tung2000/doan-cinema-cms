import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { MdSettings } from 'react-icons/md';
import * as z from 'zod';

import { useUpdateCinema } from '../api/updateCinema';

import { Form, InputField, AddressField } from '@/components';
import { UserAddress } from '@/features/auth';

type CinemaValues = {
  _id: string;
  name: string;
  address: {
    city: string;
    district: string;
    ward: string;
    street: string;
  };
};

const schema = z.object({
  name: z.string().nonempty({ message: 'Tên rạp là bắt buộc' }),
  address: z.object({
    city: z.string().nonempty({ message: 'Thành phố là bắt buộc' }),
    district: z.string().nonempty({ message: 'Quận/Huyện là bắt buộc' }),
    ward: z.string().nonempty({ message: 'Phường/Xã là bắt buộc' }),
    street: z.string().nonempty({ message: 'Đường là bắt buộc' }),
  }),
});

export const CinemaModalUpdate: React.FC<CinemaValues> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef() as any;
  const cinemaUpdateMutation = useUpdateCinema();
  const cl = useColorModeValue('white', 'gray.900');

  const onUpdateCinema = async (data: CinemaValues) => {
    const { name, address } = data;
    const newCity = address.city.split('-');
    const newWard = address.ward.split('-');
    const newDistrict = address.district.split('-');

    const values = {
      name,
      address: {
        ...address,
        city: newCity.length < 2 ? newCity[0] : newCity[1],
        district: newDistrict.length < 2 ? newDistrict[0] : newDistrict[1],
        ward: newWard.length < 2 ? newWard[0] : newWard[1],
      },
    };
    await cinemaUpdateMutation.mutateAsync({ data: values, cinemaId: props._id });
  };

  return (
    <>
      <Button
        leftIcon={<MdSettings />}
        colorScheme="cyan"
        color={cl}
        variant="solid"
        onClick={onOpen}
      >
        Sửa
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <Form<CinemaValues, typeof schema>
            onSubmit={async (data) => {
              await onUpdateCinema(data);
              onClose();
            }}
            options={{ defaultValues: props }}
            schema={schema}
          >
            {({ register, formState }) => (
              <>
                <ModalHeader fontWeight="bold">Update Cinema</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <InputField
                    type="text"
                    label="Tên Rạp Phim"
                    error={formState.errors['name']}
                    registration={register('name')}
                  />
                  <AddressField
                    register={register}
                    formState={formState}
                    userAddress={props.address as UserAddress}
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
                    isLoading={cinemaUpdateMutation.isLoading}
                  >
                    Update
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
