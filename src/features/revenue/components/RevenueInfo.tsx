import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/modal";
import { IconButton, Text, SimpleGrid, Box, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { FiInfo } from "react-icons/fi";

import { IRevenueData } from "@/features/revenue";

interface RevenueInfoProps {
  revenueData: IRevenueData;
}

export const RevenueInfo: React.FC<RevenueInfoProps> = ({ revenueData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        colorScheme="teal"
        variant="outline"
        aria-label="info"
        size="lg"
        icon={<FiInfo />}
        onClick={onOpen}
      />

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chi tiết hoá đơn</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={5}>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Mã hoá đơn
                  </Heading>
                  <Text>{revenueData?.billId || ""}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Ngày
                  </Heading>
                  <Text>{revenueData.createdAt}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Loại vé
                  </Heading>
                  <Text>{revenueData.type}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Tên phim
                  </Heading>
                  <Text>{revenueData.movieName}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Phòng
                  </Heading>
                  <Text>{revenueData.roomName}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Màn hình
                  </Heading>
                  <Text>{revenueData.screenName}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Số lượng
                  </Heading>
                  <Text>{revenueData.quantity}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Đơn giá
                  </Heading>
                  <Text>{revenueData.price}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Số tiền giảm
                  </Heading>
                  <Text>{revenueData.promotion}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Số điểm cộng thêm
                  </Heading>
                  <Text>{revenueData.point}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Tổng
                  </Heading>
                  <Text>{revenueData.total}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Loại khuyến mãi
                  </Heading>
                  <Text>{revenueData.promotionType}</Text>
                </Stack>
              </Box>

              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Tên Nhân viên
                  </Heading>
                  <Text>{revenueData.staff.profile?.fullName || ""}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Heading as="h4" size="md">
                    Tên khách hàng
                  </Heading>
                  <Text>{revenueData.user.profile?.fullName || ""}</Text>
                </Stack>
              </Box>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
