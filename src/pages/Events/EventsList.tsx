import { Box, Drawer, Grid, Stack } from "@mui/material";
import EventCard from "src/pages/Events/EventCard";
import PageHeader from "src/components/PageHeader";
import PageWrapper from "src/components/PageWrapper";
import Title from "src/components/Title";
import CelebrationTwoToneIcon from "@mui/icons-material/CelebrationTwoTone";
import { useSelector } from "src/store";
import { useEffect, useState } from "react";
import Paginator from "src/components/Paginator";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import { useTranslation } from "react-i18next";
import NavTabs from "src/components/NavTabs";
import EventDetails from "./EventDetails";
import Event from "src/model/Event";
import EventService from "src/services/EventService";
import useToast from "src/hooks/useToast";
import useHttp from "src/hooks/useHttp";
import LoadingSpinner from "src/components/LoadingSpinner";

export default function EventsList() {
  const ROWS_PER_PAGE = 8;
  const { user } = useSelector((state) => state.app);
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    t(I18nKeys.ALL)
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [displayedEvents, setDisplayedEvents] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState<Event>(null);
  const toaster = useToast();
  const [sendRequest, isLoading] = useHttp();
  const categories = new Set<string>([
    t(I18nKeys.ALL),
    ...events.map((e) => e.category),
  ]);
  const fetchEvents = async () => {
    const response = await sendRequest(() => EventService.getEvents());

    if (response.isOk) {
      setEvents(response.data);
    } else {
      toaster.displayApiResponse(response);
    }
  };

  const filter = () => {
    let output = [...events];

    if (selectedCategory != t(I18nKeys.ALL)) {
      output = output.filter((event) => event.category == selectedCategory);
    }

    setFilteredEvents(output);
  };

  const paginate = () => {
    const startIndex = (page - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;

    setDisplayedEvents(filteredEvents.slice(startIndex, endIndex));
  };

  useEffect(() => {
    filter();
  }, [selectedCategory, events]);

  useEffect(() => {
    paginate();
  }, [page, filteredEvents]);

  useEffect(() => {
    fetchEvents();
  }, [user]);

  return (
    <>
      <Title title={t(I18nKeys.EVENTS)} />

      <Stack gap={2}>
        <PageHeader
          primaryTitle={t(I18nKeys.EVENTS)}
          icon={<CelebrationTwoToneIcon fontSize="large" />}
        />

        <PageWrapper>
          <Stack gap={2}>
            <NavTabs
              tabs={Array.from(categories)}
              onChange={(tab) => setSelectedCategory(tab)}
            />
            <Stack gap={1}>
              <Grid container gap={1} width={"100%"}>
                {isLoading ? (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <LoadingSpinner />
                  </Box>
                ) : displayedEvents.length ? (
                  displayedEvents.map((e) => (
                    <Grid item key={Math.random()} xs={12} md={5.5} lg={2.9}>
                      <EventCard
                        event={e}
                        openDetails={() => setSelectedEvent(e)}
                      />
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

              <Paginator
                page={page}
                dataCount={filteredEvents.length}
                rowsPerPage={ROWS_PER_PAGE}
                onPageChange={(p) => setPage(p)}
              />
            </Stack>
          </Stack>
        </PageWrapper>
      </Stack>
      <Drawer
        anchor={"right"}
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      >
        <EventDetails event={selectedEvent} />
      </Drawer>
    </>
  );
}
