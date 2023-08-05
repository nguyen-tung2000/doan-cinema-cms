import {
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

import { SiteHeader } from '@/components';
import { ROUTES } from '@/constants';
import { ShowTimesList, ShowTimesCreate } from '@/features/showtimes';
import { useAuth } from '@/lib/auth';
import { Authorization, ROLES } from '@/lib/authorization';

export const ShowTimesPage = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Authorization
        forbiddenFallback={<div>Only manager can view this.</div>}
        allowedRoles={[ROLES.MANAGER]}
      >
        <SiteHeader
          menuName="Lịch chiếu"
          menuHref={ROUTES.SHOWTIMES_CREATE}
          heading={`Tạo lịch chiếu `}
        >
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Lịch chiếu mới</BreadcrumbLink>
          </BreadcrumbItem>
        </SiteHeader>

        <Flex justifyContent="center">
          <Stack
            backgroundColor="white"
            maxWidth="1000px"
            px={8}
            py={12}
            shadow={[null, 'md']}
            spacing={4}
            w="100%"
            alignItems="center"
            flexShrink={0}
          >
            <Tabs variant="enclosed" width="full">
              <TabList>
                <Tab>Danh sách lịch chiếu</Tab>
                <Tab>Tạo lịch chiếu </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ShowTimesList cinema_id={user?.cinema_id || 0} />
                </TabPanel>
                <TabPanel>
                  <ShowTimesCreate user={user} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Flex>
      </Authorization>
    </Box>
  );
};
