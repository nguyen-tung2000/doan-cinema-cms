import { Box, BreadcrumbItem, BreadcrumbLink, Flex, Stack, Spinner } from '@chakra-ui/react';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import shallow from 'zustand/shallow';

import { SiteHeader } from '@/components';
import { ROUTES, SITE_MODAL_TYPES } from '@/constants';
import {
  useTicketsByShowTimes,
  ShowTimeDetail,
  MemberFormModal,
  BonusFormModal,
  CouponFormModal,
  SeatsRoute,
  FoodRoute,
} from '@/features/seller';
import { Authorization, ROLES } from '@/lib/authorization';
import { ModalType, useSellerStore } from '@/stores/seller';

interface TParams {
  _id: string;
}

export const getModal = (modalType: ModalType) => {
  switch (modalType) {
    case SITE_MODAL_TYPES.MEMBER_FORM:
      return <MemberFormModal />;
    case SITE_MODAL_TYPES.BONUS_FORM:
      return <BonusFormModal />;
    case SITE_MODAL_TYPES.COUPON_FORM:
      return <CouponFormModal />;
    default:
      return undefined;
  }
};

export const SellerTicket = () => {
  const params: TParams = useParams();
  const ticketsByShowTimesQuery = useTicketsByShowTimes({ showtimesId: params._id });
  const {
    modalType,
    step,
    selectedCombos,
    selectedGifts,
    selectedSeats,
    selectedCoupons,
    member,
    point,
    setModal,
    nextStep,
    previousStep,
    inc,
    des,
    reset,
    setBills,
    fetchGifts,
    setSelectedSeats,
    getScreen,
  } = useSellerStore(
    (state) => ({
      modalType: state.modalType,
      step: state.step,
      selectedCombos: state.selectedCombos,
      selectedGifts: state.selectedGifts,
      selectedSeats: state.selectedSeats,
      selectedCoupons: state.selectedCoupons,
      member: state.member,
      point: state.point,
      setModal: state.setModal,
      nextStep: state.nextStep,
      previousStep: state.previousStep,
      inc: state.inc,
      des: state.des,
      reset: state.reset,
      setBills: state.setBills,
      fetchGifts: state.fetchGifts,
      setSelectedSeats: state.setSelectedSeats,
      getScreen: state.getScreen,
    }),
    shallow,
  );

  if (ticketsByShowTimesQuery.isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    );
  }

  if (!ticketsByShowTimesQuery.data?.values) {
    return null;
  }

  return (
    <Box>
      <Authorization
        forbiddenFallback={<div>Only manager and user can view this.</div>}
        allowedRoles={[ROLES.MANAGER, ROLES.USER]}
      >
        <SiteHeader menuName="Lịch chiếu" menuHref={ROUTES.SELLER} heading={`Chi tiết lịch chiếu `}>
          <BreadcrumbItem>
            <BreadcrumbLink>Suất chiếu phim</BreadcrumbLink>
          </BreadcrumbItem>
        </SiteHeader>
        <Flex justifyContent="flex-start">
          <Stack
            backgroundColor="white"
            px={12}
            py={12}
            shadow={[null, 'md']}
            spacing={4}
            w="100%"
            alignItems="center"
            flexShrink={0}
          >
            <Stack spacing={3} w="100%" direction="row">
              {/*Select seat  */}
              <Box w="70%">
                {step == 1 && (
                  <SeatsRoute
                    seats={ticketsByShowTimesQuery.data.values.tickets}
                    selectedSeats={selectedSeats}
                    selectedCombos={selectedCombos}
                    selectedGifts={selectedGifts}
                    member={member}
                    memberPoint={point}
                    screenId={ticketsByShowTimesQuery.data.values.showTimeDetail.room.screen._id}
                    setSelectedSeats={setSelectedSeats}
                    setModal={setModal}
                    fetchGifts={fetchGifts}
                    getScreen={getScreen}
                  />
                )}
                {step == 2 && (
                  <FoodRoute
                    listCombo={ticketsByShowTimesQuery.data.values.combos}
                    selectedCombos={selectedCombos}
                    increaseQuantity={inc}
                    descreaseQuantity={des}
                  />
                )}
              </Box>
              <Box w="30%" background="gray.100" p={3}>
                {/*Movie Detail  */}
                <ShowTimeDetail
                  detail={ticketsByShowTimesQuery.data.values.showTimeDetail}
                  step={step}
                  nextStep={nextStep}
                  previousStep={previousStep}
                  selectedSeats={selectedSeats}
                  selectedCombos={selectedCombos}
                  selectedGifts={selectedGifts}
                  selectedCoupons={selectedCoupons}
                  clearData={reset}
                  user={member}
                  setBills={setBills}
                />
              </Box>
            </Stack>
          </Stack>
        </Flex>

        {getModal(modalType)}
      </Authorization>
    </Box>
  );
};
