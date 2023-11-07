import { Typography, useTheme, SxProps, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import IconAvatar from "src/components/IconAvatar";
import PageHeaderWrapper from "src/components/PageHeader/PageHeaderWrapper";
import Avatar from "src/components/Avatar";

export type PageHeaderProps = {
  icon?: JSX.Element;
  src?: string;
  alt?: string;
  primaryTitle: string;
  secondaryTitle?: string;
  addons?: JSX.Element;
  sx?: SxProps;
};

export default function PageHeader(props: PageHeaderProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <PageHeaderWrapper sx={props.sx ?? {}}>
      <Box
        display="flex"
        alignItems={{ xs: "stretch", md: "center" }}
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          {props.icon ? (
            <IconAvatar variant="rounded">{props.icon}</IconAvatar>
          ) : (
            <Avatar
              sx={{
                mr: 2,
                width: theme.spacing(8),
                height: theme.spacing(8),
              }}
              alt={props.alt}
              src={props.src}
            />
          )}
          <Box>
            <Typography variant="h2" component="h2" gutterBottom>
              {t(props.primaryTitle)}
            </Typography>
            {props.secondaryTitle && (
              <Typography variant="subtitle2">
                {t(props.secondaryTitle)}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ mt: { xs: 2, lg: 0 } }}>{props.addons}</Box>
      </Box>
    </PageHeaderWrapper>
  );
}
