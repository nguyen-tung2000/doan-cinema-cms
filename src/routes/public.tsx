import { lazyImport } from '@/utils/lazyImport';

const { Auth } = lazyImport(() => import('@/features/auth'), 'Auth');

export const publicRoutes = [
  {
    path: '/',
    component: Auth,
  },
];
