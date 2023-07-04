import {
  Box,
  Img,
  Heading,
  Badge,
  Stack,
  Button,
  Text,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useHistory } from 'react-router';

import { Alert } from '@/components';
import { ROUTES } from '@/constants';
import {
  mapToShowtimeDetails,
  SeatType,
  ComboItem,
  useBuyTicket,
  AuthUser,
  BillsResponse,
  getComboTotal,
  getInvoiceTotal,
  getNameCombo,
  getNameSeats,
  getNameGift,
  getDiscountPercent,
  IGift,
  getDiscount,
} from '@/features/seller';
import { ShowTimesDetail } from '@/features/showtimes';
import { useAuth } from '@/lib/auth';
import { formatNumber } from '@/utils/format';

interface ShowTimeDetailProps {
  detail: ShowTimesDetail;
  step: number;
  selectedSeats: SeatType[];
  selectedCombos: ComboItem[];
  selectedGifts: IGift[];
  selectedCoupons: string[];
  user: AuthUser;
  nextStep: () => void;
  previousStep: () => void;
  clearData: () => void;
  setBills: (bills: BillsResponse) => void;
}

export const ShowTimeDetail: React.FC<ShowTimeDetailProps> = (props) => {
  const {
    detail,
    step,
    user,
    selectedSeats,
    selectedCombos,
    selectedGifts,
    selectedCoupons,
    clearData,
    nextStep,
    previousStep,
    setBills,
  } = props;
  const showTimeDetail = mapToShowtimeDetails(detail);
  const toast = useToast();
  const history = useHistory();
  const buyTicketMutation = useBuyTicket();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user: staff } = useAuth();

  const total =
    getInvoiceTotal(selectedSeats) +
    getComboTotal(selectedCombos) -
    getDiscount(selectedGifts, selectedSeats);

  const discountTotal =
    total * (1 - getDiscountPercent(selectedGifts)) + getDiscount(selectedGifts, selectedSeats);

  const onPayTicket = async () => {
    const data = {
      combos: selectedCombos,
      data: selectedSeats,
      payment: {
        type: '0',
      },
      showTimeDetailId: showTimeDetail.id,
      userId: user && user.id,
      gifts: selectedGifts,
      coupons: selectedCoupons,
    };

    const { bills } = await buyTicketMutation.mutateAsync(data);
    setBills({
      ...bills,
      time: showTimeDetail.time,
      movieName: showTimeDetail.movieName,
      roomName: showTimeDetail.roomName,
      date: showTimeDetail.date,
      staff: staff || undefined,
    });
    history.push(ROUTES.PAYMENT_COMPLETE);
    clearData();
  };

  const contentAlert = `Bạn có muốn mua vé ${getNameSeats(selectedSeats)}  ${
    !!selectedCombos.length && `và ${getNameCombo(selectedCombos)}`
  }  ?`.replace('false', '');

  return (
    <>
      <Box>
        <Img
          src={showTimeDetail.moviePoster}
          alt={showTimeDetail.movieName}
          rounded={4}
          loading="lazy"
          htmlHeight="300px"
          htmlWidth="250px"
        />

        <Heading as="h4" fontSize="md" textTransform="uppercase" mt={4}>
          {showTimeDetail.movieName}
        </Heading>
        <Box display="flex" alignItems="flex-start" my={5} flexDirection="column">
          <Badge colorScheme="cyan" variant="solid">
            C{showTimeDetail.movieLimitAge}
          </Badge>
          <Text color="red" fontSize="md">
            (*) Phim dành cho khán giả từ {showTimeDetail.movieLimitAge} tuổi trở lên
          </Text>
        </Box>
        <Stack spacing={2}>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Rạp : </b> Movieer | Phòng: {showTimeDetail.roomName}
          </Box>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Suất chiếu : </b> {`${showTimeDetail.time} | ${showTimeDetail.date}`}
          </Box>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Combo : </b>
            {getNameCombo(selectedCombos)}
          </Box>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Quà tặng : </b>
            {getNameGift(selectedGifts)}
          </Box>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Ghế : </b>
            {getNameSeats(selectedSeats)}
          </Box>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Tổng : </b>
            {formatNumber(getInvoiceTotal(selectedSeats) + getComboTotal(selectedCombos))} VNĐ
          </Box>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Giảm giá : </b>
            {formatNumber(discountTotal)} VNĐ
          </Box>
          <Box>
            Số tiền cần trả:
            <Text as="span" fontSize="lg" fontWeight="500" ml={2}>
              {formatNumber(total * getDiscountPercent(selectedGifts))} VNĐ
            </Text>
          </Box>
          <Stack spacing={2} direction="row">
            <Button
              leftIcon={<BsArrowLeft />}
              colorScheme="cyan"
              color="white"
              isDisabled={step === 1}
              onClick={previousStep}
            >
              Quay lại
            </Button>
            {step === 1 ? (
              <Button
                rightIcon={<BsArrowRight />}
                colorScheme="cyan"
                color="white"
                onClick={() => {
                  if (!selectedSeats.length) {
                    toast({
                      title: `Vui lòng chọn vé trước`,
                      status: 'info',
                      isClosable: true,
                      position: 'top-right',
                    });
                  } else {
                    nextStep();
                  }
                }}
              >
                Tiếp tục
              </Button>
            ) : (
              <Button
                colorScheme="cyan"
                color="white"
                onClick={() => {
                  onOpen();
                }}
              >
                Thanh toán
              </Button>
            )}
          </Stack>

          <Alert
            isOpen={isOpen}
            title="Thanh toán"
            content={contentAlert}
            showCloseButton={true}
            closeButtonText="Trở lại"
            triggerButton={{
              children: 'Thanh toán',
              variant: 'solid',
              colorScheme: 'cyan',
              onClick: () => onPayTicket(),
              ml: 3,
              color: 'white',
              isLoading: buyTicketMutation.isLoading ? buyTicketMutation.isLoading : undefined,
            }}
            onClose={onClose}
          />
        </Stack>
      </Box>
    </>
  );
};
