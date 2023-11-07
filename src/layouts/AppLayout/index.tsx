import { Box, alpha, Card, Container, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useSelector } from 'src/store';

const MainWrapper = styled(Box)(
  ({ theme }) => `
  padding: ${theme.spacing(0, 0, 4)};

  .MuiDrawer-fm .MuiPaper-root {
    top: 0;
    height: 100%;
  }

  .Mui-FixedWrapper .MuiPaper-root {
    top: 0;
    left: 0;
  }
  .MuiDrawer-hd .MuiPaper-root {
    top: 0;
    height: 100%;
  }

  .footer-wrapper {
    box-shadow: 0px 0px 2px ${theme.colors.alpha.black[30]};
}
`
);

const MainContent = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(-45)};
        position: relative;
        z-index: 55;
`
);

const CardWrapper = styled(Card)(
  ({ theme }) => `
        min-height: 100vh;
        backdrop-filter: blur(5px);
        border-radius: ${theme.general.borderRadiusXl};
        background: ${alpha(theme.colors.alpha.white[100], 0.9)};
`
);

export default function TopNavigationLayout() {
  const { isLoaderOn } = useSelector((state) => state.app);

  return (
    <>
      <MainWrapper>
        <TopBar />
        <MainContent maxWidth="xl">
          <Box mx={4}>
            <CardWrapper>
              <Box visibility={isLoaderOn ? 'hidden' : 'visible'}>
                <Outlet />
              </Box>
              {isLoaderOn && <SuspenseLoader />}
            </CardWrapper>
          </Box>
          <Sidebar />
        </MainContent>
      </MainWrapper>
    </>
  );
}
