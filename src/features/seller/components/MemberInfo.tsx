import { Input, Box, FormControl, FormLabel, Button } from '@chakra-ui/react';
import * as React from 'react';

import { SITE_MODAL_TYPES } from '@/constants';
interface MemberInfoProps {
  name: string;
  point: number;
  newPoint: number;
  screenId: string;
  setModal: (modalType: string) => void;
  fetchGifts: (screenId: string) => Promise<boolean>;
  getScreen: (screenId: string) => void;
}

export const MemberInfo: React.FC<MemberInfoProps> = (props) => {
  const { name, point, newPoint, screenId, setModal, fetchGifts, getScreen } = props;

  return (
    <React.Fragment>
      <FormControl id="name" mt={3} display="flex">
        <FormLabel flex={1} flexShrink={0}>
          Tên khách hàng
        </FormLabel>
        <Input flex={1} value={name} isReadOnly />
      </FormControl>
      <FormControl id="point" mt={3} display="flex">
        <FormLabel flex={1} flexShrink={0}>
          Điểm tích luỹ
        </FormLabel>
        <Input flex={1} value={point} isReadOnly />
      </FormControl>
      <FormControl id="point can add" mt={3} display="flex">
        <FormLabel flex={1} flexShrink={0}>
          Điểm cộng thêm
        </FormLabel>
        <Input flex={1} value={newPoint} isReadOnly />
      </FormControl>
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button
          colorScheme="cyan"
          color="white"
          mr={3}
          onClick={async () => {
            setModal(SITE_MODAL_TYPES.BONUS_FORM);
            await fetchGifts(screenId);
          }}
        >
          Đổi thưởng
        </Button>
        <Button
          colorScheme="cyan"
          color="white"
          onClick={() => {
            setModal(SITE_MODAL_TYPES.COUPON_FORM);
            getScreen(screenId);
          }}
        >
          Coupon
        </Button>
      </Box>
    </React.Fragment>
  );
};
