import React, { useState } from "react";
import { RouteProp } from "@react-navigation/core";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import ReadingBook from "../screens/ReadingBook";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import ModalReadingBook from "../screens/ModalReadingBook";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { ColorSchemeName, Pressable, Text } from "react-native";
import Colors from "../constants/Colors";
import { useTheme } from "@react-navigation/native";
type MainStackScreensList = {
  Modal: undefined;
  Home: undefined;
  BookDetails: { bookId: string };
  ReadingBook: { bookId: string };
};

// typing navigation and route objects for all MainStackScreend
export type MainStackNavigationProp<
  RouteName extends keyof MainStackScreensList = "Home"
> = StackNavigationProp<MainStackScreensList, RouteName>;

export type MainStackRouteProp<
  RouteName extends keyof MainStackScreensList = "Home"
> = RouteProp<MainStackScreensList, RouteName>;

// generic props for screens (navigation and route )
export interface MainStackScreenProps<
  RouteName extends keyof MainStackScreensList = "Home"
> {
  navigation: MainStackNavigationProp<RouteName>;
  route: MainStackRouteProp<RouteName>;
}

const MainStack = createStackNavigator<MainStackScreensList>();
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const MainStackComponent = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <MainStack.Screen name="Home" component={HomeTabs} />
      <MainStack.Screen name="BookDetails" component={BookDetailsScreen} />
      <MainStack.Screen name="ReadingBook" component={ReadingBook} />

      <MainStack.Screen name="Modal" component={ModalReadingBook} />
    </MainStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

function HomeTabs() {
  const [view, setview] = useState("vertical");
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Category"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Category"
        children={({ navigation }) => (
          <Home navigation={navigation} view={view} />
        )}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          tabBarVisible: false,

          title: "Category",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="library-outline" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                if (view === "horizontal") {
                  setview("vertical");
                }
                if (view === "vertical") {
                  setview("horizontal");
                }
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Icon
                name={view === "vertical" ? "grid" : "list-outline"}
                size={30}
                color={colors.text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={TabTwoScreen}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ellipsis-horizontal" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainStackComponent;
