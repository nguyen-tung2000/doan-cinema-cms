import { Box, Button, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import React from "react";

import { Form, SingleSelect, Table, Td, Th, Tr } from "@/components";
import { useGetRevenueByMovie, ColumnChart } from "@/features/revenue";
import { formatNumber } from "@/utils/format";

type RevenueValues = {
  cinemaId: string;
  dateStart: string;
  dateEnd: string;
};

interface RevenueByMovieFormProps {
  cinemaId: string;
}

export const RevenueByMovieForm: React.FC<RevenueByMovieFormProps> = ({ cinemaId }) => {
  const useRevenueMovieMutation = useGetRevenueByMovie();

  return (
    <Stack spacing={3} width="full">
      <Stack direction="column" justifyContent="center">
        <Heading fontSize="20px">Thống kê doanh thu </Heading>
      </Stack>
      <Box paddingBottom={5} borderBottom="1px solid" borderColor="gray.300">
        <Form<RevenueValues>
          onSubmit={async (data) => {
            const values = { ...data, cinemaId };
            await useRevenueMovieMutation.mutateAsync(values);
          }}
        >
          {({ register }) => (
            <Flex alignItems="center" justifyContent="space-between">
              <Stack spacing={3}>
                <SingleSelect registration={register("dateStart")} />
                <SingleSelect registration={register("dateEnd")} />
              </Stack>
              <Button
                backgroundColor="cyan.400"
                color="white"
                fontWeight="medium"
                type="submit"
                _hover={{
                  backgroundColor: "cyan.700",
                }}
                maxWidth="200px"
                alignSelf="flex-end"
                ml={4}
                isLoading={useRevenueMovieMutation.isLoading}
              >
                Thống kê
              </Button>
            </Flex>
          )}
        </Form>
      </Box>

      {useRevenueMovieMutation.data && (
        <>
          <Box my={3}>
            <ColumnChart
              data={{
                data: useRevenueMovieMutation.data?.data,
                text: "Doanh thu",
                xCategories: useRevenueMovieMutation.data?.data.map((r) => r.movie.name),
                type: "ByMovie",
              }}
            />
          </Box>

          <SimpleGrid columns={2} spacing={10}>
            {useRevenueMovieMutation.data.data.map((rv) => (
              <Box key={rv.movie.name}>
                <Heading as="h3" fontSize="20px" my={3}>
                  Phim {rv.movie.name}
                </Heading>
                <Table w="full">
                  <thead>
                    <Tr>
                      <Th>Tiêu đề</Th>
                      <Th>Doanh thu</Th>
                    </Tr>
                  </thead>
                  <tbody>
                    <Tr>
                      <Td>Tổng tiền vé</Td>
                      <Td>{formatNumber(rv.totalTicket)}</Td>
                    </Tr>
                    <Tr>
                      <Td>Tổng tiền thức ăn</Td>
                      <Td>{formatNumber(rv.totalFood)}</Td>
                    </Tr>
                    <Tr>
                      <Td>Tổng cộng</Td>
                      <Td>{formatNumber(rv.totalPrice)}</Td>
                    </Tr>
                  </tbody>
                </Table>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}
    </Stack>
  );
};
