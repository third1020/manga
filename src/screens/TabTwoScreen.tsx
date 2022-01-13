import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
} from "react-native";
import Icon from "../components/Icon";
import { Button } from "native-base";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import { useTheme } from "@react-navigation/native";
import { LoginContext } from "../Context/LoginContext";
import { ThemeContext } from "../Context/ThemeContext";
import { getDataUser, removeDataUser } from "../../store_data";
import ButtonToggleGroup from "react-native-button-toggle-group";
import { useColorScheme, StatusBar } from "react-native";

const AccountScreen = () => {
  const colorScheme = useColorScheme();
  const [login, setlogin] = React.useContext(LoginContext);
  const [user, setuser] = React.useState({});
  const [theme, settheme] = React.useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  const [value, setValue] = React.useState(theme);

  function ChageTheme(toChage) {
    switch (toChage) {
      case "system":
        setValue(toChage);
        settheme(colorScheme);
        break;
      case "dark":
        setValue(toChage);
        settheme(toChage);
        break;
      case "light":
        setValue(toChage);
        settheme(toChage);
        break;

      default:
        break;
    }
  }
  const menuItems = [
    {
      title: "Theme (coming soon)",
      icon: {
        name: "format-list-bulleted",
        backgroundColor: colors.primary,
      },
    },
    {
      title: "Support Contect (coming soon)",
      icon: {
        name: "email",
        backgroundColor: colors.secondary,
      },
    },
  ];

  const styles = StyleSheet.create({
    container: {
      marginVertical: 20,
    },
    screen: {
      backgroundColor: colors.background,
    },
    bottonViewcontainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    buttonContainer: { fontWeight: "bold" },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      width: 300,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
  });

  React.useEffect(async () => {
    const data = await getDataUser();
    setuser(data);
    // console.log(data);
  }, []);
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.username}
          subTitle={user.email}
          // image={user.image }
          image={require("../../assets/user_icon.png")}
        />
      </View>
      <View style={styles.container}>
        <ListItem
          rightItem={
            <View style={styles.bottonViewcontainer}>
              <View style={styles.buttonContainer}>
                <Button
                  colorScheme={"blue"}
                  size="xs"
                  variant={value === "system" ? "solid" : "outline"}
                  onPress={() => ChageTheme("system")}
                >
                  System
                </Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  colorScheme={"blue"}
                  size="xs"
                  variant={value === "dark" ? "solid" : "outline"}
                  onPress={() => ChageTheme("dark")}
                >
                  Dark
                </Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  colorScheme={"blue"}
                  size="xs"
                  variant={value === "light" ? "solid" : "outline"}
                  onPress={() => ChageTheme("light")}
                >
                  Light
                </Button>
              </View>
            </View>
          }
          title={"Theme"}
          IconComponent={
            <Icon
              name="format-list-bulleted"
              backgroundColor={colors.primary}
            />
          }
        />
        <ListItem
          onPress={() => setModalVisible(true)}
          title="Support Contect "
          IconComponent={<Icon name="email" backgroundColor={colors.primary} />}
        />

        <View style={styles.container}>
          <ListItem
            title="Log Out"
            onPress={async () => {
              removeDataUser();
              setlogin(false);
            }}
            IconComponent={
              <Icon name="logout" backgroundColor={colors.primary} />
            }
          />
        </View>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Support</Text>
            <Text>ข้อมูลการติดต่อ</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

export default AccountScreen;
