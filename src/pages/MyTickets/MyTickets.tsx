import { Box, Grid, Stack } from "@mui/material";
import PageHeader from "src/components/PageHeader";
import PageWrapper from "src/components/PageWrapper";
import Title from "src/components/Title";
import ConfirmationNumberTwoToneIcon from "@mui/icons-material/ConfirmationNumberTwoTone";
import { useSelector } from "src/store";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import { useTranslation } from "react-i18next";
import TicketCard from "./TicketCard";

export default function MyTickets() {
  const { user } = useSelector((state) => state.app);
  const { t } = useTranslation();

  return (
    <>
      <Title title={t(I18nKeys.MY_TICKETS)} />

      <Stack gap={2}>
        <PageHeader
          primaryTitle={t(I18nKeys.MY_TICKETS)}
          icon={<ConfirmationNumberTwoToneIcon fontSize="large" />}
        />

        <PageWrapper>
          <Grid container gap={1} width={"100%"}>
            {user.tickets?.length ? (
              user.tickets.map((ticket) => (
                <Grid item key={Math.random()} xs={12} md={5.5} lg={2.9}>
                  <TicketCard ticket={ticket} />
                </Grid>
              ))
            ) : (
              <Box
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {t(I18nKeys.EMPTY)}
              </Box>
            )}
          </Grid>
        </PageWrapper>
      </Stack>
    </>
  );
}
