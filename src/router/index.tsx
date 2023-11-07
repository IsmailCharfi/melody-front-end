import { lazy } from "react";
import { RouteObject } from "react-router";
import { Navigate } from "react-router-dom";
import Guest from "src/components/Guards/Guest";
import { LazyLoader } from "src/components/LazyLoader";
import AuthLayout from "src/layouts/AuthLayout";
import TopNavigationLayout from "src/layouts/AppLayout";
import NotFound from "src/pages/Status/NotFound";
import { EVENTS_PATH, RouteParts } from "src/router/routes";

const EventsList = LazyLoader(
  lazy(() => import("src/pages/Events/EventsList"))
);

const router: RouteObject[] = [
  {
    path: RouteParts.AUTH,
    element: (
      <Guest>
        <AuthLayout />
      </Guest>
    ),
    children: [],
  },
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
        children: [
          {
            path: RouteParts.BLANK,
            element: <EventsList />,
          },
          {
            path: RouteParts.DYNAMIC_ID,
            element: <></>,
          },
        ],
      },
      {
        path: RouteParts.TICKETS,
        children: [
          {
            path: RouteParts.BLANK,
            element: <></>,
          },
          {
            path: RouteParts.DYNAMIC_ID,
            element: <></>,
          },
        ],
      },
    ],
  },
  {
    path: RouteParts.WILDCARD,
    element: <NotFound />,
  },
];

export default router;
