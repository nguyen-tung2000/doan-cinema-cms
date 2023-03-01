import { Flex, Spinner, Box, Heading, Stack, Select } from '@chakra-ui/react';
import * as R from 'ramda';
import React from 'react';

import { LineChart, TableRevenue, useRevenueAllByMonthQuery, sortByDate } from '@/features/revenue';

export const RevenueAllByMonthForm: React.FC<any> = () => {
  const [dataDTO, setDataDTO] = React.useState({ month: '', year: '' });

  const columns = React.useMemo(
    () => [
      {
        Header: 'Thông tin',
        Footer: 'Thông tin',
        columns: [
          {
            Header: 'Ngày',
            accessor: 'date',
          },
          {
            Header: 'Tên rạp',
            accessor: 'cinemaName',
            aggregate: 'count',
            Aggregated: ({ value }: any) => `${value} rạp`,
          },
          {
            Header: 'Tổng tiền',
            accessor: 'totalString',
            canGroupBy: false,
          },
        ],
      },
    ],
    [],
  );
  const revenueAllByMonthQuery = useRevenueAllByMonthQuery({
    month: dataDTO.month,
    year: dataDTO.year,
    config: {
      enabled: !!dataDTO.month && !!dataDTO.year,
    },
  });

  if (revenueAllByMonthQuery.isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    );
  }

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
      <Heading as="h4" size="xl" fontSize="25px">
        Không có dữ liệu được tìm thấy
      </Heading>
    </Box>
  );

  const hasRevenue = revenueAllByMonthQuery.data && revenueAllByMonthQuery.data.data.length > 0;

  return (
    <Box>
      <Stack spacing={3} width="full" alignItems="center" marginBottom="10">
        <Stack maxWidth="300px" paddingBottom={5} borderBottom="1px solid" borderColor="gray.300">
          <Flex direction="column" justifyContent="center">
            <Heading fontSize="20px">Thống kê doanh thu tất cả rạp theo tháng </Heading>
          </Flex>
          <Stack spacing={3}>
            <Select
              placeholder="Chọn năm"
              onChange={(e) => setDataDTO({ ...dataDTO, year: e.target.value })}
              value={dataDTO.year}
            >
              {Array.from(Array(10).keys()).map((y: number) => {
                const yearNow = new Date().getFullYear();
                const year = yearNow - y;
                return (
                  <option key={year} value={year}>
                    Năm {year}
                  </option>
                );
              })}
            </Select>

            <Select
              placeholder="Chọn tháng"
              onChange={(e) => setDataDTO({ ...dataDTO, month: e.target.value })}
              value={dataDTO.month}
            >
              {Array.from(Array(12).keys()).map((y: number) => {
                const month = y + 1;
                return (
                  <option key={month} value={month}>
                    Tháng {month}
                  </option>
                );
              })}
            </Select>
          </Stack>
        </Stack>
      </Stack>
      {hasRevenue ? (
        <>
          <LineChart
            data={{
              title: `Doanh thu tháng ${dataDTO.month}`,
              subTitle: 'Doanh thu từng rạp ',
              data: revenueAllByMonthQuery.data.data,
              xCategories: R.uniq(
                sortByDate(revenueAllByMonthQuery.data.data).map((m: any) => m.date),
              ),
              byCinemaAll: true,
            }}
          />
          <TableRevenue rowsTable={revenueAllByMonthQuery.data.data} columnsTable={columns} />
        </>
      ) : (
        noData
      )}
    </Box>
  );
};
