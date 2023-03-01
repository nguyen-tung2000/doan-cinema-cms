import { Badge, Box, Button, Flex, Stack, Heading, Spinner } from '@chakra-ui/react';
import React from 'react';

import { TableSink } from '@/components';
import { useShowTimes } from '@/features/showtimes';
import {
  getCurrentMonday,
  getCurrentSunday,
  getDay,
  getNextMonday,
  getNextSunday,
  getPrevMonday,
  getPrevSunday,
} from '@/utils/format';

interface ShowTimeListProps {
  cinemaId: string;
}

export const ShowTimesList: React.FC<ShowTimeListProps> = ({ cinemaId }) => {
  const [currentMonSun, setCurrentMonSun] = React.useState({
    mon: getCurrentMonday(),
    sun: getCurrentSunday(),
  });
  const [dataShowTimes, setDataShowTimes] = React.useState({
    dateStart: currentMonSun.mon,
    dateEnd: currentMonSun.sun,
    cinemaId,
  });

  const showTimesQuery = useShowTimes({
    data: dataShowTimes,
  });

  const onPrevWeek = () => {
    setCurrentMonSun({
      ...currentMonSun,
      mon: getPrevMonday(currentMonSun.mon),
      sun: getPrevSunday(currentMonSun.sun),
    });

    setDataShowTimes({
      ...dataShowTimes,
      dateStart: getPrevMonday(currentMonSun.mon),
      dateEnd: getPrevSunday(currentMonSun.sun),
    });
  };

  const onNextWeek = () => {
    setCurrentMonSun({
      ...currentMonSun,
      mon: getNextMonday(currentMonSun.mon),
      sun: getNextSunday(currentMonSun.sun),
    });

    setDataShowTimes({
      ...dataShowTimes,
      dateStart: getNextMonday(currentMonSun.mon),
      dateEnd: getNextSunday(currentMonSun.sun),
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Thông tin lịch chiếu',
        Footer: 'Thông tin lịch chiếu',
        columns: [
          {
            Header: 'Thứ',
            accessor: (originalRow: any) => {
              return getDay(originalRow.date);
            },
          },
          {
            Header: 'Ngày',
            accessor: 'date',
          },
          {
            Header: 'Phim',
            accessor: 'movie',
            aggregate: 'uniqueCount',

            Aggregated: ({ value }: any) => (
              <Badge colorScheme="green" variant="outline">{`${value} phim`}</Badge>
            ),
          },
          {
            Header: 'Phòng',
            accessor: 'room',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }: any) => (
              <Badge colorScheme="green" variant="outline">{`${value} phòng`}</Badge>
            ),
          },
          {
            Header: 'Màn hình',
            accessor: 'screen',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }: any) => (
              <Badge colorScheme="green">{`${value} màn hình`}</Badge>
            ),
          },
          {
            Header: 'Suất',
            aggregate: 'uniqueCount',
            accessor: 'time',
            Aggregated: ({ value }: any) => <Badge colorScheme="green">{`${value} suất`}</Badge>,
          },
        ],
      },
    ],
    [],
  );

  const rows = React.useMemo(() => showTimesQuery.data?.showTimes, [showTimesQuery.data]);

  const spinner = (
    <Flex justifyContent="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );

  const noData = (
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
      <Heading as="h4" size="xl">
        Không có lịch chiếu được tìm thấy
      </Heading>
    </Box>
  );

  return (
    <Box width="100%">
      <Heading as="h2" size="lg">
        Danh sách lịch chiếu - suất chiếu
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" mt={2}>
        <Heading as="h5" size="md">
          {`${currentMonSun.mon} - ${currentMonSun.sun}`}
        </Heading>
        <Stack spacing={3} direction="row">
          <Button colorScheme="cyan" variant="outline" onClick={onPrevWeek}>
            Trước
          </Button>
          <Button color="white" variant="solid" colorScheme="cyan" onClick={onNextWeek}>
            Sau
          </Button>
        </Stack>
      </Flex>

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
            {showTimesQuery.isLoading ? (
              spinner
            ) : !showTimesQuery.data?.showTimes?.length ? (
              noData
            ) : (
              <TableSink columnsTable={columns} rowsTable={rows} isGroupBy />
            )}
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
