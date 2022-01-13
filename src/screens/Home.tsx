import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-snap-carousel";
import * as FileSystem from "expo-file-system";
import { Colors, globalStyles, FontsList } from "../theme/styles";
import PosterImg from "../components/PosterImg";
import { imgsPreview, booksList } from "../api/books";
import { useGetBooks } from "../hooks/useGetBooks";
import BookCard from "../components/BookCard";
import { MainStackScreenProps } from "../navigation/MainStack";
import { getDataUser } from "../../store_data";
import ManageBookDetail from "../components/ManageBookDetail";
import { useTheme } from "@react-navigation/native";

const width = Dimensions.get("window").width - 20;

interface Props extends MainStackScreenProps<"Home"> {}
const Home = ({ navigation, view }: Props) => {
  const user = getDataUser();
  const allbooks = useGetBooks(user);
  const [books, setbooks] = useState([]);
  const [downloaded, setdownloaded] = useState(false);
  const { colors } = useTheme();

  async function filterDownloaded(arrayBook) {
    let array = [];
    for (item of arrayBook) {
      let lastIndex = item?.fullFile.lastIndexOf("/");

      let fileName = item?.fullFile.substring(lastIndex);
      let res = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + fileName
      );

      if (res.size) {
        array.push(item);
        console.log(item);
      }
    }

    // const downloadedBooks = arrayBook.map(async (item) => {
    //   let lastIndex = item.fullFile.lastIndexOf("/");
    //
    //   let fileName = item.fullFile.substring(lastIndex);
    //   let res = await FileSystem.getInfoAsync(
    //     FileSystem.documentDirectory + fileName
    //   );
    //   if (res.size) {
    //     array.push(item);
    //   }
    // });
    console.log(array);

    return array;
  }

  useEffect(async () => {
    if (downloaded) {
      // console.log(filterDownloaded(allbooks));
      setbooks(await filterDownloaded(allbooks));
    } else {
      setbooks(allbooks);
    }
  }, [allbooks, downloaded]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bgColor,
      paddingTop: 20,
      paddingBottom: 5,
    },
    rowHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 40,
    },
    logoText: {
      color: colors.text,
      fontSize: 20,
      fontFamily: FontsList.GTSectraFine,
    },
    carouselContainer: {
      marginBottom: 50,
    },
    booksSectionText: {
      fontSize: 18,
      fontFamily: FontsList.MontserratSemiBold,
      color: colors.text,
      marginBottom: 25,
    },
    separator: {
      marginBottom: 20,
    },
    fixToText: {
      paddingTop: 20,
      backgroundColor: colors.background,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    submit: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 15,
      paddingRight: 15,

      borderRadius: 25,
      borderWidth: 1,
    },
    submitText: {
      color: colors.text,
      fontWeight: "bold",
    },
    rowPrice: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    bookDetail: {
      padding: 10,
      paddingVertical: 6,
    },
  });

  return (
    <>
      <View style={[globalStyles.globalMargin, styles.fixToText]}>
        <TouchableHighlight
          style={[
            styles.submit,
            { backgroundColor: downloaded ? colors.primary : "grey" },
          ]}
          onPress={() => setdownloaded(!downloaded)}
          underlayColor="#fff"
        >
          <Text style={[styles.submitText]}>Downloaded</Text>
        </TouchableHighlight>
      </View>

      <View style={[globalStyles.globalMargin, styles.container]}>
        <View style={styles.carouselContainer}>
          {view === "vertical" && (
            <FlatList
              data={books}
              keyExtractor={(item) => item.bookId}
              renderItem={({ item }) => (
                <BookCard
                  onPress={() =>
                    navigation.navigate("Modal", { fullFile: item.fullFile })
                  }
                  book={item}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              scrollEnabled
              showsVerticalScrollIndicator={false}
            />
          )}

          {view === "horizontal" && (
            <FlatList
              data={books}
              numColumns={3}
              renderItem={({ item }) => {
                return (
                  <>
                    <View style={styles.bookDetail}>
                      <PosterImg
                        imgURL={item.bookCover}
                        width={width / 3 - 20}
                        height={(width / 3) * 1.53}
                        onPress={() => {
                          navigation.navigate("Modal", {
                            fullFile: item.fullFile,
                          });

                          // navigation.navigate("ReadingBook", {
                          //   bookId: item.bookId,
                          // });
                        }}
                      />
                      <View
                        style={[styles.rowPrice, { width: width / 3 - 20 }]}
                      >
                        <ManageBookDetail book={item} />
                      </View>
                    </View>
                  </>
                );
              }}
              width={width}
              activeSlideAlignment={"start"}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default Home;
