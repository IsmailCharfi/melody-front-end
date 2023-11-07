import { Box, styled, SxProps } from "@mui/material";

const Page = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  paddingTop: theme.spacing(0),
}));

type PageWrapperProps = {
  children?: JSX.Element | JSX.Element[];
  sx?: SxProps;
};

export default function PageWrapper({ children, sx }: PageWrapperProps) {
  return <Page sx={sx ?? {}}>{children}</Page>;
}
