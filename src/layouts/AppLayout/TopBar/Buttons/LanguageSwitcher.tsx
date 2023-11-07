import { useRef, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  styled,
} from "@mui/material";
import internationalization from "src/i18n";
import { useTranslation } from "react-i18next";
import { DE } from "country-flag-icons/react/3x2";
import { US } from "country-flag-icons/react/3x2";
import { FR } from "country-flag-icons/react/3x2";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import {
  Languages,
  isEnglish,
  isFrench,
  isGerman,
} from "src/misc/enums/Languages/Languages";
import { BoxButton } from "..";

const IconButtonPrimary = styled(IconButton)(
  ({ theme }) => `
      display: inline-flex;
      width: 48px;
      border-radius: ${theme.general.borderRadiusLg};
      height: 48px;
      justify-content: center;
      font-size: ${theme.typography.pxToRem(13)};
      padding: 0;
      position: relative;
  
      svg {
        width: 28px;
      }
  `
);

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language.split("-")[0];
  const switchLanguage = (lang: Languages) => {
    internationalization.changeLanguage(lang);
  };
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const German = <DE title={t(I18nKeys.GERMAN)} />;
  const English = <US title={t(I18nKeys.ENGLISH)} />;
  const French = <FR title={t(I18nKeys.FRENCH)} />;

  return (
    <BoxButton
      sx={{ width: "100%", p: 0, display: "flex", justifyContent: "center" }}
    >
      <IconButtonPrimary ref={ref} onClick={handleOpen}>
        {isGerman(lang) && German}
        {isEnglish(lang) && English}
        {isFrench(lang) && French}
      </IconButtonPrimary>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <List
          sx={{
            p: 2,
            svg: {
              width: 26,
              mr: 1,
            },
          }}
          component="nav"
        >
          <ListItem
            className={isEnglish(lang) ? "active" : ""}
            button
            onClick={() => {
              switchLanguage(Languages.en);
              handleClose();
            }}
          >
            {English}
            <ListItemText
              sx={{
                pl: 1,
              }}
              primary={t(I18nKeys.ENGLISH)}
            />
          </ListItem>
          <ListItem
            className={isGerman(lang) ? "active" : ""}
            button
            onClick={() => {
              switchLanguage(Languages.de);
              handleClose();
            }}
          >
            {German}
            <ListItemText
              sx={{
                pl: 1,
              }}
              primary={t(I18nKeys.GERMAN)}
            />
          </ListItem>
          <ListItem
            className={isFrench(lang) ? "active" : ""}
            button
            onClick={() => {
              switchLanguage(Languages.fr);
              handleClose();
            }}
          >
            {French}
            <ListItemText
              sx={{
                pl: 1,
              }}
              primary={t(I18nKeys.FRENCH)}
            />
          </ListItem>
        </List>
      </Popover>
    </BoxButton>
  );
}
