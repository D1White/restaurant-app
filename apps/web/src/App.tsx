import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth, Home } from './pages';
import { RoutesEnum } from './utils/constants';

const router = createBrowserRouter([
  {
    path: RoutesEnum.home,
    element: <Home />,
  },
  {
    path: RoutesEnum.home + '/:dishId',
    element: <Home />,
  },
  {
    path: RoutesEnum.auth,
    element: <Auth />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
