import { Grid, Stack } from "@mui/material";
import EventCard from "src/components/EventCard";
import PageHeader from "src/components/PageHeader";
import PageWrapper from "src/components/PageWrapper";
import Title from "src/components/Title";
import CelebrationTwoToneIcon from "@mui/icons-material/CelebrationTwoTone";
import { useSelector } from "src/store";
import { useEffect, useState } from "react";
import Paginator from "src/components/Paginator";

export default function EventsList() {
  const { events } = useSelector((state) => state.event);
  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 8;
  const [selectedCategory, setSelectedCategory] = useState("test");
  const [displayedEvents, setDisplayedEvents] = useState(events);

  const filterAndPaginate = (page: number, category: string) => {
    const startIndex = (page - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    setDisplayedEvents(
      events
        .filter((event) => event.name === category)
        .slice(startIndex, endIndex)
    );
  };

  useEffect(() => {
    filterAndPaginate(page, selectedCategory);
  }, [page, selectedCategory]);

  return (
    <>
      <Title title={"Liste des events"} />

      <Stack gap={2}>
        <PageHeader
          primaryTitle={"Events"}
          icon={<CelebrationTwoToneIcon fontSize="large" />}
        />

        <PageWrapper>
          <Grid container gap={1} width={"100%"}>
            {displayedEvents.map((e) => (
              <Grid item key={Math.random()} xs={12} md={5.5} lg={2.9}>
                <EventCard event={e} />
              </Grid>
            ))}
          </Grid>

          <Paginator
            page={page}
            dataCount={displayedEvents.length}
            rowsPerPage={ROWS_PER_PAGE}
            onPageChange={(p) => setPage(p)}
          />
        </PageWrapper>
      </Stack>
    </>
  );
}
