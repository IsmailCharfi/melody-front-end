import React, { ReactNode, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "./base";
import { StylesProvider } from "@mui/styles";

const ThemeContext = React.createContext((themeName: string): void => {});

type ThemeProviderWrapperProps = {
  children: ReactNode;
};

export default function ThemeProviderWrapper(props: ThemeProviderWrapperProps) {
  const curThemeName = "MelodyMainTheme";
  const [themeName, setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
}
