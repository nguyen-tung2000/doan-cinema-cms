import {
  Box,
  Heading,
  Stack,
  Tag,
  SimpleGrid,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Text,
  Input,
} from '@chakra-ui/react';
import React from 'react';

import { PRICE } from '@/constants';
import {
  SeatList,
  SeatType,
  TicketType,
  UserType,
  getOldPrice,
  AuthUser,
  ComboItem,
  IGift,
} from '@/features/seller';
import { formatNumber } from '@/utils/format';

interface SeatsRouteProps {
  seats: TicketType[];
  member: AuthUser;
  memberPoint: number;
  selectedSeats: SeatType[];
  selectedCombos: ComboItem[];
  selectedGifts: IGift[];
  screenId: string;
  setSelectedSeats: (seats: SeatType[]) => void;
  setModal: (modalType: string) => void;
  getScreen: (screenId: string) => void;
  fetchGifts: (screenId: string) => Promise<boolean>;
}

export const SeatsRoute: React.FC<SeatsRouteProps> = (props) => {
  const { seats, selectedSeats, setSelectedSeats } = props;
  const [displayPrice, setDisplayPrice] = React.useState(0);
  const [valueUserType, setValueUserType] = React.useState<string>(UserType.Adult);
  const oldPrice = getOldPrice(seats);

  const onCheckPersonType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    const selectSeat = selectedSeats[selectedSeats.length - 1];

    switch (type) {
      case 'Adult': {
        selectSeat.price = oldPrice;
        setDisplayPrice(selectSeat.price);
        return setSelectedSeats([...selectedSeats]);
      }
      case 'Member': {
        selectSeat.price = PRICE.CHILD;
        selectSeat.type = 0;
        setDisplayPrice(selectSeat.price);
        return setSelectedSeats([...selectedSeats]);
      }

      case 'Student':
        if (event.target.checked) {
          selectSeat.price = PRICE.STUDENT;
          selectSeat.type = 2;
          setDisplayPrice(selectSeat.price);
        }
        return setSelectedSeats([...selectedSeats]);

      default:
        return undefined;
    }
  };

  const shouldDisabled = () => !selectedSeats.length;

  return (
    <>
      <Heading as="h2" fontSize="xl" textTransform="uppercase" mb={3}>
        Chọn ghế :
      </Heading>
      {/*Seet Wrapper */}
      <Box px={2}>
        {/*Seet List */}
        <SeatList
          seats={seats}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          setDisplayPrice={setDisplayPrice}
          setValueUserType={setValueUserType}
          oldPrice={oldPrice}
        />

        {/*Screen */}

        <Box
          border="3px"
          borderColor="gray.500"
          fontSize="md"
          width="35%"
          textAlign="center"
          margin="30px auto"
          paddingBottom="6px"
          borderBottom="solid"
        >
          Màn hình
        </Box>

        <Stack spacing={3} direction="row" justifyContent="center">
          <Box display="flex">
            <Tag mr={3} colorScheme="cyan" />
            <Text>Ghế thể chọn</Text>
          </Box>
          <Box display="flex">
            <Tag mr={3} colorScheme="red" />
            <Text>Ghế đã bán</Text>
          </Box>
          <Box display="flex">
            <Tag mr={3} />
            <Text>Có thể chọn</Text>
          </Box>
          <Box display="flex">
            <Tag mr={3} colorScheme="teal" />
            <Text>Không thể chọn</Text>
          </Box>
        </Stack>
      </Box>

      <SimpleGrid mt={5} borderTop="1px solid" borderColor="gray.200" columns={2} spacing={5}>
        <Box>
          <Heading as="h5" fontWeight="500" fontSize="md" my={3}>
            Loại vé
          </Heading>
          <RadioGroup
            defaultValue={UserType.Adult}
            onChange={setValueUserType}
            value={valueUserType}
          >
            <SimpleGrid columns={2} spacing={5}>
              <Radio
                colorScheme="cyan"
                value={UserType.Adult}
                onChange={onCheckPersonType}
                isDisabled={shouldDisabled()}
              >
                Nguời lớn
              </Radio>
              <Radio
                colorScheme="cyan"
                value={UserType.Student}
                onChange={onCheckPersonType}
                isDisabled={shouldDisabled()}
              >
                Sinh viên
              </Radio>
              <Radio
                colorScheme="cyan"
                value={UserType.Member}
                onChange={onCheckPersonType}
                isDisabled={shouldDisabled()}
              >
                Trẻ em
              </Radio>
            </SimpleGrid>
          </RadioGroup>
          <FormControl id="first-name" mt={3}>
            <FormLabel>Giá vé</FormLabel>
            <Input value={`${formatNumber(displayPrice)} VNĐ`} isReadOnly />
          </FormControl>
        </Box>
      </SimpleGrid>
    </>
  );
};
