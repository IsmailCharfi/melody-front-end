import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Popover,
  styled,
  Typography,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import { BoxButton } from "..";
import { useDispatch, useSelector } from "src/store";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import {
  closeLoginModal,
  closeRegisterModal,
  setIsInitialized,
  setToken,
  setUser,
} from "src/slices/app";
import Avatar from "src/components/Avatar";

const MenuUserBox = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.palette.secondary.main};
    display: block;
`
);

const UserBoxLabelMain = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    display: block;
    color: ${theme.colors.alpha.trueWhite[100]};
`
);

export default function Userbox() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    handleClose();
    dispatch(setIsInitialized(false));
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(closeLoginModal());
    dispatch(closeRegisterModal());
    navigate("/");
    dispatch(setIsInitialized(true));
  };

  return (
    <>
      <BoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Stack
          direction="row"
          gap={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Avatar alt={user.getFullName()} />
          <UserBoxLabelMain
            variant="body1"
            sx={{ width: "100%", display: { xs: "none", md: "inline-block" } }}
          >
            {user.getFullName()}
          </UserBoxLabelMain>
          <UnfoldMoreTwoToneIcon
            fontSize="small"
            sx={{
              ml: 1,
            }}
          />
        </Stack>
      </BoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210,
          }}
          display="flex"
          alignItems={"center"}
        >
          <Avatar alt={user.getFullName()} />
          <UserBoxLabel variant="body1" sx={{ ml: 1 }}>
            {user.getFullName()}
          </UserBoxLabel>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0,
          }}
        />
        <List
          sx={{
            p: 1,
          }}
          component="nav"
        >
          <ListItem button>
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary={t("Profile")} />
          </ListItem>
        </List>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1,
              }}
            />
            {t(I18nKeys.LOGOUT)}
          </Button>
        </Box>
      </Popover>
    </>
  );
}
