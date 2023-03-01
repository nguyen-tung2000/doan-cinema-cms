import { Switch } from 'react-router-dom';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { RouteWithSubRoutes } from './routerConfig';

import { useAuth } from '@/lib/auth';

export const AppRoutes = () => {
  const auth = useAuth();

  const routes = auth.user ? protectedRoutes : publicRoutes;

  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
};
