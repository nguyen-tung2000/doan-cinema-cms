import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Flex,
  Stack,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ButtonGroup,
  Heading,
  Table,
  Td,
  Th,
  Tr,
  Text,
} from "@chakra-ui/react";
import { Redirect, useHistory } from "react-router-dom";
import shallow from "zustand/shallow";

import { ROUTES } from "@/constants";
import { ComboItem, TicketCard } from "@/features/seller";
import { useSellerStore } from "@/stores/seller";
import { formatDate, formatNumber } from "@/utils/format";
import { isEmptyObject } from "@/utils/object";

export const PaymentComplete = () => {
  const { bills, clearBill } = useSellerStore(
    (state) => ({ bills: state.bills, clearBill: state.clearBill }),
    shallow,
  );
  console.log(bills);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useHistory();

  if (isEmptyObject(bills)) {
    return <Redirect to={ROUTES.SELLER} />;
  }

  return (
    <Box>
      <Flex flexDirection="column" alignItems="center">
        <Stack
          backgroundColor="white"
          px={5}
          py={5}
          shadow={[null, "md"]}
          spacing={4}
          w="50%"
          alignItems="center"
          flexShrink={0}
        >
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Thanh toán thành công!
            </AlertTitle>
            <AlertDescription maxWidth="sm">Cảm ơn bạn đã đồng hành cùng Movieer.</AlertDescription>
          </Alert>
          <ButtonGroup spacing="2" width="full" justifyContent="flex-end">
            <Button onClick={onOpen} mr={3} variant="outline" colorScheme="green">
              In vé
            </Button>
            <Button
              onClick={() => {
                router.push(ROUTES.SELLER);
                clearBill();
              }}
              colorScheme="green"
            >
              Trở lại
            </Button>
          </ButtonGroup>
        </Stack>
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hoá đơn</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {bills.ticketBill &&
              bills.ticketBill.data.map((bill) => (
                <TicketCard
                  key={bill.idSeat}
                  movieName={bills.movieName}
                  seatName={bill.seatName}
                  date={bills.date}
                  roomName={bills.roomName}
                  price={bill.price}
                  time={bills.time}
                  staff={bills.staff}
                />
              ))}

            {bills.foodBill && (
              <Stack spacing={2}>
                <Heading as="h4" fontSize="20px" textTransform="uppercase">
                  Hoá đơn bắp nước
                </Heading>
                <Text>Ngày tạo: {formatDate(new Date(bills.foodBill.bill.createdAt))}</Text>
                <FoodDetailTable foods={bills.foodBill.data} total={bills.foodBill.bill.total} />
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

interface IFoodDetailTable {
  foods: ComboItem[];
  total: number;
}

const FoodDetailTable = ({ foods, total }: IFoodDetailTable) => {
  return (
    <Table w="full">
      <thead>
        <Tr>
          <Th>Tên</Th>
          <Th>Số lượng</Th>
          <Th>Giá (VNĐ)</Th>
        </Tr>
      </thead>
      <tbody>
        {foods.map((food) => {
          return (
            <Box as="tr" key={food._id}>
              <Td>{food.name}</Td>

              <Td>{food.quantity}</Td>
              <Td>{formatNumber(food.price)}</Td>
            </Box>
          );
        })}
      </tbody>
      <tfoot>
        <Tr>
          <Td colSpan={2}>
            <Heading as="h6" fontWeight="bold" fontSize="14px">
              Tổng:
            </Heading>
          </Td>
          <Td>{formatNumber(total)}</Td>
        </Tr>
      </tfoot>
    </Table>
  );
};
