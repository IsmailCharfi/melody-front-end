import { LoadingButton } from "@mui/lab";
import {
  Box,
  Stack,
  Grid,
  useMediaQuery,
  useTheme,
  Alert,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "src/components/Logo";
import Title from "src/components/Title";
import useHttp from "src/hooks/useHttp";
import useToast from "src/hooks/useToast";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import AuthService from "src/services/AuthService";
import { setToken, setUser } from "src/slices/app";
import { useDispatch } from "src/store";

type RegisterPageProps = {
  noTitle?: boolean;
};

export default function RegisterPage(props: RegisterPageProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sendRequest, isLoading] = useHttp();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(null);
  const dispatch = useDispatch();
  const toaster = useToast();

  const handleLoginSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const response = await sendRequest(() =>
      AuthService.register({ firstname, lastname, email, password })
    );
    toaster.displayApiResponse(response);

    if (response.isOk) {
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
    } else {
      setError(response.message);
    }
  };

  return (
    <>
      {!props.noTitle && <Title title={t(I18nKeys.LOGIN)} />}

      <Box p={2} m={2}>
        <Grid container display={"flex"} alignItems={"center"}>
          {!mobile && (
            <Grid item xs={6}>
              <img
                src="/images/register.svg"
                alt="register"
                style={{
                  width: "90%",
                }}
              />
            </Grid>
          )}
          <Grid
            item
            xs={mobile ? 12 : 5}
            sx={{ m: 2 }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack gap={1} width={"100%"}>
              {!props.noTitle && <Logo disableLink />}
              <form>
                <Stack gap={2}>
                  {error && <Alert severity="error" title={t(error)} />}
                  <TextField
                    label={t(I18nKeys.FIRSTNAME)}
                    variant="outlined"
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <TextField
                    label={t(I18nKeys.LASTNAME)}
                    variant="outlined"
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <TextField
                    label={t(I18nKeys.EMAIL)}
                    variant="outlined"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label={t(I18nKeys.PASSWORD)}
                    variant="outlined"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Box display={"flex"} alignItems={"center"}>
                    <LoadingButton
                      onClick={handleLoginSubmit}
                      loading={isLoading}
                      fullWidth
                      variant="contained"
                    >
                      {t(I18nKeys.SUBMIT)}
                    </LoadingButton>
                  </Box>
                </Stack>
              </form>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
