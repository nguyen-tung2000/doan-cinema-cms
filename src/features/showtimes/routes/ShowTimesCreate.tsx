import { Box, Button, Center, Divider, Flex, Stack, Spinner, useToast } from '@chakra-ui/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { SelectField, SingleSelect, SelectOneField } from '@/components';
import { AuthUser } from '@/features/auth';
import { useRooms } from '@/features/room';
import {
  useCreateShowTime,
  useMoviesCMS,
  TimeSlotCreate,
  TimeSlotList,
  TimeStamp,
  get21Day,
  ShowtimeType,
  RoomShowtimeType,
  getRoomShowtimeCMS,
} from '@/features/showtimes';
// import { useRoomsByMovieStore } from '@/stores/timeSlot';
import { formatDate } from '@/utils/format';
import { isEmptyObject } from '@/utils/object';

export type ShowTimesValues = {
  showtime_id: number;
  movie_id: string;
  showTimes: TimeStamp[];
};

interface ShowTimesCreateProps {
  user: AuthUser | undefined | null;
}

export const ShowTimesCreate: React.FC<ShowTimesCreateProps> = ({ user }) => {
  const toast = useToast();
  const moviesQuery = useMoviesCMS();
  const createShowTimeMutation = useCreateShowTime();
  const roomQuery = useRooms();
  const [listDay, setListDay] = React.useState<ShowtimeType[]>([]);
  const [listRoom, setListRoom] = React.useState<RoomShowtimeType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ShowTimesValues>({
    defaultValues: {
      showtime_id: listDay[0]?.id,
      movie_id: moviesQuery.data?.values[0].movies[0].id,
      showTimes: [],
    },
  });

  React.useEffect(() => {
    get21Day()
      .then((res) => {
        setListDay(res.values);
        setValue('showtime_id', res.values[0].id);
      })
      .catch(console.log);
  }, []);
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        showTimes: [],
      });
    }
    // eslint-disable-next-line
  }, [formState, reset]);

  const onChangeMovie = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    getRoomShowtimeCMS(value, getValues('showtime_id'))
      .then((res) => {
        setListRoom(res.values);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(console.log);
    return value ? value : '';
    // return value ? fetchRooms(value) : resetMovies();
  };
  const onChangeShowtime = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    return value ? value : -1;
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    if (data['showTimes'] === undefined || isEmptyObject(data.showTimes)) {
      toast({
        title: 'Vui lòng chọn lịch chiếu',
        position: 'top-right',
        isClosable: true,
        status: 'info',
      });
      return;
    }
    // const times = data.showTimes.filter(
    //   (t) => Boolean(t.roomId) !== false && Boolean(t.times) !== false,
    // );

    // const newShowTimes = {
    //   ...data,
    //   cinema_id: user?.cinema_id,
    //   showTimes: times,
    // };

    // await createShowTimeMutation.mutateAsync({ data: newShowTimes });
    // resetMovies();
  });
  const spiner = (
    <Flex justifyContent="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );
  const formData = (
    <>
      <TimeSlotCreate />
      <Box
        width="100%"
        margin="auto"
        border="1px"
        borderColor="gray.200"
        borderStyle="solid"
        padding="5"
      >
        <form onSubmit={onSubmit}>
          <Stack spacing={4} direction="column">
            <Flex alignItems="center" justifyContent="space-between">
              <Stack direction="column" flex={1}>
                <SelectOneField
                  label="Ngày chiếu"
                  placeholder="Chọn ngày chiếu"
                  registration={register('showtime_id')}
                  error={errors['showtime_id']}
                  title="Chọn ngày chiếu"
                  options={listDay.map((item) => ({
                    label: item.time,
                    value: item.id,
                  }))}
                  onChanging={onChangeShowtime}
                />
              </Stack>
              <Center flexShrink={0} mx={3} height="50px">
                <Divider orientation="vertical" />
              </Center>
              <Stack direction="column" flex={1}>
                {moviesQuery.data && (
                  <SelectField
                    label="Phim"
                    placeholder="Chọn 1 bộ phim"
                    registration={register('movie_id')}
                    error={errors['movie_id']}
                    options={moviesQuery.data?.values.map((movie) => ({
                      title: movie.movie_group_name,
                      items: movie.movies.map((m) => ({
                        label: m.name,
                        value: m.id,
                      })),
                    }))}
                    onChanging={onChangeMovie}
                  />
                )}
              </Stack>
            </Flex>

            <TimeSlotList register={register} rooms={listRoom} isLoading={loading} />

            <Button
              backgroundColor="cyan.400"
              color="white"
              fontWeight="medium"
              type="submit"
              _hover={{
                backgroundColor: 'cyan.700',
              }}
              maxWidth="200px"
              alignSelf="flex-end"
              isLoading={createShowTimeMutation.isLoading}
            >
              Tạo lịch chiếu
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );

  return <Box>{moviesQuery.isLoading ? spiner : formData}</Box>;
};
