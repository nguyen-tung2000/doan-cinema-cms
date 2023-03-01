import {
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { useParams } from 'react-router-dom';

import { SiteHeader } from '@/components/Layout';
import { ROUTES } from '@/constants';
import { getRangeDate } from '@/features/seller';
import { ShowTimesListV2 } from '@/features/showtimes';

export const Cinema = () => {
  const { rangeDate, startDay } = getRangeDate();
  const [activeDate, setActiveDate] = React.useState<string>(format(startDay, 'MM/dd/yyyy'));
  const { _id: cinemaId }: { _id: string } = useParams();

  return (
    <>
      <SiteHeader menuName="List Cinema" menuHref={ROUTES.CINEMA_LIST} heading={`Cinema`}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Cinema 2</BreadcrumbLink>
        </BreadcrumbItem>
      </SiteHeader>
      <Tabs>
        <TabList>
          <Tab fontWeight="500">Showtimes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex justifyContent="flex-start">
              <ShowTimesListV2
                rangeDate={rangeDate}
                activeDate={activeDate}
                setActiveDate={setActiveDate}
                cinemaId={cinemaId}
                isMineCinema={false}
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
