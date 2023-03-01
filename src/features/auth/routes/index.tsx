import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as z from 'zod';

import { InputField } from '@/components/Form';
import { loginWithEmailAndPassword } from '@/features/auth';
import { useAuth } from '@/lib/auth';

type LoginValues = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().nonempty({ message: 'Vui lòng nhập tài khoản' }).email(),
  password: z.string().nonempty({ message: 'Vui lòng nhập mật khẩu' }),
});

export const Auth = () => {
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const history = useHistory();

  const onLogin: SubmitHandler<LoginValues> = async (data: LoginValues) => {
    try {
      setIsLoggingIn(!isLoggingIn);
      const { values } = await loginWithEmailAndPassword(data);
      setIsLoggingIn(false);
      login(values);
      setIsLoggingIn(false);
      history.push('/app');
    } catch {
      setIsLoggingIn(false);
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" background="gray.200">
      <Stack
        as="form"
        backgroundColor="white"
        borderRadius={[0, 8]}
        maxWidth="400px"
        onSubmit={handleSubmit(onLogin)}
        px={8}
        py={12}
        shadow={[null, 'md']}
        spacing={4}
        w="100%"
      >
        <Heading mb={6}>Sign in to CMS </Heading>
        <InputField
          label="Email Address"
          registration={register('username')}
          aria-label="Email Address"
          error={errors['username']}
        />
        <InputField
          label="Password"
          registration={register('password')}
          aria-label="Password"
          type="password"
          error={errors['password']}
        />
        <Button
          id="login"
          type="submit"
          backgroundColor="cyan.400"
          color="white"
          isLoading={isLoggingIn}
          fontWeight="medium"
          mt={4}
          h="50px"
          fontSize="lg"
          _hover={{ bg: 'cyan.700' }}
          _active={{
            bg: 'cyan.200',
            transform: 'scale(0.95)',
          }}
        >
          Sign in
        </Button>
      </Stack>
    </Flex>
  );
};
