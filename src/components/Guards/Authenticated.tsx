import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { EVENTS_PATH } from "src/router/routes";
import { useSelector } from "src/store";

type AuthenticatedProps = {
  children: ReactNode;
};

export default function Authenticated({ children }: AuthenticatedProps) {
  const { user } = useSelector((state) => state.app);

  if (!user) {
    return <Navigate to={EVENTS_PATH} />;
  }

  return <>{children}</>;
}
