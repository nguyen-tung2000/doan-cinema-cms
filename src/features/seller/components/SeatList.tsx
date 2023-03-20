import { Box, ListItem, List, Button, Stack } from "@chakra-ui/react";
import * as React from "react";

import { TicketType, SeatType, UserType } from "@/features/seller";

interface SeatListProps {
  seats: TicketType[];
  selectedSeats: SeatType[];
  setSelectedSeats: (seats: SeatType[]) => void;
  setDisplayPrice: (value: React.SetStateAction<number>) => void;
  setValueUserType: (value: React.SetStateAction<string>) => void;
  oldPrice: number;
}

export const SeatList: React.FC<SeatListProps> = ({
  seats,
  selectedSeats,
  setSelectedSeats,
  setDisplayPrice,
  setValueUserType,
  oldPrice,
}) => {
  const onSelectSeat = (seat: SeatType) => {
    const hasSeat = selectedSeats.find((s) => s.seatName === seat.seatName);
    const selectedSeat = !hasSeat
      ? [...selectedSeats, seat]
      : selectedSeats.filter((s) => s.seatName !== hasSeat.seatName);

    if (hasSeat) {
      // reset seat
      hasSeat.price = oldPrice;
      hasSeat.type = 1;
    }

    setDisplayPrice(hasSeat ? 0 : seat.price);
    setSelectedSeats(selectedSeat);
    setValueUserType(UserType.Adult);
  };

  const getColorScheme = (seat: any) => {
    if (seat.status == 1) {
      return "red";
    }

    if (selectedSeats.includes(seat)) {
      return "cyan";
    }

    return undefined;
  };

  return (
    <Box>
      <Stack spacing={2} alignItems="center" direction="column-reverse">
        {seats.map((b, index) => (
          <List display="flex" key={`${index}`}>
            <Button as={ListItem} width="20px" variant="outline">
              {b.nameRow}
            </Button>
            <Stack as={List} mx={3} spacing={2} direction="row">
              {b.nameSeats.map((s, index) => {
                return (
                  <Button
                    key={s.idSeat}
                    width="20px"
                    colorScheme={getColorScheme(s)}
                    color={selectedSeats.includes(s) ? "white" : undefined}
                    onClick={() => onSelectSeat(s)}
                    isDisabled={s.status === 1}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </Stack>
            <Button as={ListItem} width="20px" variant="outline">
              {b.nameRow}
            </Button>
          </List>
        ))}
      </Stack>
    </Box>
  );
};
