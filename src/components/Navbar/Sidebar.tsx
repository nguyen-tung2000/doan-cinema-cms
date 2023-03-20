import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import clsx from "clsx";
import * as React from "react";
import { IconType } from "react-icons";
import { AiOutlineSchedule } from "react-icons/ai";
import {
  FiHome,
  // FiTrendingUp,
  FiCompass,
  FiStar,
  FiUser,
  FiUsers,
  FiMenu,
  FiMoon,
  FiSun,
  FiBell,
  FiFilm,
  FiBox,
  FiChevronDown,
} from "react-icons/fi";
import { GiPopcorn } from "react-icons/gi";
import { NavLink } from "react-router-dom";

import { Password } from "@/features/password";
import { useAuth } from "@/lib/auth";
import { useAuthorization, ROLES } from "@/lib/authorization";
interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}

const LinkItems = () => {
  const { checkAccess } = useAuthorization();

  const navigation = [
    { name: "Trang chủ", icon: FiHome, to: "/app/dashboard" },
    checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
      name: "Phim",
      icon: FiFilm,
      to: "/app/managemovie",
    },
    // checkAccess({ allowedRoles: [ROLES.USER, ROLES.MANAGER, ROLES.ADMIN] }) && {
    //   name: 'Doanh thu',
    //   icon: FiTrendingUp,
    //   to: '/app/revenue',
    // },
    {
      name: "Rạp",
      icon: FiCompass,
      to: "/app/cinema/list",
    },
    checkAccess({ allowedRoles: [ROLES.MANAGER] }) && {
      name: "Phòng",
      icon: FiBox,
      to: "/app/room/listRoom",
    },
    checkAccess({ allowedRoles: [ROLES.MANAGER] }) && {
      name: "Lịch chiếu",
      icon: AiOutlineSchedule,
      to: "/app/showtimes",
    },
    checkAccess({ allowedRoles: [ROLES.MANAGER] }) && {
      name: "Nhân viên",
      icon: FiUser,
      to: "/app/users",
    },
    checkAccess({ allowedRoles: [ROLES.MANAGER] }) && {
      name: "Khách hàng",
      icon: FiUsers,
      to: "/app/customers",
    },
    checkAccess({ allowedRoles: [ROLES.MANAGER, ROLES.USER] }) && {
      name: "Bán vé",
      icon: FiStar,
      to: "/app/seller",
    },
    checkAccess({ allowedRoles: [ROLES.MANAGER, ROLES.USER] }) && {
      name: "Bắp nước",
      icon: GiPopcorn,
      to: "/app/foods",
    },
  ].filter(Boolean) as LinkItemProps[];

  return (
    <>
      {navigation.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.to}>
          {link.name}
        </NavItem>
      ))}
    </>
  );
};

export default function SidebarWithHeader({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} py={4}>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      overflowX="scroll"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Movieer CMS
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <LinkItems />
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactText;
  href: string;
  classes?: string;
}
const NavItem = ({ icon, children, href, classes, ...rest }: NavItemProps) => {
  return (
    <NavLink to={href} style={{ textDecoration: "none" }} activeClassName="active-link">
      <Flex
        align="center"
        p="4"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        className={clsx("link-item", classes)}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            transition="transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            as={icon}
            className={classes && "link-icon"}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [type, setType] = React.useState<number>(0);
  const { logout, user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { role } = useAuthorization();
  const { isOpen, onOpen: onOpenn, onClose } = useDisclosure();

  const handleOpen = (type: number) => {
    onOpenn();
    setType(type);
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Movieer CMS
      </Text>

      <HStack spacing={{ base: "0", md: "4" }}>
        <IconButton size="lg" variant="ghost" aria-label="toogle theme" icon={<FiBell />} />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="toogle theme"
          icon={colorMode === "light" ? <FiSun /> : <FiMoon />}
          onClick={toggleColorMode}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar size={"sm"} src={user?.profile.avatar} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.profile.fullName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {role}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              marginTop={"2px"}
            >
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"} py={4} px="20px">
                <Avatar
                  w={"80px"}
                  h={"80px"}
                  marginBottom={"10px"}
                  textAlign={"center"}
                  justifyItems={"center"}
                  src={user?.profile.avatar}
                />
                <Text>{user?.profile.fullName}</Text>
                <Text>{user?.email}</Text>
              </Box>
              <MenuDivider />
              <MenuItem onClick={() => handleOpen(1)}>Profile</MenuItem>
              <MenuItem onClick={() => handleOpen(0)}>Change Password</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
      <Password isOpen={isOpen} onClose={onClose} type={type} />
    </Flex>
  );
};
