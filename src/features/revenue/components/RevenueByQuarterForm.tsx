import { Spinner, Flex, Heading, Box, Stack, Select } from '@chakra-ui/react';
import * as R from 'ramda';
import * as React from 'react';

import {
  LineChart,
  TableRevenue,
  useRevenueByMonthQuery,
  sortByDate,
  RevenueInfo,
} from '@/features/revenue';
import { formatNumber, convertToMoney } from '@/utils/format';

interface RevenueByQuarterFormProps {
  cinemaId: string;
}

export const RevenueByQuarterForm: React.FC<RevenueByQuarterFormProps> = ({ cinemaId }) => {
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
            Header: 'Tên phim',
            accessor: 'movieName',
            aggregate: 'count',
            Aggregated: ({ value }: any) => `${value} phim`,
          },
          {
            Header: 'Màn hình',
            accessor: 'screenName',
          },
        ],
      },
      {
        Header: 'Doanh thu bán hàng',
        Footer: 'Doanh thu bán hàng',

        columns: [
          {
            Header: 'Số lượng',
            accessor: 'quantity',
            canGroupBy: false,
          },
          {
            Header: 'Đơn giá',
            accessor: 'price',
            canGroupBy: false,
          },
          {
            Header: 'Giảm',
            accessor: 'promotion',
            canGroupBy: false,
          },
          {
            Header: 'Loại',
            accessor: 'type',
          },
          {
            Header: 'Tổng',
            accessor: 'totalString',
            canGroupBy: false,
            Footer: (info: any) => {
              // Only calculate total visits if rows change

              const total = React.useMemo(
                () =>
                  info.rows.reduce(
                    (sum: any, row: any) => convertToMoney(row.values.totalString) + sum,
                    0,
                  ),
                [info.rows],
              );

              return <>Tổng {formatNumber(total)}</>;
            },
          },
          {
            Header: 'TT',
            accessor: (originalRow: any) => {
              return <RevenueInfo revenueData={originalRow} />;
            },
            canGroupBy: false,
          },
        ],
      },
    ],
    [],
  );
  const revenueByMonthQuery = useRevenueByMonthQuery({
    cinemaId,
    month: dataDTO.month,
    year: dataDTO.year,
    config: {
      enabled: !!dataDTO.month && !!dataDTO.year,
    },
  });

  if (revenueByMonthQuery.isLoading) {
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

  const hasRevenue = revenueByMonthQuery.data && revenueByMonthQuery.data.values.data.length > 0;

  return (
    <Box>
      <Stack spacing={3} width="full" alignItems="center" marginBottom="10">
        <Stack maxWidth="300px" paddingBottom={5} borderBottom="1px solid" borderColor="gray.300">
          <Flex direction="column" justifyContent="center">
            <Heading fontSize="20px">Thống kê doanh thu theo tháng </Heading>
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
              subTitle: 'Doanh thu từng phim ',
              data: revenueByMonthQuery.data.values.data,
              xCategories: R.uniq(
                sortByDate(revenueByMonthQuery.data.values.data).map((m: any) => m.date),
              ),
            }}
          />
          <TableRevenue rowsTable={revenueByMonthQuery.data.values.data} columnsTable={columns} />
        </>
      ) : (
        noData
      )}
    </Box>
  );
};
