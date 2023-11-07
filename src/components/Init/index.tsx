import { Box, styled } from "@mui/material";
import Logo from "src/components/Logo";

const AppInitContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const AppInitLogoContainer = styled(Box)(
  ({ theme }) => `
    animation: breathingAnimation 3s infinite alternate;

    @keyframes breathingAnimation {
      0% {
        transform: scale(0.9);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(0.9);
      }
    }
  `
);

function AppInit() {
  return (
    <AppInitContainer>
      <AppInitLogoContainer>
        <Logo disableLink />
      </AppInitLogoContainer>
    </AppInitContainer>
  );
}

export default AppInit;
