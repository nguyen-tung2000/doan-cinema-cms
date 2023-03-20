import { Button, Stack, Flex, Spinner } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";

import { ShowTimesItem, useShowTimesByDate } from "@/features/showtimes";
import { getDay } from "@/utils/format";

interface ShowTimesListV2Props {
  rangeDate: Date[];
  activeDate: string;
  setActiveDate: (value: string) => void;
  cinemaId: string;
  isMineCinema: boolean;
}

export const ShowTimesListV2: React.FC<ShowTimesListV2Props> = ({
  rangeDate,
  activeDate,
  setActiveDate,
  cinemaId,
  isMineCinema,
}) => {
  const showTimesByDateQuery = useShowTimesByDate({
    data: { date: activeDate, cinemaId },
  });

  return (
    <Stack
      backgroundColor="white"
      px={10}
      py={12}
      shadow={[null, "md"]}
      spacing={4}
      w="100%"
      alignItems="center"
      flexShrink={0}
    >
      <Stack spacing={2} direction="row">
        {rangeDate
          .map((d) => ({
            date: format(d, "MM/dd/yyyy"),
            day: getDay(d),
          }))
          .map((b) => {
            const isActive = b.date === activeDate;
            return (
              <Button
                key={b.date}
                size="lg"
                colorScheme={isActive ? "cyan" : undefined}
                color={isActive ? "white" : undefined}
                onClick={() => setActiveDate(b.date)}
                fontSize="medium"
                _hover={{
                  backgroundColor: "cyan.400",
                  color: "white",
                }}
              >
                {b.date}
                <br /> {b.day}
              </Button>
            );
          })}
      </Stack>
      {showTimesByDateQuery.isLoading ? (
        <Flex justifyContent="center">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Flex>
      ) : (
        <Stack spacing={3} w="100%">
          {showTimesByDateQuery.data?.showTimes.map((showtime) => (
            <ShowTimesItem
              {...showtime}
              date={activeDate}
              key={showtime.movie.name}
              isMineCinema={isMineCinema}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
