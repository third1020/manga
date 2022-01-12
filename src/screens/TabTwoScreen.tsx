import React from "react";
import { FlatList, StyleSheet, View, Button  } from "react-native";
import Icon from "../components/Icon";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { LoginContext } from "../Context/LoginContext";
import { getDataUser, removeDataUser } from "../../store_data";

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

const AccountScreen = () => {
  const [login, setlogin] = React.useContext(LoginContext);
  const [user, setuser] = React.useState({});

  React.useEffect(async () => {
    const data = await getDataUser();
    setuser(data)
    // console.log(data);
  }, []);
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.username}
          subTitle={user.email}
          // image={user.image}
          image={require("../../assets/user.jpg")}

        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>

      <ListItem
        title="Log Out"
        onPress={async () => {
          removeDataUser();
          setlogin(false);
        }}
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
      />
    </Screen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
