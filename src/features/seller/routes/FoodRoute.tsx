import { Box, Flex, IconButton, Heading, Img, Table, Tr, Th, Td } from "@chakra-ui/react";
import * as React from "react";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";

// import { Table, Tr, Th, Td } from '@/components';
import { ComboItem } from "@/features/seller";
import { formatNumber } from "@/utils/format";

interface FoodRouteProps {
  listCombo: ComboItem[];
  selectedCombos: ComboItem[];
  increaseQuantity: (item: ComboItem) => void;
  descreaseQuantity: (item: ComboItem) => void;
}

export const FoodRoute: React.FC<FoodRouteProps> = ({
  listCombo,
  selectedCombos,
  increaseQuantity,
  descreaseQuantity,
}) => {
  const totalCombos = () =>
    selectedCombos.reduce((sum, crItem) => sum + crItem.price * crItem.quantity, 0);

  const getQuantityItem = (item: ComboItem) => {
    const crItem = selectedCombos.find((c) => c._id === item._id);
    return crItem ? crItem.quantity : 0;
  };

  const getTotalItem = (item: ComboItem) => {
    const crItem = selectedCombos.find((c) => c._id === item._id);
    return crItem ? crItem.quantity * crItem.price : 0;
  };

  return (
    <Table size="md">
      <thead>
        <Tr>
          <Th>Combo</Th>
          <Th></Th>
          <Th>Số lượng</Th>
          <Th>Giá(VNĐ)</Th>
          <Th>Tổng(VNĐ)</Th>
        </Tr>
      </thead>
      <tbody>
        {listCombo?.map((combo) => (
          <Tr key={combo._id}>
            <Td paddingX={0}>
              <Img src={combo.image} htmlHeight="300px" htmlWidth="450px" alt={combo.name} />
            </Td>
            <Td>{combo.name}</Td>
            <Td>
              <ComboAction
                item={combo}
                inc={increaseQuantity}
                des={descreaseQuantity}
                getQuantity={getQuantityItem}
              />
            </Td>
            <Td>{formatNumber(combo.price)}</Td>
            <Td width="300px">{formatNumber(getTotalItem(combo))}</Td>
          </Tr>
        ))}
      </tbody>
      <tfoot>
        <Tr>
          <Td colSpan={4}>
            <Heading as="h6" fontWeight="bold" fontSize="14px">
              Tổng:
            </Heading>
          </Td>
          <Td>{formatNumber(totalCombos())}</Td>
        </Tr>
      </tfoot>
    </Table>
  );
};

interface IComboAction {
  item: ComboItem;
  inc: (item: ComboItem) => void;
  des: (item: ComboItem) => void;
  getQuantity: (item: ComboItem) => number;
}

const ComboAction = (props: IComboAction) => {
  const { inc, des, getQuantity, item } = props;

  return (
    <Flex>
      <IconButton
        aria-label="minus combo"
        icon={<HiMinusCircle />}
        colorScheme="white"
        variant="ghost"
        onClick={() => des(item)}
        isDisabled={getQuantity(item) === 0}
      />
      <Box
        display="flex"
        border="1px solid"
        borderColor="gray.200"
        rounded="md"
        width="60px"
        justifyContent="center"
        alignItems="center"
      >
        {getQuantity(item)}
      </Box>
      <IconButton
        aria-label="increase combo"
        icon={<HiPlusCircle />}
        colorScheme="white"
        variant="ghost"
        onClick={() => inc(item)}
      />
    </Flex>
  );
};
