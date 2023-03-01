import { Flex, Spinner, Box, Heading, Stack, Badge, VStack } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

import { Table, Tr, Th, Td, CheckBoxField, SingleSelect } from '@/components';
import { Room, colorBadge } from '@/features/room';
import { CheckBoxTimeGroup, ShowTimesValues } from '@/features/showtimes';

interface TimeSlotListProps {
  register: UseFormRegister<ShowTimesValues>;
  rooms: Room[];
  checkedTimes: ({
    _id,
    roomName,
    screenName,
  }: {
    _id: string;
    roomName: string;
    screenName: string;
  }) => void;
  isLoading: boolean;
}

export const TimeSlotList: React.FC<TimeSlotListProps> = (props) => {
  const { register, rooms, checkedTimes, isLoading } = props;

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
                <Th>Ngày</Th>
              </Tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <Box as="tr" key={room._id}>
                  <Td>
                    <CheckBoxField
                      registration={register(`showTimes.${index}.roomId`)}
                      value={room._id}
                      name={room.name}
                      colorScheme="cyan"
                      size="lg"
                    />
                  </Td>
                  <Td>
                    <Badge colorScheme={colorBadge[room.screen.name]}>{room.screen.name}</Badge>
                  </Td>
                  <Td>
                    <CheckBoxTimeGroup
                      registration={register(`showTimes.${index}.times`)}
                      options={room.timeSlots.map(({ time, _id, disabled }) => ({
                        label: time,
                        value: _id,
                        disable: disabled,
                      }))}
                      roomName={room.name}
                      screenName={room.screen.name}
                      onCheck={checkedTimes}
                    />
                  </Td>
                  <Td>
                    <VStack spacing={4} align="stretch">
                      <Flex flex="1" alignItems="center">
                        <Heading as="h6" size="xs" flex="1">
                          Từ
                        </Heading>

                        <Box>
                          <SingleSelect registration={register(`showTimes.${index}.dateStart`)} />
                        </Box>
                      </Flex>
                      <Flex flex="1" alignItems="center">
                        <Heading as="h6" size="xs" flex="1">
                          Đến
                        </Heading>
                        <Box>
                          <SingleSelect registration={register(`showTimes.${index}.dateEnd`)} />
                        </Box>
                      </Flex>
                    </VStack>
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
