import {
  alpha,
  Box,
  Card,
  Avatar,
  darken,
  CardMedia,
  Typography,
  Button,
  styled,
  useTheme,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import Event from "src/model/Event";
import { I18nKeys } from "src/i18n/translations/I18nKeys";

const CardContainer = styled(Card)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  transition: `${theme.transitions.create(["box-shadow", "transform"])}`,
  transform: "translateY(0px)",

  "&:hover": {
    transform: `translateY(-${theme.spacing(0.5)})`,
    boxShadow: `0 2rem 8rem 0 ${alpha(theme.colors.alpha.black[100], 0.05)}, 
                  0 0.6rem 1.6rem ${alpha(
                    theme.colors.alpha.black[100],
                    0.15
                  )}, 
                  0 0.2rem 0.2rem ${alpha(theme.colors.alpha.black[100], 0.1)}`,

    "& .MuiBgComposed": {
      opacity: 1,
    },
  },
}));

const CardActions = styled(Box)(
  ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      bottom: ${theme.spacing(2)};
      z-index: 7;
    `
);

const Label = styled(Box)(
  ({ theme }) => `
      background: ${theme.palette.success.main};
      color: ${theme.palette.success.contrastText};
      text-transform: uppercase;
      font-size: ${theme.typography.pxToRem(10)};
      font-weight: bold;
      line-height: 23px;
      height: 22px;
      padding: ${theme.spacing(0, 1.2)};
      border-radius: 50px;
    `
);

export const BgComposed = styled(Box)(
  ({ theme }) => `
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      transition: ${theme.transitions.create(["opacity"])};
      background: ${darken(alpha(theme.colors.primary.main, 0.9), 0.8)};
      z-index: 6;
      opacity: 0;
      box-shadow: inset 0 0 2.3rem 0.5rem ${darken(
        theme.colors.primary.main,
        0.9
      )};
    `
);

type EventCardProps = {
  event: Event;
  openDetails: () => void;
};

export default function EventCard(props: EventCardProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CardContainer>
      <BgComposed
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className="MuiBgComposed"
      >
        <Avatar
          sx={{
            width: 62,
            height: 62,
            mb: 1,
            border: `${theme.colors.alpha.trueWhite[100]} solid 3px`,
          }}
          imgProps={{
            crossOrigin: "anonymous",
          }}
          src={props.event.artistImage}
        />
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: `${theme.colors.alpha.trueWhite[100]}`,
          }}
        >
          {props.event.artist}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            color: `${theme.colors.alpha.trueWhite[70]}`,
          }}
        >
          {props.event.name}
        </Typography>
        <Button
          onClick={() => props.openDetails()}
          sx={{
            px: 2.5,
            borderRadius: 10,
            transform: "scale(1)",
            transition: `${theme.transitions.create(["all"])}`,
            boxShadow: `${theme.colors.shadows.info}`,

            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: `${theme.colors.shadows.info}`,
            },
            "&:active": {
              boxShadow: "none",
            },
          }}
          variant="contained"
          color="info"
        >
          {t(I18nKeys.SHOW_DETAILS)}
        </Button>
      </BgComposed>
      <CardMedia
        component="img"
        height="260"
        sx={{
          borderRadius: "inherit",
          position: "relative",
          zIndex: 5,
        }}
        crossOrigin="anonymous"
        image={props.event.image}
      />
      <CardActions
        sx={{
          bottom: "auto",
          top: `${theme.spacing(2)}`,
          right: "auto",
          left: `${theme.spacing(2)}`,
        }}
      >
        <Label
          sx={{
            background: `${theme.palette.info.main}`,
            color: `${theme.palette.info.contrastText}`,
          }}
        >
          {props.event.category}
        </Label>
      </CardActions>
    </CardContainer>
  );
}
