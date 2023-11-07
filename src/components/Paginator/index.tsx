import { Pagination, Box } from "@mui/material";

type PaginatorProps = {
  page: number;
  dataCount: number;
  rowsPerPage: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
};

export default function Paginator(props: PaginatorProps) {
  const count =
    props.rowsPerPage !== 0 ? Math.ceil(props.dataCount / props.rowsPerPage) : 0;

  if (!count || props.isLoading) return <></>;

  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      m={2}
    >
      <Pagination
        page={props.page}
        count={count}
        color="primary"
        onChange={(_, page) => props.onPageChange(page)}
      />
    </Box>
  );
}
