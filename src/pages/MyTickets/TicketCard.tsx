import {
  Box,
  Card,
  CardMedia,
  Tooltip,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import { Ticket } from "src/model/Ticket";
import { BgComposed } from "../Events/EventCard";
import { useTranslation } from "react-i18next";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import useHttp from "src/hooks/useHttp";
import useToast from "src/hooks/useToast";
import EventService from "src/services/EventService";
import { Client } from "src/misc/enums/Client";
import { saveAs } from "file-saver";

const IconButtonWrapper = styled(Box)(
  ({ theme }) => `
          width: ${theme.spacing(6)};
          height: ${theme.spacing(6)};
          displat: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: ${theme.transitions.create(["color", "transform"])};
          border-radius: 100px;
  
          .MuiSvgIcon-root {
              transform: scale(1);
              transition: ${theme.transitions.create(["transform"])};
          }
  
          &:hover {
              .MuiSvgIcon-root {
                  transform: scale(1.3);
              }
          }
    `
);

type TicketCardProps = {
  ticket: Ticket;
};

export default function TicketCard(props: TicketCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [sendRequest] = useHttp();
  const toaster = useToast();

  const generateWalletTicket = async (client: Client) => {
    const response = await sendRequest(() =>
      EventService.generateWalletTicket(props.ticket, client)
    );

    toaster.displayApiResponse(response);

    if (response.isOk) {
      saveAs(response.data.file);
    }
  };

  return (
    <Card
      sx={{
        textAlign: "center",
        position: "relative",
        transition: `${theme.transitions.create(["box-shadow", "transform"])}`,
        transform: "translateY(0px)",

        "&:hover": {
          transform: `translateY(-${theme.spacing(0.5)})`,
          boxShadow: `0 2rem 8rem 0 ${alpha(
            theme.colors.alpha.black[100],
            0.05
          )}, 
                0 0.6rem 1.6rem ${alpha(theme.colors.alpha.black[100], 0.15)}, 
                0 0.2rem 0.2rem ${alpha(theme.colors.alpha.black[100], 0.1)}`,

          "& .MuiBgComposed": {
            opacity: 1,
          },
        },
      }}
    >
      <BgComposed
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="MuiBgComposed"
      >
        <IconButtonWrapper
          sx={{
            mx: 0.5,
            background: `${theme.colors.primary.main}`,
            color: `${theme.palette.getContrastText(
              theme.colors.primary.main
            )}`,

            "&:hover": {
              background: `${theme.colors.primary.main}`,
              color: `${theme.palette.getContrastText(
                theme.colors.primary.main
              )}`,
            },
          }}
        >
          <Tooltip title={t(I18nKeys.ADD_TO_GOOGLE_WALLET)} arrow>
            <img
              src="/images/google-wallet.png"
              alt="Google wallet"
              style={{ width: "50px", height: "50px" }}
              onClick={() => generateWalletTicket(Client.Google)}
            />
          </Tooltip>
        </IconButtonWrapper>
        <IconButtonWrapper
          sx={{
            mx: 0.5,
            background: `${theme.colors.primary.main}`,
            color: `${theme.palette.getContrastText(
              theme.colors.primary.main
            )}`,

            "&:hover": {
              background: `${theme.colors.primary.main}`,
              color: `${theme.palette.getContrastText(
                theme.colors.primary.main
              )}`,
            },
          }}
        >
          <Tooltip title={t(I18nKeys.ADD_TO_APPLE_WALLET)} arrow>
            <img
              src="/images/apple-wallet.png"
              alt="Apple wallet"
              style={{ width: "50px", height: "50px" }}
              onClick={() => generateWalletTicket(Client.Apple)}
            />
          </Tooltip>
        </IconButtonWrapper>
      </BgComposed>
      <CardMedia
        component="img"
        height="260"
        sx={{
          borderRadius: "inherit",
          position: "relative",
          zIndex: 5,
        }}
        image={props.ticket.event.image}
      />
    </Card>
  );
}
