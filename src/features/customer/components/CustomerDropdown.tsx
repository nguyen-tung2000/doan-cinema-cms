import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { IconButton } from "@chakra-ui/react";
import * as React from "react";
import { FiMoreHorizontal, FiEdit2, FiTrash2, FiInfo } from "react-icons/fi";

import { CUSTOMER_FORM } from "@/constants";
import { Customer } from "@/features/auth";
import { useCustomerStore } from "@/stores/customer";

interface CustomerDropdownProps {
  customer: Customer;
  onDelete: () => void;
  onGetDetail: () => void;
}

export const CustomerDropdown: React.FC<CustomerDropdownProps> = ({
  customer,
  onDelete,
  onGetDetail,
}) => {
  const { onOpen } = useCustomerStore();

  const onEdit = () => onOpen(CUSTOMER_FORM.EDIT, customer);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreHorizontal />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<FiInfo />} onClick={onGetDetail}>
          Chi tiết
        </MenuItem>
        <MenuItem icon={<FiEdit2 />} onClick={onEdit}>
          Chỉnh sửa
        </MenuItem>
        <MenuItem icon={<FiTrash2 />} onClick={onDelete}>
          Xoá
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
