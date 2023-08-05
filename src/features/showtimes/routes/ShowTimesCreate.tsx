import { Box, Button, Center, Divider, Flex, Stack, Spinner, useToast } from '@chakra-ui/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { SelectField, SingleSelect } from '@/components';
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
} from '@/features/showtimes';
// import { useRoomsByMovieStore } from '@/stores/timeSlot';
import { formatDate } from '@/utils/format';
import { isEmptyObject } from '@/utils/object';

export type ShowTimesValues = {
  date?: string;
  dateStart: string;
  dateEnd: string;
  movieId: string;
  cinema_id: number;
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
  // const {
  //   listRoomByMovie,
  //   fetchRooms,
  //   checkedTimes,
  //   reset: resetMovies,
  //   loading,
  // } = useRoomsByMovieStore();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ShowTimesValues>({
    defaultValues: {
      date: formatDate(new Date()),
      movieId: '',
      dateStart: '',
      dateEnd: '',
      cinema_id: user?.cinema_id,
      showTimes: [],
    },
  });
  React.useEffect(() => {
    get21Day()
      .then((res) => {
        setListDay(res.values);
      })
      .catch(console.log);
  });
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        showTimes: [],
        dateStart: '',
        dateEnd: '',
      });
    }
    // eslint-disable-next-line
  }, [formState, reset]);

  const onChangeMovie = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    return value ? value : '';
    // return value ? fetchRooms(value) : resetMovies();
  };

  const onSubmit = handleSubmit(async (data) => {
    if (data['showTimes'] === undefined || isEmptyObject(data.showTimes)) {
      toast({
        title: 'Vui lòng chọn lịch chiếu',
        position: 'top-right',
        isClosable: true,
        status: 'info',
      });
      return;
    }
    const times = data.showTimes.filter(
      (t) => Boolean(t.roomId) !== false && Boolean(t.times) !== false,
    );

    const newShowTimes = {
      ...data,
      cinema_id: user?.cinema_id,
      showTimes: times,
    };

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
                <SelectField
                  label="Ngày chiếu"
                  placeholder="Chọn ngày chiếu"
                  registration={register('movieId')}
                  error={errors['movieId']}
                  options={moviesQuery.data?.values.map((movie) => ({
                    title: movie.movie_group_name,
                    items: movie.movies.map((m) => ({
                      label: m.name,
                      value: m.id,
                    })),
                  }))}
                  onChanging={onChangeMovie}
                />
                {moviesQuery.data && (
                  <SelectField
                    label="Phim"
                    placeholder="Chọn 1 bộ phim"
                    registration={register('movieId')}
                    error={errors['movieId']}
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
              <Center flexShrink={0} mx={3} height="50px">
                <Divider orientation="vertical" />
              </Center>
              <Stack direction="column" flex={1}>
                <SingleSelect
                  registration={register('dateStart')}
                  label="Từ"
                  setValues={setValue}
                  nameToSet="dateStart"
                  sizeOfTimeStamp={0}
                />
                <SingleSelect
                  registration={register('dateEnd')}
                  label="Đến"
                  setValues={setValue}
                  nameToSet="dateEnd"
                  sizeOfTimeStamp={0}
                />
              </Stack>
            </Flex>

            {/* <TimeSlotList
              register={register}
              rooms={listRoomByMovie}
              checkedTimes={checkedTimes}
              isLoading={loading}
            /> */}

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
