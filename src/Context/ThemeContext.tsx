import React, { useRef, useState, useEffect, createContext } from "react";
import { useColorScheme, StatusBar } from "react-native";
import Colors from "../constants/Colors";
export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {props.children}
      <StatusBar
        backgroundColor={
          theme == "light" ? Colors.light.background : Colors.dark.background
        }
        barStyle={theme == "light" ? "dark-content" : "light-content"}
      />
    </ThemeContext.Provider>
  );
};
