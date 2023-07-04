import { Box, Heading, Text, Stack, Flex } from '@chakra-ui/react';
import React from 'react';

import { AuthUser } from '@/features/auth';
import { useAuth } from '@/lib/auth';
import { formatNumber, removeAccents } from '@/utils/format';

interface TicketCardProps {
  movieName: string;
  date: string;
  time: string;
  seatName: string;
  price: number;
  roomName: string;
  staff?: AuthUser;
}

export const TicketCard: React.FC<TicketCardProps> = (props) => {
  const { date, movieName, seatName, time, roomName, price, staff } = props;
  const { user } = useAuth();

  const address = `${user?.cinema.address.street}, ${user?.cinema.address.ward}, ${user?.cinema.address.district}, ${user?.cinema.address.city}`;

  return (
    <Box>
      <Heading as="h4" fontSize="20px" textTransform="uppercase">
        Vé xem phim
      </Heading>
      <Text textTransform="uppercase" fontSize="15px" paddingTop={4}>
        {`CONG TY TNHH DREAM CINEMAS VIETNAM - CHI NHANH ${user?.cinema.name} `}
      </Text>
      <Text
        textTransform="uppercase"
        fontSize="15px"
        paddingY={4}
        borderBottom="1px dashed"
        borderColor="gray.900"
      >
        {removeAccents(address)}
      </Text>
      <Stack
        spacing={1}
        marginTop={2}
        paddingY={2}
        borderBottom="1px dashed"
        borderColor="gray.900"
      >
        <Heading as="h5" fontSize="15px" textTransform="uppercase">
          Movierr {user?.cinema.name}
        </Heading>
        <Text>{new Date().toUTCString()}</Text>
        <Text>PDS : SCAN</Text>
        <Text>STAFF : {staff ? staff.name : 'AFF'}</Text>
      </Stack>
      <Stack spacing={1} marginTop={2} paddingY={2} borderY="1px dashed" borderColor="gray.900">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h5" fontSize="15px" textTransform="uppercase">
            {movieName}
          </Heading>
          <Text fontWeight="500">{`[${seatName}]`}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text>
            {date} | {time}
          </Text>

          <Text fontWeight="500">{`Rạp ${roomName}`}</Text>
        </Flex>
      </Stack>
      <Stack spacing={1} marginTop={2} paddingY={2} borderTop="1px dashed" borderColor="gray.900">
        <Flex justifyContent="flex-end" alignItems="center">
          {price === 0 ? (
            <Heading as="h5" fontSize="15px" textTransform="uppercase" mr={5}>
              Vé tặng
            </Heading>
          ) : (
            <>
              <Heading as="h5" fontSize="15px" textTransform="uppercase" mr={5}>
                Tổng cộng
              </Heading>
              <Text fontWeight="500">{formatNumber(price)} VND</Text>
            </>
          )}
        </Flex>
      </Stack>
    </Box>
  );
};
