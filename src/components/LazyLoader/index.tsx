import { LazyExoticComponent, Suspense } from "react";
import SuspenseLoader from "src/components/SuspenseLoader";

export const LazyLoader =
  (
    Component: LazyExoticComponent<() => JSX.Element>,
    LoadingComponent?: JSX.Element
  ) =>
  (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={LoadingComponent ?? <SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );
