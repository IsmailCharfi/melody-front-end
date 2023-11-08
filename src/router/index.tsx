import { lazy } from "react";
import { RouteObject } from "react-router";
import { Navigate } from "react-router-dom";
import Authenticated from "src/components/Guards/Authenticated";
import { LazyLoader } from "src/components/LazyLoader";
import TopNavigationLayout from "src/layouts/AppLayout";
import NotFound from "src/pages/Status/NotFound";
import { EVENTS_PATH, RouteParts } from "src/router/routes";

const EventsList = LazyLoader(
  lazy(() => import("src/pages/Events/EventsList"))
);

const MyTickets = LazyLoader(
  lazy(() => import("src/pages/MyTickets/MyTickets"))
);

const router: RouteObject[] = [
  {
    path: RouteParts.ROOT,
    element: <TopNavigationLayout />,
    children: [
      {
        path: RouteParts.BLANK,
        element: <Navigate to={EVENTS_PATH} replace />,
      },
      {
        path: RouteParts.EVENTS,
        element: <EventsList />,
      },
      {
        path: RouteParts.TICKETS,
        element: (
          <Authenticated>
            <MyTickets />
          </Authenticated>
        ),
      },
    ],
  },
  {
    path: RouteParts.WILDCARD,
    element: <NotFound />,
  },
];

export default router;
