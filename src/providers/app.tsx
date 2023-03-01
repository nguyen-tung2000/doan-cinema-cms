import { Button, Flex, Heading, Spinner } from '@chakra-ui/react';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';

const ErrorFallback = () => {
  return (
    <Flex
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      role="alert"
    >
      <Heading size="lg" textColor="red.500" mb="2">
        Ooops, something went wrong
      </Heading>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => window.location.assign(`${window.location.origin}/app`)}
      >
        Refresh
      </Button>
    </Flex>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <HelmetProvider>
      <React.Suspense
        fallback={
          <Flex height="100vh" alignItems="center" justifyContent="center">
            <Spinner
              size="xl"
              thickness="4px"
              speed="0.65"
              emptyColor="gray.200"
              color="blue.500"
            />
          </Flex>
        }
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            <AuthProvider>
              <Router>{children}</Router>
            </AuthProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </React.Suspense>
    </HelmetProvider>
  );
};
