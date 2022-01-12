import React, { useRef, useState } from "react";
import { StyleSheet, AppState, Button } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";

import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { getData, storeData } from "../store_data";
import { ThemeContext } from "../Context/ThemeContext";
import Home from "./Home";
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  View,
  Text,
  Pressable,
  Image,

} from "native-base";
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {

    const [theme, setTheme] = React.useContext(ThemeContext);

  return (
    <View flex="1" >
     <Home/>
    </View>
  );
}
