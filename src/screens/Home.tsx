import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-snap-carousel";

import { Colors, globalStyles, FontsList } from "../theme/styles";
import PosterImg from "../components/PosterImg";
import { imgsPreview, booksList } from "../api/books";
import { useGetBooks } from "../hooks/useGetBooks";
import BookCard from "../components/BookCard";
import { MainStackScreenProps } from "../navigation/MainStack";
import { getDataUser } from "../../store_data";
const width = Dimensions.get("window").width - 20;

interface Props extends MainStackScreenProps<"Home"> {}
const Home = ({ navigation, view }: Props) => {
  const user = getDataUser();
  const books = useGetBooks(user);

  return (
    <>
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
                  <View style={{ padding: 8 }}>
                    <PosterImg
                      imgURL={item.bookCover}
                      width={width / 3 - 20}
                      height={(width / 3) * 1.53}
                      showPlayBoton={true}
                      onPress={() => {
                        navigation.navigate("Modal", {
                          fullFile: item.fullFile,
                        });

                        // navigation.navigate("ReadingBook", {
                        //   bookId: item.bookId,
                        // });
                      }}
                    />
                  </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    paddingTop: 40,
    paddingBottom: 5,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    color: "white",
    fontSize: 20,
    fontFamily: FontsList.GTSectraFine,
  },
  carouselContainer: {
    marginBottom: 50,
  },
  booksSectionText: {
    fontSize: 18,
    fontFamily: FontsList.MontserratSemiBold,
    color: "white",
    marginBottom: 25,
  },
  separator: {
    marginBottom: 20,
  },
});
