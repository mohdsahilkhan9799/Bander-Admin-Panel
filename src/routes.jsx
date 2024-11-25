import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  // {
  //   exact: 'true',
  //   path: '/auth/signup-1',
  //   element: lazy(() => import('./views/auth/signup/SignUp1'))
  // },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/adminpanel/dashboard',
        element: lazy(() => import('./views/dashboard'))
      },

      {
        exact: 'true',
        path: '/product/category',
        element: lazy(() => import('./views/extra/CreateCategory'))
      },
      {
        exact: 'true',
        path: '/brands',
        element: lazy(() => import('./views/extra/CreateProduct'))
      },
      {
        exact: 'true',
        path: '/ProfilePage',
        element: lazy(() => import('./views/extra/ProfilePage'))
      },
      {
        exact: 'true',
        path: '/walletPage',
        element: lazy(() => import('./views/extra/WalletPage'))
      },
      {
        exact: 'true',
        path: '/coupans',
        element: lazy(() => import('./views/extra/Coupons'))
      },
      {
        exact: 'true',
        path: '/create/Product',
        element: lazy(() => import('./views/extra/CreateVenderProduct'))
      },
      {
        exact: 'true',
        path: '/All/Product',
        element: lazy(() => import('./views/extra/AllProductList'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
