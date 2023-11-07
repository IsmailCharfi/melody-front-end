import {
  Box,
  Card,
  IconButton,
  Container,
  Divider,
  alpha,
  styled,
  Stack,
  useTheme,
} from "@mui/material";
import NavigationMenu from "./NavigationMenu";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import Logo from "src/components/Logo";
import { useDispatch, useSelector } from "src/store";
import { openSidebar } from "src/slices/app";
import UserBox from "./Buttons/UserBox";
import LoginButton from "./Buttons/LoginButton";
import LanguageSwitcher from "./Buttons/LanguageSwitcher";

const TopBarWrapper = styled(Card)(
  ({ theme }) => `
    background: ${theme.header.textColor};
    backdrop-filter: blur(5px);
    margin: ${theme.spacing(0, 0, 5)};
    padding: ${theme.spacing(2, 3, 44)};

    display: flex;
    align-items: center;
    border-radius: 0;
    border-bottom-right-radius: 40px;
    border-bottom-left-radius: 40px;
    position: relative;
`
);

const TopBarImage = styled(Box)(
  () => `
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .7;
`
);

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
    background: ${theme.colors.alpha.trueWhite[10]};
`
);

const IconButtonPrimary = styled(IconButton)(
  ({ theme }) => `
    display: flex;
    width: 48px;
    margin-left: ${theme.spacing(2)};
    border-radius: ${theme.general.borderRadiusLg};
    height: 48px;
    justify-content: center;
    font-size: ${theme.typography.pxToRem(13)};
    padding: 0;
    position: relative;
    color: ${theme.colors.alpha.trueWhite[50]};
    background-color: ${theme.colors.alpha.white[10]};

    .MuiSvgIcon-root {
      transition: ${theme.transitions.create(["color"])};
      font-size: ${theme.typography.pxToRem(26)};
      color: ${theme.colors.alpha.trueWhite[50]};
    }

    &.active,
    &:hover {
      background-color: ${alpha(theme.colors.alpha.white[30], 0.2)};

      .MuiSvgIcon-root {
        color: ${theme.colors.alpha.trueWhite[100]};
      }
    }
`
);

export const BoxButton = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(0, 1)};
    cursor: pointer;
    display: flex;
    align-items: center;
    color: ${theme.colors.alpha.trueWhite[50]};
    background-color: ${theme.colors.alpha.white[10]};
    height: 48px;
    border-radius: ${theme.general.borderRadiusLg};

    .MuiSvgIcon-root {
      font-size: ${theme.typography.pxToRem(24)};
      color: ${theme.colors.alpha.trueWhite[50]};
    }

    .MuiAvatar-root {
      border-radius: ${theme.general.borderRadiusLg};
      width: 34px;
      height: 34px;
    }

    &.active,
    &:hover {
      background-color: ${alpha(theme.colors.alpha.white[30], 0.2)};
      color: ${theme.colors.alpha.trueWhite[100]};
      
      .MuiSvgIcon-root {
        color: ${theme.colors.alpha.trueWhite[100]};
      }
    }

    .MuiButton-label {
      justify-content: flex-start;
    }
`
);

function TopBar() {
  const { isSidebarOpen, user } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const theme = useTheme();
  const TOPBAR_BACKGROUND_IMAGE = "/images/cover.jpg";

  return (
    <TopBarWrapper>
      <TopBarImage
        sx={{
          opacity: 0.3,
          background: `${theme.colors.gradients.black1}`,
        }}
      />
      <TopBarImage
        sx={{
          opacity: 0.1,
          background: `${theme.colors.gradients.blue5}`,
        }}
      />
      <TopBarImage
        sx={{
          opacity: 0.15,
          backgroundImage: `url("${TOPBAR_BACKGROUND_IMAGE}")`,
        }}
      />
      <Container sx={{ zIndex: 6 }} maxWidth="xl">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <Logo full/>
          </Box>
          <Stack direction={"row"} gap={1}>
            <LanguageSwitcher />
            {user ? <UserBox /> : <LoginButton />}
            {user && (
              <Box
                component="span"
                sx={{
                  display: { md: "none", xs: "inline-flex" },
                }}
              >
                <IconButtonPrimary
                  color="primary"
                  onClick={() => dispatch(openSidebar())}
                >
                  {!isSidebarOpen ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
                </IconButtonPrimary>
              </Box>
            )}
          </Stack>
        </Box>
        {user && (
          <>
            <DividerWrapper
              sx={{
                display: { xs: "none", md: "flex" },
                my: 1,
              }}
            />
            <Box
              display="flex"
              alignItems="center"
              sx={{
                width: "100%",
                display: { xs: "none", md: "inline-block" },
              }}
            >
              <NavigationMenu />
            </Box>
          </>
        )}
      </Container>
    </TopBarWrapper>
  );
}

export default TopBar;
