import { Box, Button, Flex, Heading, Stack, Spinner } from '@chakra-ui/react';
import * as R from 'ramda';
import * as React from 'react';

import { Form, SingleSelect } from '@/components';
import {
  TableRevenue,
  useGetRevenueByDate,
  ColumnChart,
  RevenueInfo,
  // IRevenueData,
} from '@/features/revenue';
import { formatDate, formatNumber, convertToMoney } from '@/utils/format';

type RevenueValues = {
  cinemaId: string;
  date: string;
};

interface RevenueByDateFormProps {
  cinemaId: string;
  userName: string;
  roleType: number;
}

export const RevenueByDateForm: React.FC<RevenueByDateFormProps> = ({
  cinemaId,
  userName,
  roleType,
}) => {
  const [date, setDate] = React.useState<string>(formatDate(new Date()));
  const columns = React.useMemo(
    () => [
      {
        Header: 'Thông tin',
        Footer: '',
        columns: [
          {
            Header: 'Mã HD',
            accessor: 'billId',
            aggregate: 'count',
            Aggregated: ({ value }: any) => `${value} hoá đơn`,
          },
          {
            Header: 'Tên phim',
            accessor: 'movieName',
            aggregate: 'count',
            Aggregated: ({ value }: any) => `${value} phim`,
          },
          {
            Header: 'Phòng',
            accessor: 'roomName',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} phòng`,
          },
          {
            Header: 'Màn hình',
            accessor: 'screenName',
          },
        ],
      },
      {
        Header: 'Doanh thu bán hàng',
        Footer: '',

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
          {
            Header: 'Tên nhân viên',
            isVisible: true,
            accessor: (originalRow: any) => `${originalRow.staff.profile.name}` as any,
            aggregate: 'uniqueCount',
            Aggregated: ({ value }: any) => {
              return `${value} phòng`;
            },
          },
        ],
      },
    ],
    [],
  );
  const useRevenueByDateQuery = useGetRevenueByDate({
    cinemaId,
    date: date,
    config: {
      refetchInterval: 10000,
    },
  });

  if (useRevenueByDateQuery.isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    );
  }

  if (!useRevenueByDateQuery.data) {
    return null;
  }

  const { values } = useRevenueByDateQuery.data;
  const hasRevenue = values.data.length > 0;
  const lstTitleMovie = R.uniq(values.data.map((v) => v.movie_name));

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

  return (
    <Stack spacing={3} width="full">
      <Stack direction="column" justifyContent="center">
        <Heading fontSize="20px">Thống kê doanh thu</Heading>
        {roleType === 3 && <Heading fontSize="20px">{`Nhân viên: ${userName} `}</Heading>}
      </Stack>
      <Box paddingBottom={5} borderBottom="1px solid" borderColor="gray.300">
        <Form<RevenueValues>
          onSubmit={({ date }) => {
            setDate(date);
          }}
          options={{
            defaultValues: {
              date,
            },
          }}
        >
          {({ register, setValue }) => (
            <Flex alignItems="center" justifyContent="space-between">
              <Stack spacing={3}>
                <SingleSelect
                  registration={register('date')}
                  setValues={setValue}
                  nameToSet="dateStart"
                  defaultValue={date}
                />
              </Stack>
              <Button
                backgroundColor="cyan.400"
                color="white"
                fontWeight="medium"
                type="submit"
                _hover={{
                  backgroundColor: 'cyan.700',
                }}
                maxWidth="200px"
                alignSelf="flex-end"
                ml={4}
                isLoading={useRevenueByDateQuery.isLoading}
              >
                Thống kê
              </Button>
            </Flex>
          )}
        </Form>
      </Box>
      {hasRevenue ? (
        <>
          <ColumnChart
            data={{
              xCategories: lstTitleMovie,
              data: values.data,
              text: `Doanh thu ngày ${date}`,
              type: 'Full',
            }}
          />
          <TableRevenue rowsTable={values.data} columnsTable={columns} />
        </>
      ) : (
        noData
      )}
    </Stack>
  );
};
