import { Box, styled, SxProps } from "@mui/material";

const PageHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(2),
}));

type PageHeaderWrapperProps = {
  children?: JSX.Element;
  sx?: SxProps;
};

export default function PageHeaderWrapper({
  children,
  sx,
}: PageHeaderWrapperProps) {
  return (
    <PageHeader
      className="MuiPageTitle-wrapper"
      sx={sx ?? {}}
      style={{ margin: 0 }}
    >
      {children}
    </PageHeader>
  );
}
