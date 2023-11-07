import { Box } from "@mui/system";
import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { I18nKeys } from "src/i18n/translations/I18nKeys";

type Props = {
  containerStyle?: CSSProperties;
  disableLink?: boolean;
  imgStyle?: CSSProperties;
  full?: boolean;
};

function Logo({ disableLink, containerStyle, imgStyle, full }: Props) {
  const { t } = useTranslation();
  const logoPath = "/images/logo.png";
  const fullLogoPath = "/images/full.png";

  return (
    <Box
      component={disableLink ? Box : Link}
      to="/"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        ...(containerStyle ?? {}),
      }}
    >
      <img
        src={full ? fullLogoPath : logoPath}
        alt={t(I18nKeys.APP_NAME)}
        style={{
          width: full ? "200px" : "80px",
          ...(imgStyle ?? {}),
        }}
      />
    </Box>
  );
}

export default Logo;
