import { FC, lazy } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { routeList } from '../components/layout/nav/route-list';
import LayoutComponent from '../../src/pages/home';
import SignInPage from '../pages/auth/signin';
import RegisterPage from '../pages/auth/register';

const NotFound = lazy(() => import('@/pages/not-found'));

const routes = [
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        path: '',
        element: <Navigate to="home" />,
      },
      {
        path: 'home',
        children: [
          ...routeList,
        ]
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  // Auth routes at root level
  {
    path: '/auth',
    children: [
      {
        path: 'signin',
        element: <SignInPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  }
];

const RenderRouter: FC = () => {
  const element = useRoutes(routes);

  return element;
};

export default RenderRouter;
