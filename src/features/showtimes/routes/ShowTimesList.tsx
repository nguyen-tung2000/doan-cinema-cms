import {
  Badge,
  Box,
  Button,
  Flex,
  Stack,
  Heading,
  Spinner,
  Text,
  List,
  ListItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { TableSink } from '@/components';
import {
  getListShowtimeMovieRoomCMS,
  showtimeMovieRoomList,
  useShowTimes,
} from '@/features/showtimes';
import {
  getCurrentMonday,
  getCurrentSunday,
  getDay,
  getNextMonday,
  getNextSunday,
  getPrevMonday,
  getPrevSunday,
} from '@/utils/format';

interface ShowTimeListProps {
  cinema_id: number;
}

export const ShowTimesList: React.FC<ShowTimeListProps> = ({ cinema_id }) => {
  const [currentMonSun, setCurrentMonSun] = React.useState({
    mon: getCurrentMonday(),
    sun: getCurrentSunday(),
  });
  const [dataShowTimes, setDataShowTimes] = React.useState({
    dateStart: currentMonSun.mon,
    dateEnd: currentMonSun.sun,
    cinema_id,
  });
  const [showtimeLists, setShowtimeLists] = React.useState<showtimeMovieRoomList[]>([]);
  // const showTimesQuery = useShowTimes({
  //   data: dataShowTimes,
  // });
  useEffect(() => {
    getListShowtimeMovieRoomCMS().then((res) => {
      setShowtimeLists(res.values);
    });
  }, []);
  const onPrevWeek = () => {
    setCurrentMonSun({
      ...currentMonSun,
      mon: getPrevMonday(currentMonSun.mon),
      sun: getPrevSunday(currentMonSun.sun),
    });

    setDataShowTimes({
      ...dataShowTimes,
      dateStart: getPrevMonday(currentMonSun.mon),
      dateEnd: getPrevSunday(currentMonSun.sun),
    });
  };

  const onNextWeek = () => {
    setCurrentMonSun({
      ...currentMonSun,
      mon: getNextMonday(currentMonSun.mon),
      sun: getNextSunday(currentMonSun.sun),
    });

    setDataShowTimes({
      ...dataShowTimes,
      dateStart: getNextMonday(currentMonSun.mon),
      dateEnd: getNextSunday(currentMonSun.sun),
    });
  };
  // const rows = React.useMemo(() => showTimesQuery.data?.showTimes, [showTimesQuery.data]);

  const spinner = (
    <Flex justifyContent="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );

  const noData = (
    <Box
      role="list"
      aria-label="comments"
      backgroundColor="white"
      textColor="gray.500"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="40"
    >
      <Heading as="h4" size="xl">
        Không có lịch chiếu được tìm thấy
      </Heading>
    </Box>
  );

  return (
    <Box width="100%">
      <Heading as="h2" size="lg">
        Danh sách lịch chiếu - suất chiếu
      </Heading>
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
          <Accordion defaultIndex={[0]} allowMultiple>
            {showtimeLists.map((item) => (
              <AccordionItem key={item.room}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Room {item.room}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {item.lists.map((ele, index) => (
                    <AccordionItem key={item.room}>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            {ele.day}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Grid templateColumns="repeat(4, 1fr)" gap={6} key={index}>
                          {ele.showtimes.map((ele1, index) => (
                            <GridItem key={index}>
                              <div className="flex items-center">
                                <Image
                                  src={ele1.movie.image}
                                  alt="Dan Abramov"
                                  width="150px"
                                  height="175px"
                                />
                                <div className="flex flex-col" style={{ textAlign: 'center' }}>
                                  <div>{ele1.slot}</div>
                                  <div>{ele1.movie.name}</div>
                                </div>
                              </div>
                            </GridItem>
                          ))}
                        </Grid>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Stack>
      </Flex>
    </Box>
  );
};
