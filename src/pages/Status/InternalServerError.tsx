import { Box, Typography, styled, Stack, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import Title from "src/components/Title";
import Logo from "src/components/Logo";

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

export default function InternalServerError() {
  const { t } = useTranslation();

  function handleReload() {
    window.location.reload();
  }

  return (
    <>
      <Title title={t(I18nKeys.SERVER_ERROR)} />

      <Box display={"flex"} justifyContent={"center"} marginTop={2}>
        <Logo disableLink full/>
      </Box>
      <MainContent>
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="-5rem"
        >
          <Box textAlign="center">
            <img
              alt={t(I18nKeys.SERVER_ERROR)}
              height={260}
              src="/images/status/500.svg"
            />
            <Typography
              variant="h2"
              sx={{
                my: 2,
              }}
            >
              {t(I18nKeys.SERVER_ERROR)}
            </Typography>
          </Box>
          <Button
            onClick={handleReload}
            variant="outlined"
            color="primary"
            startIcon={<RefreshTwoToneIcon />}
          >
            {t(I18nKeys.RELOAD)}
          </Button>
        </Stack>
      </MainContent>
    </>
  );
}
