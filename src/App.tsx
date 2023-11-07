import { useRoutes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import dayjs from "dayjs";
import "src/i18n";
import "dayjs/locale/fr";
import "dayjs/locale/en";
import localData from "dayjs/plugin/localeData";
import { useTranslation } from "react-i18next";
import router from "src/router";
import AppInit from "src/components/Init";
import InternalServelError from "src/pages/Status/InternalServerError";
import { useDispatch, useSelector } from "src/store";
import { useEffect } from "react";
import { LocalstorageKeys } from "./misc/enums/LocalStorage/LocalstorageKeys";
import { setIsInitialized, setToken, setUser } from "./slices/app";
import useHttp from "./hooks/useHttp";
import AuthService from "./services/AuthService";
import wait from "./utils/wait";

export default function App() {
  const { isInitialized } = useSelector((state) => state.app);
  const [sendRequest] = useHttp();
  const dispatch = useDispatch();
  const content = useRoutes(router);
  const { i18n } = useTranslation();

  dayjs.extend(localData);
  dayjs.locale(i18n.language);

  useEffect(() => {
    (async function init() {
      const token = localStorage.getItem(LocalstorageKeys.TOKEN);

      if (token) {
        const response = await sendRequest(() =>
          AuthService.getConnectedUser()
        );

        if (response.isOk) {
          dispatch(setToken(token));
          dispatch(setUser(response.data));
        } else {
          localStorage.removeItem(LocalstorageKeys.TOKEN);
        }
      }

      // mock waiting
      await wait(2000);

      dispatch(setIsInitialized(true));
    })();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={InternalServelError}>
      {isInitialized ? content : <AppInit />}
    </ErrorBoundary>
  );
}
