import { Image, Box, Flex, Spinner, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { MdAdd } from "react-icons/md";

import { Table, Td, Th, Tr, SiteHeader, WarningModal } from "@/components";
import { ROUTES, FOOD_FORM } from "@/constants";
import { AuthUser } from "@/features/auth";
import { useFoods, FoodFormModal, FoodDropdown, useDeleteFood } from "@/features/foods";
import { useAuth } from "@/lib/auth";
import { Authorization, ROLES, POLICIES } from "@/lib/authorization";
import { useFoodStore } from "@/stores/food";
import { formatNumber } from "@/utils/format";

export const FoodsPage = () => {
  const { user } = useAuth();
  const foodsQuery = useFoods();
  const deleteFoodMutation = useDeleteFood();
  const { onOpen } = useFoodStore();
  const [warningDialogVisible, setWarningDialogVisible] = React.useState(false);
  const [deleteFoodId, setdeleteFoodId] = React.useState("");
  const bg = useColorModeValue("gray.900", "white");
  const color = useColorModeValue("white", "gray.900");

  const onDelete = (id: string) => {
    setWarningDialogVisible(true);
    setdeleteFoodId(id);
  };

  const onConfirmDeleteFood = (foodId: string) => {
    deleteFoodMutation.mutateAsync({ foodId });

    hideWarningDialog();
  };

  const hideWarningDialog = () => {
    setWarningDialogVisible(false);
  };

  const spinner = (
    <Flex justifyContent="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );

  const tableFoods = (
    <Table w="full">
      <thead>
        <Tr>
          <Th>Tên</Th>
          <Th></Th>
          <Th>Unit</Th>
          <Th>Giá(VNĐ)</Th>
          <Th width="50px"></Th>
        </Tr>
      </thead>
      <tbody>
        {foodsQuery.data?.combos.map((food) => {
          return (
            <Box as="tr" key={food.name}>
              <Td paddingX={0}>
                <Image boxSize="100px" objectFit="cover" src={food.image} alt={food.name} />
              </Td>
              <Td>{food.name}</Td>

              <Td>{food.unit}</Td>
              <Td>{formatNumber(food.price)}</Td>
              <Authorization policyCheck={POLICIES["food:action"](user as AuthUser)}>
                <Td>
                  <FoodDropdown food={food} onDelete={() => onDelete(food._id)} />
                </Td>
              </Authorization>
            </Box>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <Authorization
      forbiddenFallback={<div>Chỉ những người có quyền mới có thể truy cập.</div>}
      allowedRoles={[ROLES.MANAGER, ROLES.USER]}
    >
      <SiteHeader
        menuName="Danh sách thức ăn"
        menuHref={ROUTES.FOODS}
        heading={`Foods`}
        showButton={
          <Authorization policyCheck={POLICIES["food:create"](user as AuthUser)}>
            <Button
              leftIcon={<MdAdd />}
              backgroundColor={bg}
              color={color}
              fontWeight="medium"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
              onClick={() => {
                onOpen(FOOD_FORM.ADD);
              }}
            >
              Thêm sản phẩm
            </Button>
          </Authorization>
        }
      />

      <Flex justifyContent="center">
        <Stack
          backgroundColor="white"
          borderRadius={[0, 8]}
          maxWidth="1000px"
          px={8}
          py={12}
          shadow={[null, "md"]}
          spacing={4}
          w="100%"
        >
          <Box overflowX="scroll">{foodsQuery.isLoading ? spinner : tableFoods}</Box>
        </Stack>
      </Flex>

      <FoodFormModal />
      <WarningModal
        onCancel={hideWarningDialog}
        onConfirm={async () => await onConfirmDeleteFood(deleteFoodId)}
        visible={warningDialogVisible}
        message="Điều này sẽ xoá sản phẩm hiện tại và bạn không thể khôi phục lại được ?"
      />
    </Authorization>
  );
};
