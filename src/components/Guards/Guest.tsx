import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteParts } from 'src/router/routes';
import { useSelector } from 'src/store';

type GuestProps = {
  children: ReactNode;
};

export default function Guest({ children }: GuestProps) {
  const { user } = useSelector((state) => state.app);

  if (user) {
    return <Navigate to={RouteParts.ROOT} />;
  }

  return <>{children}</>;
}
