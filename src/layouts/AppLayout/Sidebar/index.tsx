import Scrollbar from "src/components/Scrollbar";
import { Box, Drawer, styled, useTheme } from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import Logo from "src/components/Logo";
import { useDispatch, useSelector } from "src/store";
import { closeSidebar } from "src/slices/app";

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.sidebar.textColor};
        background: ${theme.sidebar.background};
        box-shadow: ${theme.sidebar.boxShadow};
        position: relative;
        z-index: 7;
        height: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
          height: calc(100% - ${theme.header.height});
          margin-top: ${theme.header.height};
        }
`
);

const TopSection = styled(Box)(
  ({ theme }) => `
        margin: ${theme.spacing(2)};
`
);

function Sidebar() {
  const { isSidebarOpen } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={isSidebarOpen}
        onClose={() => dispatch(closeSidebar())}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper>
          <Scrollbar>
            <TopSection>
              <Logo />
            </TopSection>
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
