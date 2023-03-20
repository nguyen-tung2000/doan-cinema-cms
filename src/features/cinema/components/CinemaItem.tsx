import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Stack,
  useColorModeValue,
  IconButton,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdInfo } from "react-icons/md";
import { Link, useRouteMatch } from "react-router-dom";

import logoImage from "@/assets/logo.jpeg";
import { AuthUser } from "@/features/auth";
import { CinemaType, useDeleteCinema, CinemaModalUpdate } from "@/features/cinema";
import { useAuth } from "@/lib/auth";
import { Authorization, POLICIES } from "@/lib/authorization";

export const CinemaItem: React.FC<CinemaType> = (props) => {
  const bg = useColorModeValue("white", "gray.900");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelRef: any = useRef();
  const onClose = () => setIsOpen(false);
  const deleteCinemaMutation = useDeleteCinema();
  const { user } = useAuth();
  const { url } = useRouteMatch();

  const onDelete = async () => {
    await deleteCinemaMutation.mutateAsync({ cinemaId: props._id });
  };

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      padding="5"
      borderRadius="8px"
      backgroundColor={bg}
      mb="5"
    >
      <Flex alignItems="flex-start">
        <Box>
          <Image src={logoImage} minWidth="130px" height="130px" objectFit="cover" alt="logo" />
        </Box>
        <Box paddingX="12px">
          <Box mb="3">
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="lg" mb="1">
                {props.name}
              </Heading>
              <Authorization policyCheck={POLICIES["cinema:delete"](user as AuthUser)}>
                <IconButton
                  size="lg"
                  variant="ghost"
                  aria-label="toogle theme"
                  icon={<FiTrash />}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </Authorization>
              <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Xoá rạp
                  </AlertDialogHeader>
                  <AlertDialogBody>Bạn có chắc chắc muốn xoá rạp ?</AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Trở lại
                    </Button>
                    <Button
                      fontWeight="bold"
                      colorScheme="red"
                      onClick={onDelete}
                      ml={3}
                      isLoading={deleteCinemaMutation.isLoading}
                    >
                      Xoá
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Flex>

            <Text fontSize="md" textColor="gray.500">
              {`${props.address.street}, ${props.address.ward}, ${props.address.district}, ${props.address.city}`}
            </Text>
          </Box>
          <Text fontSize="sm" fontWeight="medium">
            {` Xem Lịch chiếu và Mua vé ${props.name} - rạp Movieer toàn quốc dễ dàng - nhanh chóng
            tại Movieer. Rạp Movieer ${props.name} nằm ở đường ${props.address.street} ${props.address.district} ${props.address.city}, là rạp chiếu phim đầu tiên của
            Movieer Cinema được xây dựng với tiêu chuẩn Hollywood, có nhiều phòng chiếu ,
            chuẩn âm thanh Dolby 7.1. ${props.name} nằm ở khu vực rất thuận lợi cho các bạn sinh
            viên - học sinh lẫn nhân viên văn phòng. Bên trong khuôn viên còn thường xuyên tổ chức
            các sự kiện ra mắt phim và hội chợ hết sức thú vị.`}
          </Text>
        </Box>
      </Flex>
      <Stack direction="row" spacing={4} mt="4" justifyContent="flex-end">
        <Authorization policyCheck={POLICIES["cinema:update"](user as AuthUser)}>
          <CinemaModalUpdate {...props} />
        </Authorization>
        <Button
          as={Link}
          to={`${url}/${props._id}`}
          leftIcon={<MdInfo />}
          colorScheme="cyan"
          variant="outline"
        >
          Chi tiết
        </Button>
      </Stack>
    </Box>
  );
};
