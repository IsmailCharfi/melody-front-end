import {
  Box,
  Link,
  Avatar,
  CardMedia,
  Typography,
  Button,
  styled,
  useTheme,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import Event from "src/model/Event";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import { useDispatch, useSelector } from "src/store";
import { openLoginModal, setUser } from "src/slices/app";
import useHttp from "src/hooks/useHttp";
import EventService from "src/services/EventService";
import useToast from "src/hooks/useToast";
import { User } from "src/model/User";
import { useNavigate } from "react-router-dom";
import { TICKETS_PATH } from "src/router/routes";
import dayjs from "dayjs";
import { DateTimeFormat } from "src/misc/enums/DateTimeFormat";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import MicExternalOnTwoToneIcon from "@mui/icons-material/MicExternalOnTwoTone";

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
    z-index: 7;
    display: flex;
  `
);

const LabelWrapper = styled(Box)(
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

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        width: ${theme.spacing(10)};
        height: ${theme.spacing(10)};
        box-shadow: ${theme.colors.shadows.primary};
        top: -${theme.spacing(5)};
        position: absolute;
        border: ${theme.colors.alpha.white[100]} solid 3px;
  `
);

type EventDetailsProps = {
  event: Event;
};

export default function EventDetails(props: EventDetailsProps) {
  const { user } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [sendRequest] = useHttp();
  const { t } = useTranslation();
  const theme = useTheme();
  const toaster = useToast();
  const navigate = useNavigate();

  const handleBookTicket = async () => {
    if (!user) {
      dispatch(openLoginModal());
      return;
    }
    const response = await sendRequest(() =>
      EventService.bookTicket(props.event, user)
    );
    toaster.displayApiResponse(response);

    if (response.isOk) {
      const updatedUser = new User({
        ...user,
        tickets: [...user.tickets, response.data],
      });
      dispatch(setUser(updatedUser));
      navigate(TICKETS_PATH);
    }
  };

  if (!props.event) {
    return <></>;
  }

  return (
    <>
      <Box sx={{ position: "relative", maxWidth: "30rem" }}>
        <CardMedia
          component="img"
          height="250"
          image={props.event.image}
          crossOrigin="anonymous"
        />
        <CardActions
          sx={{
            bottom: "auto",
            top: `${theme.spacing(2)}`,
            right: "auto",
            left: `${theme.spacing(2)}`,
          }}
        >
          <LabelWrapper
            sx={{
              background: `${theme.colors.gradients.blue1}`,
              color: `${theme.colors.alpha.trueWhite[100]}`,
            }}
          >
            {props.event.category}
          </LabelWrapper>
        </CardActions>
      </Box>
      <Box
        sx={{
          position: "relative",
          px: 3,
          pt: 8,
          pb: 3,
        }}
      >
        <AvatarWrapper
          variant="rounded"
          sx={{
            boxShadow: "none",
            borderWidth: 5,
          }}
          imgProps={{
            crossOrigin: "anonymous",
          }}
          src={props.event.artistImage}
        />
        <Link
          lineHeight={1.5}
          href="#"
          sx={{
            transition: `${theme.transitions.create(["color"])}`,
            color: `${theme.colors.alpha.black[100]}`,

            "&:hover": {
              color: `${theme.colors.primary.main}`,
            },
          }}
          color="text.primary"
          variant="h3"
          underline="none"
        >
          {props.event.name}
        </Link>
        <Typography
          variant="subtitle1"
          sx={{
            display: "flex",
            alignItems: "center",
            pt: 1,
          }}
        >
          <AccessTimeTwoToneIcon
            fontSize="small"
            sx={{
              opacity: 0.7,
              mr: 0.5,
            }}
          />
          {dayjs(props.event.date).format(
            DateTimeFormat.DISPLAY_DATE_TIME_FORMAT
          )}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            display: "flex",
            alignItems: "center",
            pt: 1,
          }}
        >
          <PersonOutlineTwoToneIcon
            fontSize="small"
            sx={{
              opacity: 0.7,
              mr: 0.5,
            }}
          />
          {`${props.event.capacity} ${t(I18nKeys.PLACES_LEFT)}`}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            display: "flex",
            alignItems: "center",
            pt: 1,
          }}
        >
          <MicExternalOnTwoToneIcon
            fontSize="small"
            sx={{
              opacity: 0.7,
              mr: 0.5,
            }}
          />
          {props.event.artist}
        </Typography>
        <Box sx={{ mx: 1, width: "20rem" }}>
          <Typography
            variant="subtitle2"
            sx={{
              py: 2,
              wordBreak: "break-all",
            }}
          >
            {props.event.description}
          </Typography>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          mt={"2rem"}
        >
          <Button
            onClick={handleBookTicket}
            variant="outlined"
            endIcon={<ArrowForwardTwoToneIcon />}
            sx={{
              borderWidth: "2px",
              "&:hover": {
                borderWidth: "2px",
              },
            }}
          >
            {t(I18nKeys.BOOK)}
          </Button>
        </Box>
      </Box>
    </>
  );
}
