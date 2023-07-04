import { SimpleGrid, Box, Stack, Heading } from '@chakra-ui/layout';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/modal';
import { Text } from '@chakra-ui/react';
import React from 'react';

interface CustomerInfoProps {
  isVisible: boolean;
  customer: any;
  onCloseModal: () => void;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({
  isVisible,
  customer,
  onCloseModal,
}) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isVisible} onClose={onCloseModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thông tin</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={2} spacing={5}>
            <Box>
              <Stack spacing={2}>
                <Heading as="h4" size="md">
                  Họ tên
                </Heading>
                <Text>{customer?.name || ''} </Text>
              </Stack>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Heading as="h4" size="md">
                  Ngày sinh
                </Heading>
                <Text>{customer?.date_of_birth || ''}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Heading as="h4" size="md">
                  Email
                </Heading>
                <Text>{customer?.email}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Heading as="h4" size="md">
                  Số điện thoại
                </Heading>
                <Text>{customer?.phone_number}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Heading as="h4" size="md">
                  Điểm tích luỹ
                </Heading>
                <Text>{customer?.customer?.point || 0}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Heading as="h4" size="md">
                  Giới tính
                </Heading>
                <Text>{customer?.male ? 'Nam' : 'Nữ'}</Text>
              </Stack>
            </Box>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
