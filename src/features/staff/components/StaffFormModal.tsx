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
  Flex,
  Image,
  CloseButton,
} from '@chakra-ui/react';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import React from 'react';
import { Controller } from 'react-hook-form';
import * as z from 'zod';

import { StaffRespon } from '../type';

import { FileUpload, Form, InputField, RadioField, SelectField, SingleSelect } from '@/components';
import { STAFF_FORM } from '@/constants';
import { useCinemas } from '@/features/cinema';
import { useCreateStaff, useEditStaff } from '@/features/staff';
import { storage } from '@/lib/firebase';
import { useStaffStore } from '@/stores/staff';
import { Toast } from '@/utils/Toast';

export type StaffValues = {
  email: string;
  phone_number: string;
  name: string;
  avatar: string;
  male: boolean | string;
  date_of_birth: string;
  permission_id: number;
  cinema_id: string;
};

const schema = z.object({
  name: z.string().nonempty({ message: 'Tên là bắt buộc' }),
  phone_number: z.string().nonempty({ message: 'Số điện thoại là bắt buộc' }),
  email: z.string().nonempty({ message: 'Email là bắt buộc' }),
  date_of_birth: z.string().nonempty({ message: 'Ngày sinh là bắt buộc' }),
  avatar: z.string(),
  male: z.string().nonempty({ message: 'Giới tính là bắt buộc' }),
  permission_id: z.number().gte(1).lte(3),
  cinema_id: z.string().nonempty({ message: 'Rạp là bắt buộc' }),
});

export const StaffFormModal = () => {
  const initialRef = React.useRef(null);
  const {
    isOpen,
    onClose,
    data: dataStaff,
    type,
    staff_id,
    setImageSource,
    image_source,
  } = useStaffStore();
  const isAdding = type === STAFF_FORM.ADD;
  const StaffCreateMutation = useCreateStaff();
  const cinemasQuery = useCinemas();
  const editStaffMutation = useEditStaff();
  const maleQuery = ['Male', 'Female'];
  const buttonText = isAdding ? 'Thêm nhân viên' : 'Chỉnh sửa';

  const saveStaff = (type: string, data: StaffValues): Promise<StaffRespon> | any => {
    const male = data.male == 'Male' ? true : false;
    if (!image_source) {
      Toast('Vui lòng chọn hình ảnh', 'error');
    } else {
      if (type === STAFF_FORM.ADD) {
        return StaffCreateMutation.mutateAsync({ ...data, male, avatar: image_source });
      }
      return editStaffMutation.mutateAsync({
        data: { ...data, male, avatar: image_source },
        staff_id,
      });
    }
  };

  const handleImage = async (e: any) => {
    if (e.target.files) {
      const fileName = e.target.files[0];
      const storageRef = ref(storage, `images/${fileName.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileName);
      await uploadBytes(storageRef, fileName);
      getDownloadURL(uploadTask.snapshot.ref).then((url: any) => setImageSource(url));
    }
  };
  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <Form<StaffValues, typeof schema>
            onSubmit={async (data) => {
              const res = await await saveStaff(type, data);
              if (!res?.success) {
                if (res?.errors.phoneNumber) {
                  Toast(res?.errors.phoneNumber, 'error');
                } else if (res?.errors.email) {
                  Toast(res?.errors.email, 'error');
                } else if (res?.errors.male) {
                  Toast(res?.errors.male, 'error');
                } else if (res?.errors.name) {
                  Toast(res?.errors.name, 'error');
                }
                return;
              }
              onClose();
            }}
            schema={schema}
            options={{
              defaultValues: dataStaff,
            }}
          >
            {({ register, formState, getValues, control }) => (
              <>
                <ModalHeader fontWeight="bold">{buttonText}</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={Stack} spacing={5} direction="column">
                  <InputField
                    type="text"
                    label="Tên nhân viên"
                    registration={register('name')}
                    error={formState.errors['name']}
                  />
                  <InputField
                    type="text"
                    label="Số điện thoại"
                    registration={register('phone_number')}
                    error={formState.errors['phone_number']}
                  />
                  <InputField
                    type="text"
                    label="Email"
                    registration={register('email')}
                    error={formState.errors['email']}
                  />
                  <SingleSelect
                    registration={register('date_of_birth')}
                    defaultValue={getValues('date_of_birth')}
                    label="Ngày sinh"
                    error={formState.errors['date_of_birth']}
                  />
                  <RadioField
                    label="Giới tính"
                    registration={register('male')}
                    defaultValue={getValues('male') ? 'Male' : 'Female'}
                    options={maleQuery}
                    error={formState.errors['male']}
                  />
                  <SelectField
                    label="Role"
                    registration={register('permission_id')}
                    error={formState.errors['permission_id']}
                    options={[
                      {
                        title: '',
                        items: [
                          { label: 'Admin', value: 1 },
                          { label: 'Manager', value: 2 },
                          { label: 'Staff', value: 3 },
                        ],
                      },
                    ]}
                  />
                  <SelectField
                    label="Rạp"
                    registration={register('cinema_id')}
                    error={formState.errors['cinema_id']}
                    options={[
                      {
                        title: '',
                        items: cinemasQuery.data
                          ? cinemasQuery.data?.values.map(({ id, name }) => ({
                              label: name,
                              value: id,
                            }))
                          : [],
                      },
                    ]}
                  />
                  <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                      <FileUpload
                        label="File"
                        acceptedFileTypes={'image/*'}
                        onChange={(value: any) => {
                          field.onChange(value);
                          handleImage(value);
                        }}
                      />
                    )}
                  />
                  {image_source && (
                    <Flex>
                      <Image src={image_source} alt="Image staff" boxSize="100px" />
                      <CloseButton
                        size="sm"
                        ml="-25px"
                        colorScheme="teal"
                        onClick={() => setImageSource('')}
                      />
                    </Flex>
                  )}
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
                    isLoading={
                      isAdding ? StaffCreateMutation.isLoading : editStaffMutation.isLoading
                    }
                  >
                    {buttonText}
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
