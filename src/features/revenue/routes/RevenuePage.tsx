import { Box, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { SiteHeader } from '@/components';
import { ROUTES } from '@/constants';
import { RevenueByDateForm, RevenueByQuarterForm, RevenueAllByMonthForm } from '@/features/revenue';
import { useAuth } from '@/lib/auth';
import { Authorization, useAuthorization, ROLES } from '@/lib/authorization';

export const RevenuePage = () => {
  const { user } = useAuth();
  const { checkAccess } = useAuthorization();
  return (
    <Box>
      <Authorization
        forbiddenFallback={<div>Chỉ có người có quyền mới truy cập được.</div>}
        allowedRoles={[ROLES.USER, ROLES.MANAGER, ROLES.ADMIN]}
      >
        <SiteHeader
          menuName="Doanh thu"
          menuHref={ROUTES.REVENUE}
          heading={`Doanh thu của rạp phim`}
        />
        <Flex justifyContent="flex-start">
          <Stack
            backgroundColor="white"
            px={5}
            py={12}
            shadow={[null, 'md']}
            spacing={4}
            w="100%"
            alignItems="center"
            flexShrink={0}
          >
            <Tabs width="full">
              <TabList>
                <Tab isDisabled={!checkAccess({ allowedRoles: [ROLES.ADMIN] })}>
                  Doanh thu của tất cả rạp theo tháng
                </Tab>
                <Tab isDisabled={!checkAccess({ allowedRoles: [ROLES.USER, ROLES.MANAGER] })}>
                  Doanh thu của rạp theo ngày
                </Tab>

                <Tab isDisabled={!checkAccess({ allowedRoles: [ROLES.MANAGER] })}>
                  Doanh thu của rạp theo tháng
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <RevenueAllByMonthForm />
                </TabPanel>
                <TabPanel>
                  <RevenueByDateForm
                    cinema_id={user?.cinema_id || 0}
                    userName={user?.name || ''}
                    roleType={user?.permission_id || 3}
                  />
                </TabPanel>

                <TabPanel>
                  <RevenueByQuarterForm cinema_id={user?.cinema_id || 0} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Flex>
      </Authorization>
    </Box>
  );
};
