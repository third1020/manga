import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors, FontsList } from "../theme/styles";
import { MainStackScreenProps } from "../navigation/MainStack";
import PosterImg from "../components/PosterImg";
import { useBook } from "../hooks/useBook";
import BookDetails from "../components/BookDetails";
import RenderPdf from "../components/RenderPdf";
import { imgsAlsoLike } from "../api/books";
import { useNavigation } from "@react-navigation/native";
interface Props extends MainStackScreenProps<"BookDetails"> {}

const ModalReadingBook = ({ route }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar />

      <RenderPdf pdf={route.params.fullFile} />
      <View style={styles.imgContainer}></View>

      {/* <Text style={{color: 'white'}}>
        {' '}
        {JSON.stringify({book, route}, null, 5)}{' '}
      </Text> */}
    </View>
  );
};

export default ModalReadingBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    // paddingBottom: 30,
  },

  imgContainer: {
    alignItems: "center",
  },
  previewContainer: {
    flexDirection: "row",
    marginHorizontal: 35,
    width: 300,
    height: 48,
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
  },
  btnPricePreview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  priceBtn: {},
  previewBtn: {
    backgroundColor: "#EF8262",
  },
  priceText: {
    fontFamily: FontsList.MontserratExtraBold,
    fontSize: 18,
    color: "black",
  },
  previewText: {
    fontFamily: FontsList.GilroyExtraBold,
    fontSize: 16,
    lineHeight: 16,
    color: "white",
  },
  couldLikeText: {
    fontFamily: FontsList.MontserratSemiBold,
    color: "white",
    fontSize: 14,
    marginLeft: 30,
    marginTop: 40,
    marginBottom: 20,
  },
  listContainer: { marginLeft: 30 },
  separator: { marginRight: 10 },
});
