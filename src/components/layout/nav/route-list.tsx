// src/components/layout/nav/route-list.tsx
import { lazy } from 'react';

const PropertiesPage = lazy(() => import('@/pages/properties'));
const FeaturedPropertiesPage = lazy(() => import('@/pages/properties/featured'));
const PropertyDetailsPage = lazy(() => import('@/pages/properties/[id]'));
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const RegisterPage = lazy(() => import('@/pages/auth/register'));

export const routeList = [
  {
    path: 'auth',
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
  },
  {
    path: 'properties',
    element: <PropertiesPage />,
    children: [
      {
        path: 'list',
        element: <PropertiesPage />
      },
      {
        path: 'featured',
        element: <FeaturedPropertiesPage />
      },
      {
        path: ':id',
        element: <PropertyDetailsPage />
      }
    ]
  }
];