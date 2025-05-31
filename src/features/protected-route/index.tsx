import type { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { getAccessToken } from '@services/jwt';

type Props = {
  element: React.ReactNode;
};

const ProtectedRoute: FC<Props> = ({ element }) => {
  const isAuthenticated = !!getAccessToken();
  return isAuthenticated ? element : <Navigate to='/front/sign-in' replace />;
};

export default ProtectedRoute;
