import { StyleSheet } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
export enum FontsList {
  "GTSectraFine" = "GTSectraFine",
  "MontserratExtraBold" = "Montserrat-ExtraBold",
  "MontserratMedium" = "Montserrat-Medium",
  "MontserratRegular" = "Montserrat-Regular",
  "MontserratSemiBold" = "Montserrat-SemiBold",
  "GilroyExtraBold" = "Gilroy-ExtraBold",
  "GilroyLight" = "Gilroy-Light",
}

export const Colors = {
  bgColor: "#100B20",
  title: "#FFFFFF",
  subTitle: "#B7B6BC",
  raitingPersons: "#87858F",
  secondary: "#FF9671",
  star: "#FFDD4F",
  raitingNumber: "",
};

const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1A1A1A",
    accent: "#FAFAFA",
  },
};

const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FAFAFA",
    accent: "#1A1A1A",
  },
};

export const globalStyles = StyleSheet.create({
  globalMargin: {
    paddingHorizontal: 20,
  },
});
