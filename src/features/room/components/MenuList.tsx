import {
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";

import { useDeleteRoom } from "../api/deleteRoom";
interface MenuListRoomProps {
  roomId: string;
}

export const MenuListRoom: React.FC<MenuListRoomProps> = ({ roomId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = useRef();
  const deleteRoomMutation = useDeleteRoom();
  const onDelete = async () => {
    await deleteRoomMutation.mutateAsync({ roomId });
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreVertical />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<FiEdit2 />} command="⌘T">
          Chỉnh sửa
        </MenuItem>
        <MenuItem icon={<FiTrash2 />} command="⌘N" onClick={onOpen}>
          Xoá phòng
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Xoá phòng
              </AlertDialogHeader>
              <AlertDialogBody>
                Bạn có chắc không ? Điều này sẽ xoá phòng hiện tại và bạn không thể khôi phục lại
                được ?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Huỷ bỏ
                </Button>
                <Button
                  fontWeight="bold"
                  colorScheme="red"
                  onClick={onDelete}
                  ml={3}
                  isLoading={deleteRoomMutation.isLoading}
                >
                  Xoá
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
