import { Badge, Box, Button, Flex, Spinner, Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';

import { useDeleteStaff } from '../api';

import { Table, Td, Th, Tr, SiteHeader, WarningModal } from '@/components';
import { ROUTES, STAFF_FORM } from '@/constants';
import { useStaffs, StaffDropdown, StaffFormModal } from '@/features/staff';
import { Authorization, ROLES } from '@/lib/authorization';
import { useStaffStore } from '@/stores/staff';
import { formatDate } from '@/utils/format';

export const colorBadge: any = {
  1: 'red',
  2: 'purple',
  3: 'gray',
};

export const StaffPage = () => {
  const staffsQuery = useStaffs();
  const deleteFoodMutation = useDeleteStaff();
  const { onOpen, setType } = useStaffStore();
  const [warningDialogVisible, setWarningDialogVisible] = React.useState(false);
  const [staffId, setStaffId] = React.useState(-1);

  const bg = useColorModeValue('gray.900', 'white');
  const color = useColorModeValue('white', 'gray.900');

  const onDelete = (id: number) => {
    setWarningDialogVisible(true);
    setStaffId(id);
  };

  const onConfirmDeleteStaff = (staff_id: number) => {
    deleteFoodMutation.mutateAsync({ staff_id });

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

  const tableStaffs = (
    <Table w="full">
      <thead>
        <Tr>
          <Th>SDT</Th>
          <Th>ROLE</Th>
          <Th>Ngày tạo</Th>
          <Th>Tên</Th>
          <Th>Email</Th>
          <Th width="50px"></Th>
        </Tr>
      </thead>
      <tbody>
        {staffsQuery.data?.values.staffs.map((staff) => {
          return (
            <Box as="tr" key={staff.id}>
              <Td>{staff?.phone_number}</Td>
              <Td>
                <Badge
                  fontSize="1em"
                  borderRadius={4}
                  padding={2}
                  w="100%"
                  textAlign={'center'}
                  colorScheme={colorBadge[staff.permission_id]}
                >
                  {staff.permission_id === 1
                    ? 'Admin'
                    : staff.permission_id === 2
                    ? 'Manager'
                    : 'Nhân viên'}
                </Badge>
              </Td>
              <Td>{staff.name}</Td>
              <Td>{staff?.email}</Td>
              <Td>
                <StaffDropdown staff={staff} onDelete={() => onDelete(staff.id)} />
              </Td>
            </Box>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <Authorization
      forbiddenFallback={<div>Only manager can view this.</div>}
      allowedRoles={[ROLES.MANAGER, ROLES.USER]}
    >
      <SiteHeader
        menuName="Danh sách nhân viên"
        menuHref={ROUTES.FOODS}
        heading={`Staffs`}
        showButton={
          <Authorization
            forbiddenFallback={<div>Only manager can view this.</div>}
            allowedRoles={[ROLES.MANAGER]}
          >
            <Button
              leftIcon={<MdAdd />}
              backgroundColor={bg}
              color={color}
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
              onClick={() => {
                onOpen();
                setType({
                  type: STAFF_FORM.ADD,
                  data: {
                    email: '',
                    phone_number: '',
                    name: '',
                    male: true,
                    cinema_id: -1,
                    date_of_birth: '',
                    permission_id: 3,
                    avatar: '',
                  },
                  image_source: '',
                  staff_id: -1,
                });
              }}
            >
              Thêm nhân viên
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
          shadow={[null, 'md']}
          spacing={4}
          w="100%"
        >
          <Box overflowX="scroll">{staffsQuery.isLoading ? spinner : tableStaffs}</Box>
        </Stack>
      </Flex>

      <StaffFormModal />
      <WarningModal
        onCancel={hideWarningDialog}
        onConfirm={async () => await onConfirmDeleteStaff(staffId)}
        visible={warningDialogVisible}
        message="Điều này sẽ xoá nhân viên hiện tại và bạn không thể khôi phục lại được ?"
      />
    </Authorization>
  );
};
