import {
  Badge,
  Box,
  BreadcrumbItem,
  Skeleton,
  BreadcrumbLink,
  Flex,
  Spinner,
  Stack,
} from '@chakra-ui/react';

import { Table, Td, Th, Tr, SiteHeader } from '@/components';
import { ROUTES } from '@/constants';
import { MenuListRoom, RoomCreateModal, useRooms } from '@/features/room';
import { Authorization, ROLES } from '@/lib/authorization';

export const colorBadge: any = {
  '2D': 'gray',
  '3D': 'purple',
  IMAX: 'red',
};

export const RoomList = () => {
  const roomsQuery = useRooms();
  return (
    <Authorization
      forbiddenFallback={<div>Only manager can view this.</div>}
      allowedRoles={[ROLES.MANAGER]}
    >
      <SiteHeader
        menuName="Room List"
        menuHref={ROUTES.ROOM_LIST}
        heading={`Room`}
        showButton={
          <Authorization
            forbiddenFallback={<div>Only manager can view this.</div>}
            allowedRoles={[ROLES.MANAGER]}
          >
            <RoomCreateModal />
          </Authorization>
        }
      >
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Danh sách phòng chiếu</BreadcrumbLink>
        </BreadcrumbItem>
      </SiteHeader>

      <Flex justifyContent="center">
        <Stack
          backgroundColor="white"
          borderRadius={[0, 8]}
          maxWidth="1000px"
          px={8}
          py={12}
          shadow={[null, 'md']}
          spacing={4}
          w="100%"
        >
          <Box overflowX="scroll">
            {roomsQuery.isLoading ? (
              <Flex justifyContent="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Flex>
            ) : (
              <Table w="full">
                <thead>
                  <Tr>
                    <Th>Tên</Th>
                    <Th>Màn hình</Th>
                    <Th>Số lượng ghế</Th>
                    <Th>Số ghế một hàng</Th>
                    <Th>Hàng ghế vip đâu tiên</Th>
                    <Th>Hàng ghế vip cuối cùng</Th>
                    <Th>Hàng ghế couple</Th>
                    <Th>Số ghế couple</Th>
                    <Th width="50px"></Th>
                  </Tr>
                </thead>
                <tbody>
                  {!roomsQuery.data?.values.length ? (
                    <Stack>
                      <Skeleton height="279px" borderRadius="8px" />
                      <Skeleton height="279px" borderRadius="8px" />
                      <Skeleton height="279px" borderRadius="8px" />
                      <Skeleton height="279px" borderRadius="8px" />
                    </Stack>
                  ) : (
                    roomsQuery.data?.values.map((room) => {
                      const name = room.screen_name;
                      return (
                        <Box as="tr" key={room.id}>
                          <Td>{`Phòng ${room.name}`}</Td>
                          <Td>
                            <Badge fontSize="1em" colorScheme={colorBadge[name]}>
                              {name}
                            </Badge>
                          </Td>
                          <Td>{room.rows}</Td>
                          <Td>{room.seats_per_row}</Td>
                          <Td>{room.vip_seat_start}</Td>
                          <Td>{room.vip_seat_end}</Td>
                          <Td>{room.couple_row ? 'Có' : 'Không'}</Td>
                          <Td>{room.couple_row ? room.number_seat_couple : 0}</Td>
                          <Td>
                            <MenuListRoom roomId={room.id} />
                          </Td>
                        </Box>
                      );
                    })
                  )}
                  {/* {roomsQuery.data?.values.map((room) => {
                    const name = room.screen_name;
                    return (
                      <Box as="tr" key={room.id}>
                        <Td>{`Phòng ${room.name}`}</Td>
                        <Td>
                          <Badge fontSize="1em" colorScheme={colorBadge[name]}>
                            {name}
                          </Badge>
                        </Td>
                        <Td>{room.rows}</Td>
                        <Td>{room.seats_per_row}</Td>
                        <Td>{room.vip_seat_start}</Td>
                        <Td>{room.vip_seat_end}</Td>
                        <Td>{room.couple_row?"Có" : "Không"}</Td>
                        <Td>{room.couple_row? room.number_seat_couple: 0}</Td>
                        <Td>
                          <MenuListRoom roomId={room.id} />
                        </Td>
                      </Box>
                    );
                  })} */}
                </tbody>
              </Table>
            )}
          </Box>
        </Stack>
      </Flex>
    </Authorization>
  );
};
