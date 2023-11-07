import { Box, Tab, Tabs, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

const TabsWrapper = styled(Tabs)(
  ({ theme }) => `
        @media (max-width: ${theme.breakpoints.values.md}px) {
          .MuiTabs-scrollableX {
            overflow-x: auto !important;
          }
    
          .MuiTabs-indicator {
              box-shadow: none;
          }
        }
        `
);

type NavTab = {
  id: number;
  label: string;
};

type NavTabsProps = {
  tabs: NavTab[];
  onChange: (tab: NavTab) => void;
};

export default function NavTabs(props: NavTabsProps) {
  const { t } = useTranslation();

  return (
    <Box sx={{ m: 1 }}>
      <TabsWrapper
        onChange={(_, tab) => props.onChange(tab)}
        value={props.tabs[0]}
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="secondary"
        variant="scrollable"
      >
        {props.tabs.map((tab: NavTab) => (
          <Tab key={tab.id} value={tab} label={t(tab.label)} />
        ))}
      </TabsWrapper>
    </Box>
  );
}
