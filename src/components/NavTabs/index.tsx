import { Box, Tab, Tabs, styled } from "@mui/material";
import { useState } from "react";
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

type NavTabsProps = {
  tabs: string[];
  onChange: (tab: string) => void;
};

export default function NavTabs(props: NavTabsProps) {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<string>(
    props.tabs.length ? props.tabs[0] : null
  );

  if (!selectedTab) {
    return <></>;
  }

  const onChange = (tab: string) => {
    setSelectedTab(tab);
    props.onChange(tab);
  };

  return (
    <Box sx={{ m: 1 }}>
      <TabsWrapper
        onChange={(_, tab) => onChange(tab)}
        value={selectedTab}
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="secondary"
        variant="scrollable"
      >
        {props.tabs.map((tab: string, index: number) => (
          <Tab key={index} value={tab} label={t(tab)} />
        ))}
      </TabsWrapper>
    </Box>
  );
}
