import { Box, Skeleton, Stack } from '@chakra-ui/react';

import { SiteHeader } from '@/components';
import { ROUTES } from '@/constants';
import { AuthUser } from '@/features/auth';
import { CinemaItem, CinemaModalCreate, useCinemas } from '@/features/cinema';
import { useAuth } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';

export const Cinemas = () => {
  const { isLoading, data } = useCinemas();
  const { user } = useAuth();

  return (
    <>
      <SiteHeader
        menuName="Danh sách rạp"
        menuHref={ROUTES.CINEMA_LIST}
        heading="Danh sách rạp"
        showButton={
          <Authorization policyCheck={POLICIES['cinema:create'](user as AuthUser)}>
            <CinemaModalCreate />
          </Authorization>
        }
      />
      <Box px="3">
        {isLoading ? (
          <Stack>
            <Skeleton height="279px" borderRadius="8px" />
            <Skeleton height="279px" borderRadius="8px" />
            <Skeleton height="279px" borderRadius="8px" />
            <Skeleton height="279px" borderRadius="8px" />
          </Stack>
        ) : (
          data?.values?.map((cinema) => <CinemaItem key={cinema.name} {...cinema} />)
        )}
      </Box>
    </>
  );
};
