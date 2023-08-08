import {
  Flex,
  Spinner,
  Box,
  Heading,
  Stack,
  Badge,
  VStack,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { Table, Tr, Th, Td, CheckBoxField, SingleSelect, FieldWrapper } from '@/components';
import { colorBadge } from '@/features/room';
import { RoomShowtimeType, ShowTimesValues } from '@/features/showtimes';

interface TimeSlotListProps {
  register: UseFormRegister<ShowTimesValues>;
  rooms: RoomShowtimeType[];
  isLoading: boolean;
}
export const TimeSlotList: React.FC<TimeSlotListProps> = (props) => {
  const { register, rooms, isLoading } = props;

  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    );
  }

  if (!rooms.length)
    return (
      <Box
        role="list"
        aria-label="comments"
        backgroundColor="white"
        textColor="gray.500"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="40"
      >
        <Heading as="h4" size="xl" fontSize="25px">
          Vui lòng chọn phim trước
        </Heading>
      </Box>
    );
  return (
    <Flex justifyContent="center">
      <Stack
        backgroundColor="white"
        borderRadius={[0, 8]}
        px={8}
        py={12}
        shadow={[null, 'md']}
        spacing={4}
        w="100%"
      >
        <Box>
          <Table w="full">
            <thead>
              <Tr>
                <Th>Phòng</Th>
                <Th>Màn hình</Th>
                <Th>Suất chiếu</Th>
              </Tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <Box as="tr" key={room.room.id}>
                  <Td>
                    <CheckBoxField
                      registration={register(`showTimes.${index}.room_id`)}
                      value={room.room.id}
                      name={room.room.name}
                      colorScheme="cyan"
                      size="lg"
                    />
                  </Td>
                  <Td>
                    <Badge colorScheme={colorBadge[room.room.screen_name]}>
                      {room.room.screen_name}
                    </Badge>
                  </Td>
                  <Td>
                    <CheckboxGroup colorScheme="cyan">
                      <SimpleGrid columns={[2, null, 3]} spacing="5px">
                        {room.slots.map((o, index1) => (
                          <Checkbox {...register(`showTimes.${index}.slots.${index1}`)} key={o.id}>
                            {o.slot}
                          </Checkbox>
                        ))}
                      </SimpleGrid>
                    </CheckboxGroup>
                  </Td>
                </Box>
              ))}
            </tbody>
          </Table>
        </Box>
      </Stack>
    </Flex>
  );
};
