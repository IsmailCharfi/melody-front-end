import { ReactNode } from 'react';
import { UserRoles } from 'src/misc/enums/User/UserRoles';
import AccessDenied from 'src/pages/Status/AccessDenied';
import { useSelector } from 'src/store';

type GrantedProps = {
  roles: UserRoles[];
  children: ReactNode;
};

export default function Granted({ children, roles }: GrantedProps) {
  const { user } = useSelector((state) => state.app);

  if (user && !user.hasRoles(roles) && !user.hasRoles([UserRoles.ROLE_DEV])) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
