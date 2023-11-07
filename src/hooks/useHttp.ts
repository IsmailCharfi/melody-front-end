import { useState, useCallback } from "react";
import { useDispatch } from "src/store";
import useIsMounted from "./useIsMounted";
import ApiResponse from "src/tools/Fetcher/ApiResponse";
import { loaderOff, loaderOn } from "src/slices/app";

type UseHttpOptions = {
  globalLoader?: boolean;
  errorBoundary?: boolean;
};

type ApiResponseCallBack<T> = () => Promise<ApiResponse<T>>;

type SendRequest = <T>(cb: ApiResponseCallBack<T>) => Promise<ApiResponse<T>>;

type UseHttpReturn = [SendRequest, boolean];

/**
 * A custom hook built for sending HTTP requests and handling loading and errors state
 * @param options - object of booleans that changes the behaviour of loading and error handling
 * @field `globalLoader` it triggers the global suspense component for loading while sending request, by default it's false
 * @field `errorBoundary` it triggers the global error boundary, by default it's false
 * @returns `sendRequest` function responsible for sending HTTP requests
 * @returns `isLoading` boolean referring the loading state of the request
 */
export default function useHttp(
  options: UseHttpOptions = {
    globalLoader: false,
    errorBoundary: false,
  }
): UseHttpReturn {
  const { globalLoader, errorBoundary } = options;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();
  const isMounted = useIsMounted();

  if (errorBoundary && error) {
    throw error;
  }

  const sendRequest: SendRequest = useCallback(
    async <T>(callBack: () => Promise<ApiResponse<T>>) => {
      if (isMounted()) setIsLoading(true);
      if (globalLoader) dispatch(loaderOn());

      const response = await callBack();

      if (!response.isOk) {
        if (isMounted()) setError(new Error(response?.message));
      }

      if (isMounted()) setIsLoading(false);
      if (globalLoader) dispatch(loaderOff());

      return response;
    },
    [globalLoader]
  );

  return [sendRequest, isLoading];
}
