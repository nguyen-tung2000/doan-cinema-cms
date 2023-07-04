import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Suspense, useEffect } from 'react';
import { Switch, useHistory, useLocation } from 'react-router-dom';

import { NoMatch, RouteWithSubRoutes } from './routerConfig';

import { MainLayout } from '@/components/Layout';
import { ROUTES } from '@/constants';
import { lazyImport } from '@/utils/lazyImport';

const { DashBoard } = lazyImport(() => import('@/features/dashboard'), 'DashBoard');
const { Cinemas } = lazyImport(() => import('@/features/cinema'), 'Cinemas');
const { Cinema } = lazyImport(() => import('@/features/cinema'), 'Cinema');
const { ManageMovie } = lazyImport(() => import('@/features/manageMovie'), 'ManageMovie');
const { RoomList } = lazyImport(() => import('@/features/room'), 'RoomList');
const { ShowTimesPage } = lazyImport(() => import('@/features/showtimes'), 'ShowTimesPage');
const { SellerPage } = lazyImport(() => import('@/features/seller'), 'SellerPage');
const { SellerTicket } = lazyImport(() => import('@/features/seller'), 'SellerTicket');
const { PaymentComplete } = lazyImport(() => import('@/features/seller'), 'PaymentComplete');
const { RevenuePage } = lazyImport(() => import('@/features/revenue'), 'RevenuePage');
const { StaffPage } = lazyImport(() => import('@/features/staff'), 'StaffPage');
const { CustomerPage } = lazyImport(() => import('@/features/customer'), 'CustomerPage');

const App = ({ routes }: any) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/app') {
      history.push('/app/dashboard');
    }
  }, [history, location.pathname]);

  return (
    <MainLayout>
      <Suspense
        fallback={
          <Flex height="full" width="full" alignItems="center" justifyContent="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <Switch>
          {routes.map((route: any, i: number) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    component: App,
    routes: [
      { path: ROUTES.CINEMA_DETAIL, component: Cinema },
      { path: ROUTES.CINEMA_LIST, component: Cinemas },
      { path: ROUTES.CUSTOMERS, component: CustomerPage },
      { path: ROUTES.MOVIE, component: ManageMovie },
      { path: ROUTES.ROOM_LIST, component: RoomList },
      { path: ROUTES.SHOWTIMES_CREATE, component: ShowTimesPage },
      { path: ROUTES.SELLER_TICKETid, component: SellerTicket },
      { path: ROUTES.PAYMENT_COMPLETE, component: PaymentComplete },
      { path: ROUTES.SELLER, component: SellerPage },
      { path: ROUTES.REVENUE, component: RevenuePage },
      { path: ROUTES.DASHBOARD, component: DashBoard },
      { path: ROUTES.STAFF, component: StaffPage },
      { path: '*', component: NoMatch },
    ],
  },
];
