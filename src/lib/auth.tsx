import { Flex, Spinner } from '@chakra-ui/react';
import { initReactQueryAuth } from 'react-query-auth';

import { AuthUser, getUser, UserResponse } from '@/features/auth';
import storage from '@/utils/storage';

async function handleUserResponse(data: UserResponse) {
  const { token, staff } = data;
  storage.setToken(token);

  return staff;
}

async function loadUser() {
  if (storage.getToken()) {
    const { staff } = await getUser();
    return staff;
  }
  return null;
}

async function loginFn(values: UserResponse) {
  const user = await handleUserResponse(values);
  return user;
}

async function registerFn(values: UserResponse) {
  const user = await handleUserResponse(values);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <Flex width="100vw" height="100vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" thickness="4px" emptyColor="gray.200" color="blue.500" />
      </Flex>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  UserResponse,
  UserResponse
>(authConfig);
