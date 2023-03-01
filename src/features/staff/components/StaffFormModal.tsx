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
import { useCreateStaff, usePermissions, useEditStaff } from '@/features/staff';
import { storage } from '@/lib/firebase';
import { useStaffStore } from '@/stores/staff';
import { Toast } from '@/utils/Toast';

export type StaffValues = {
  email: string;
  phoneNumber: string;
  fullName: string;
  avatar: string;
  male: boolean | string;
  dateOfBirth: string;
  permissionId: string;
  cinemaId: string;
};

const schema = z.object({
  fullName: z.string().nonempty({ message: 'Tên là bắt buộc' }),
  phoneNumber: z.string().nonempty({ message: 'Số điện thoại là bắt buộc' }),
  email: z.string().nonempty({ message: 'Email là bắt buộc' }),
  dateOfBirth: z.string().nonempty({ message: 'Ngày sinh là bắt buộc' }),
  avatar: z.string(),
  male: z.string().nonempty({ message: 'Giới tính là bắt buộc' }),
  permissionId: z.string().nonempty({ message: 'Role là bắt buộc' }),
  cinemaId: z.string().nonempty({ message: 'Rạp là bắt buộc' }),
});

export const StaffFormModal = () => {
  const initialRef = React.useRef(null);
  const {
    isOpen,
    onClose,
    data: dataStaff,
    type,
    staffId,
    setImageSource,
    imageSource,
  } = useStaffStore();
  const isAdding = type === STAFF_FORM.ADD;
  const StaffCreateMutation = useCreateStaff();
  const cinemasQuery = useCinemas();
  const permissionsQuery = usePermissions();
  const editStaffMutation = useEditStaff();
  const maleQuery = ['Male', 'Female'];
  const buttonText = isAdding ? 'Thêm nhân viên' : 'Chỉnh sửa';

  const saveStaff = (type: string, data: StaffValues): Promise<StaffRespon> | any => {
    const male = data.male == 'Male' ? true : false;
    if (!imageSource) {
      Toast('Vui lòng chọn hình ảnh', 'error');
    } else {
      if (type === STAFF_FORM.ADD) {
        return StaffCreateMutation.mutateAsync({ ...data, male, avatar: imageSource });
      }
      return editStaffMutation.mutateAsync({
        data: { ...data, male, avatar: imageSource },
        staffId,
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
                    registration={register('fullName')}
                    error={formState.errors['fullName']}
                  />
                  <InputField
                    type="text"
                    label="Số điện thoại"
                    registration={register('phoneNumber')}
                    error={formState.errors['phoneNumber']}
                  />
                  <InputField
                    type="text"
                    label="Email"
                    registration={register('email')}
                    error={formState.errors['email']}
                  />
                  <SingleSelect
                    registration={register('dateOfBirth')}
                    defaultValue={getValues('dateOfBirth')}
                    label="Ngày sinh"
                    error={formState.errors['dateOfBirth']}
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
                    registration={register('permissionId')}
                    error={formState.errors['permissionId']}
                    options={[
                      {
                        title: '',
                        items: permissionsQuery.data
                          ? permissionsQuery.data?.values.permissions.map(({ _id, name }) => ({
                              label: name,
                              value: _id,
                            }))
                          : [],
                      },
                    ]}
                  />
                  <SelectField
                    label="Rạp"
                    registration={register('cinemaId')}
                    error={formState.errors['cinemaId']}
                    options={[
                      {
                        title: '',
                        items: cinemasQuery.data
                          ? cinemasQuery.data?.values.cinemas.map(({ _id, name }) => ({
                              label: name,
                              value: _id,
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
                  {imageSource && (
                    <Flex>
                      <Image src={imageSource} alt="Image staff" boxSize="100px" />
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
