import {
  Button,
  CloseButton,
  Flex,
  Heading,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import { ChangePassword, ChangePasswordType } from '..';

import { SingleSelect } from '@/components';
import { InputField, RadioField, FileUpload } from '@/components/Form';
import { StaffValues, useEditStaff } from '@/features/staff';
import { useAuth } from '@/lib/auth';
import { storage } from '@/lib/firebase';
import { Toast } from '@/utils/Toast';

const schemaPassword = z.object({
  old_password: z.string().nonempty({ message: 'Vui lòng nhập mật khẩu cũ' }),
  new_password: z.string().nonempty({ message: 'Vui lòng nhập mật khẩu mới' }),
  confirm_password: z.string().nonempty({ message: 'Vui lòng nhập lại mật khẩu' }),
});

const schemaProfile = z.object({
  name: z.string().nonempty({ message: 'Tên là bắt buộc' }),
  phone_number: z.string().nonempty({ message: 'Số điện thoại là bắt buộc' }),
  email: z.string().nonempty({ message: 'Email là bắt buộc' }),
  date_of_birth: z.string().nonempty({ message: 'Ngày sinh là bắt buộc' }),
  avatar: z.string(),
  male: z.string().nonempty({ message: 'Giới tính là bắt buộc' }),
});

interface PasswordProps {
  onClose: () => void;
  isOpen: boolean;
  type: number;
}

export const Password = ({ onClose, isOpen, type }: PasswordProps) => {
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: type === 0 ? zodResolver(schemaPassword) : zodResolver(schemaProfile),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      name: user?.name,
      phoneNumber: user?.phone_number,
      email: user?.email,
      date_of_birth: user?.date_of_birth,
      male: user?.male,
      avatar: user?.avatar,
    },
  });
  const maleQuery = ['Male', 'Female'];
  const editStaffMutation = useEditStaff();
  const [imageSource, setImageSource] = React.useState<string>(user?.avatar || '');
  const onLogin: SubmitHandler<ChangePasswordType> = async (data: ChangePasswordType) => {
    const res = await ChangePassword(data);
    if (res.success) {
      Toast(res.message);
      onClose();
      reset();
    } else {
      if (res.values.errors.oldPassword) {
        Toast(res.values.errors.oldPassword, 'error');
      } else if (res.values.errors.newPassword) {
        Toast(res.values.errors.newPassword, 'error');
      } else if (res.values.errors.confirmPassword) {
        Toast(res.values.errors.confirmPassword, 'error');
      }
    }
  };

  const onProfile: SubmitHandler<StaffValues> = async (data: StaffValues) => {
    const male = data.male == 'Male' ? true : false;
    if (imageSource) {
      await editStaffMutation.mutateAsync({
        data: {
          ...data,
          permission_id: user?.permission_id,
          male,
          avatar: imageSource,
          cinema_id: user?.cinema_id,
        },
        staff_id: user?.id,
      });
      onClose();
    } else {
      Toast('Vui lòng chọn hình ảnh', 'error');
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      {type === 0 ? (
        <ModalContent>
          <Flex w="100%" background="gray.200" borderRadius={6}>
            <Stack
              as="form"
              backgroundColor="white"
              borderRadius={[0, 8]}
              onSubmit={handleSubmit(onLogin)}
              px={8}
              py={12}
              shadow={[null, 'md']}
              spacing={4}
              w="100%"
            >
              <Heading fontWeight="bold">Change Password</Heading>
              <ModalCloseButton />
              <InputField
                label="Old Password"
                registration={register('oldPassword')}
                aria-label="Old Password"
                type="password"
                error={errors['oldPassword']}
              />
              <InputField
                label="New Password"
                registration={register('newPassword')}
                aria-label="New Password"
                type="password"
                error={errors['newPassword']}
              />
              <InputField
                label="Confirm Password"
                registration={register('confirmPassword')}
                aria-label="Confirm Password"
                type="password"
                error={errors['confirmPassword']}
              />
              <Button
                id="login"
                type="submit"
                backgroundColor="cyan.400"
                color="white"
                fontWeight="medium"
                mt={4}
                h="50px"
                fontSize="lg"
                _hover={{ bg: 'cyan.700' }}
                _active={{
                  bg: 'cyan.200',
                  transform: 'scale(0.95)',
                }}
              >
                Change Password
              </Button>
            </Stack>
          </Flex>
        </ModalContent>
      ) : (
        <ModalContent>
          <Flex w="100%" background="gray.200" borderRadius={6}>
            <Stack
              as="form"
              backgroundColor="white"
              borderRadius={[0, 8]}
              onSubmit={handleSubmit(onProfile)}
              px={8}
              py={12}
              shadow={[null, 'md']}
              spacing={4}
              w="100%"
            >
              <Heading fontWeight="bold">Change Profile</Heading>
              <ModalCloseButton />
              <InputField
                type="text"
                label="Tên nhân viên"
                registration={register('name')}
                error={errors['name']}
              />
              <InputField
                type="text"
                label="Số điện thoại"
                registration={register('phoneNumber')}
                error={errors['phoneNumber']}
              />
              <InputField
                type="text"
                label="Email"
                registration={register('email')}
                error={errors['email']}
                disabled
              />
              <SingleSelect
                registration={register('date_of_birth')}
                defaultValue={getValues('date_of_birth')}
                label="Ngày sinh"
                error={errors['date_of_birth']}
              />
              <RadioField
                label="Giới tính"
                registration={register('male')}
                defaultValue={getValues('male') ? 'Male' : 'Female'}
                options={maleQuery}
                error={errors['male']}
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
              <Button
                id="login"
                type="submit"
                backgroundColor="cyan.400"
                color="white"
                fontWeight="medium"
                mt={4}
                h="50px"
                fontSize="lg"
                _hover={{ bg: 'cyan.700' }}
                _active={{
                  bg: 'cyan.200',
                  transform: 'scale(0.95)',
                }}
              >
                Change Profile
              </Button>
            </Stack>
          </Flex>
        </ModalContent>
      )}
    </Modal>
  );
};
