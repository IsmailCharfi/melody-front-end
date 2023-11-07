import { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import {
  Button,
  Tooltip,
  Badge,
  Collapse,
  ListItem,
  styled,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import { useDispatch } from "src/store";
import { closeSidebar } from "src/slices/app";

type SidebarMenuItemProps = {
  children?: JSX.Element;
  link?: string;
  icon?: any;
  badge?: string;
  badgeTooltip?: string;
  open?: boolean;
  active?: boolean;
  name: string;
};

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.black[100],
    color: theme.palette.getContrastText(theme.colors.alpha.black[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: "bold",
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      "0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.black[100],
  },
}));

export default function SidebarMenuItem({
  children,
  link,
  icon: Icon,
  badge,
  badgeTooltip,
  open: openParent,
  active,
  name,
  ...rest
}: SidebarMenuItemProps) {
  const [menuToggle, setMenuToggle] = useState<boolean>(openParent);
  const { t }: { t: any } = useTranslation();
  const dispatch = useDispatch();
  const toggleMenu = (): void => {
    setMenuToggle((Open) => !Open);
  };

  if (children) {
    return (
      <ListItem component="div" className="Mui-children" key={name} {...rest}>
        <Button
          className={clsx({ active: menuToggle })}
          startIcon={Icon && <Icon />}
          endIcon={
            menuToggle ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />
          }
          onClick={toggleMenu}
        >
          {badgeTooltip ? (
            <TooltipWrapper title={badgeTooltip} arrow placement="right">
              {badge === "" ? (
                <Badge color="primary" variant="dot" />
              ) : (
                <Badge badgeContent={badge} />
              )}
            </TooltipWrapper>
          ) : badge === "" ? (
            <Badge color="primary" variant="dot" />
          ) : (
            <Badge badgeContent={badge} />
          )}
          {t(name)}
        </Button>
        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem component="div" key={name} {...rest}>
      <Button
        disableRipple
        component={RouterLink}
        onClick={() => dispatch(closeSidebar())}
        to={link}
        startIcon={Icon && <Icon />}
      >
        {t(name)}
        {badgeTooltip ? (
          <TooltipWrapper title={badgeTooltip} arrow placement="right">
            {badge === "" ? (
              <Badge color="primary" variant="dot" />
            ) : (
              <Badge badgeContent={badge} />
            )}
          </TooltipWrapper>
        ) : badge === "" ? (
          <Badge color="primary" variant="dot" />
        ) : (
          <Badge badgeContent={badge} />
        )}
      </Button>
    </ListItem>
  );
}
