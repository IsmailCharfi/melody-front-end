import { Box, Typography, Button, styled, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import Logo from "src/components/Logo";
import Title from "src/components/Title";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import { RouteParts } from "src/router/routes";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Title title={t(I18nKeys.NOT_FOUND)} />

      <Box display={"flex"} justifyContent={"center"} marginTop={2}>
        <Logo disableLink full />
      </Box>
      <MainContent>
        <Stack display="flex" justifyContent="center" alignItems="center">
          <Box textAlign="center">
            <img
              alt={t(I18nKeys.NOT_FOUND)}
              height={180}
              src="/images/status/404.svg"
              draggable={false}
            />
            <Typography
              variant="h2"
              sx={{
                my: 2,
              }}
            >
              {t(I18nKeys.NOT_FOUND)}
            </Typography>
          </Box>
          <Button href={RouteParts.ROOT} variant="outlined">
            {t(I18nKeys.GO_BACK)}
          </Button>
        </Stack>
      </MainContent>
    </>
  );
}
