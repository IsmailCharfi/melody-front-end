import { useSnackbar, SnackbarKey, VariantType } from "notistack";
import { useTranslation } from "react-i18next";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { Button, IconButton, useTheme } from "@mui/material";
import ApiResponse from "src/tools/Fetcher/ApiResponse";

type ToastOptions = {
  duration?: number;
  onClick?: () => any;
  buttonText?: string;
};

const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const theme = useTheme();

  const action = (
    snackbarId: SnackbarKey,
    onClick: (
      closeSnackbar: (key?: SnackbarKey) => void,
      snackbarId: SnackbarKey
    ) => any,
    buttonText: string = I18nKeys.VIEW
  ) => (
    <>
      {onClick && (
        <Button
          sx={{ color: theme.palette.background.paper }}
          onClick={() => {
            onClick(closeSnackbar, snackbarId);
          }}
        >
          {t(buttonText)}
        </Button>
      )}
      <IconButton
        sx={{ color: theme.palette.background.paper }}
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        <CloseTwoToneIcon />
      </IconButton>
    </>
  );

  const addToast = (
    message: string,
    variant: VariantType,
    options: ToastOptions = null
  ) =>
    enqueueSnackbar(t(message), {
      variant,
      ...(options?.duration ? { autoHideDuration: options?.duration } : {}),
      action: (id: SnackbarKey) =>
        action(id, options?.onClick, options?.buttonText),
    });

  const success = (
    message: string = I18nKeys.FETCH_SUCCESS,
    options: ToastOptions = null
  ) => addToast(message, "success", options);

  const error = (
    message: string = I18nKeys.FETCH_FAILURE,
    options: ToastOptions = null
  ) => addToast(message, "error", options);

  const warning = (message: string, options: ToastOptions = null) =>
    addToast(message, "warning", options);

  const info = (message: string, options: ToastOptions = null) =>
    addToast(message, "info", options);

  const displayApiResponse = (response: ApiResponse<any>) => {
    return response.isOk ? success(response.message) : error(response.message);
  };

  return {
    displayApiResponse,
    success,
    error,
    warning,
    info,
  };
};

export default useToast;
