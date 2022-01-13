import React from "react";
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { useTheme } from "@react-navigation/native";

import BaseText from "./BaseText";

const ListItem = ({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  rightItem,
}) => {
  const { colors } = useTheme();

  React.useEffect(() => {
    // console.log(colors);
  }, []);
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: 15,
      backgroundColor: colors.card,
    },
    detailsContainer: {
      marginLeft: 10,
      justifyContent: "center",
    },
    image: {
      height: 70,
      width: 70,
      borderRadius: 35,
    },
    title: {
      color: colors.text,
      fontWeight: "600",
    },
    subTitle: {
      color: colors.text,
    },
    rowPrice: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.card,
    },
  });
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.rowPrice}>
          <View style={styles.container}>
            {IconComponent}
            {image && <Image style={styles.image} source={image} />}
            <View style={styles.detailsContainer}>
              <BaseText style={styles.title}>{title}</BaseText>
              {subTitle && (
                <BaseText style={styles.subTitle}>{subTitle}</BaseText>
              )}
            </View>
          </View>

          <View>{rightItem}</View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

export default ListItem;
