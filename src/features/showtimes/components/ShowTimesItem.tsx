import { Box, Button, Flex, Heading, Img, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Location } from 'history';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { ShowTimesListByDate, ShowTimesDetail, screenDetail } from '@/features/showtimes';
import { formatDate } from '@/utils/format';

interface IShowTimesItem extends ShowTimesListByDate {
  isMineCinema: boolean;
}

export const ShowTimesItem: React.FC<IShowTimesItem> = (props) => {
  const { movie, screen2D, screen3D, screenIMAX, date, isMineCinema } = props;
  const shouldHide = (showtimes: ShowTimesDetail[]) => !showtimes.length;

  return (
    <Box rounded="md" border="1px" borderColor="gray.300">
      <Box flex="1 1 auto" p={3}>
        <Flex flexWrap="wrap" mx="-3">
          <Box px={3} flexShrink={0}>
            <Img
              src={movie.image}
              alt={movie.name}
              rounded={4}
              loading="lazy"
              htmlHeight="300px"
              htmlWidth="250px"
            />
          </Box>
          <Stack px={3} spacing={2} flex={1}>
            <Heading as="h4" fontSize="md">
              {movie.name}
            </Heading>
            <Text fontSize="md" color="gray.400">
              {/* {movie.moveDuration} phút */}
              {movie.description}
            </Text>

            {!shouldHide(screen2D.showTimesDetails) && (
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  {screen2D.title} phụ đề Anh
                </Text>
                <ListTime screens={screen2D} date={date} isMineCinema={isMineCinema} />
              </Box>
            )}

            {!shouldHide(screen3D.showTimesDetails) && (
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  {screen3D.title} phụ đề Anh
                </Text>
                <ListTime screens={screen3D} date={date} isMineCinema={isMineCinema} />
              </Box>
            )}

            {!shouldHide(screenIMAX.showTimesDetails) && (
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  {screenIMAX.title} phụ đề Anh
                </Text>
                <ListTime screens={screenIMAX} date={date} isMineCinema={isMineCinema} />
              </Box>
            )}
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

interface IListTime {
  screens: screenDetail;
  date: string;
  isMineCinema: boolean;
}
const ListTime = ({ screens, date, isMineCinema }: IListTime) => {
  const today = new Date();
  const todayFormat = formatDate(today);
  const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
  const minutes = today.getMinutes();
  const timeNow = `${hours}:${minutes}`;
  const isDisableTime = (time: string) => date === todayFormat && timeNow > time && isMineCinema;

  return (
    <Wrap spacing={1} direction="row" mt={2}>
      {screens.showTimesDetails.map((showtime) => (
        <WrapItem key={showtime._id}>
          <Button
            as={isMineCinema ? Link : undefined}
            to={(location: Location) =>
              isDisableTime(showtime.timeSlot.time)
                ? location.pathname
                : `/app/seller/bookTicket/${showtime._id}`
            }
            variant="outline"
            isDisabled={isDisableTime(showtime.timeSlot.time)}
          >
            {showtime.timeSlot.time}
          </Button>
        </WrapItem>
      ))}
    </Wrap>
  );
};
