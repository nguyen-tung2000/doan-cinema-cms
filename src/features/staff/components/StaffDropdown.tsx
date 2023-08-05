import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/menu';
import { IconButton } from '@chakra-ui/react';
import * as React from 'react';
import { FiMoreHorizontal, FiEdit2, FiTrash2 } from 'react-icons/fi';

import { STAFF_FORM } from '@/constants';
import { StaffType } from '@/features/staff';
import { useStaffStore } from '@/stores/staff';

interface StaffDropdownProps {
  staff: StaffType;
  onDelete: () => void;
}

export const StaffDropdown: React.FC<StaffDropdownProps> = ({ staff, onDelete }) => {
  const { onOpen: openStaffForm, setType } = useStaffStore();

  const onEdit = () => {
    openStaffForm();
    setType({
      type: STAFF_FORM.EDIT,
      data: {
        name: staff.name,
        email: staff.email,
        phone_number: staff.phone_number,
        male: staff.male,
        cinema_id: staff.cinema_id,
        avatar: staff.avatar,
        date_of_birth: staff.date_of_birth,
        permission_id: staff.permission_id,
      },
      image_source: staff.avatar,
      staff_id: staff.id,
    });
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreHorizontal />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<FiEdit2 />} command="⌘T" onClick={onEdit}>
          Chỉnh sửa
        </MenuItem>
        <MenuItem icon={<FiTrash2 />} command="⌘N" onClick={onDelete}>
          Xoá
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
