import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Book, BookPdf } from "../api/books";
import PosterImg from "./PosterImg";
import ManageBookDetail from "./ManageBookDetail";

import { FontsList, Colors } from "../theme/styles";
import { useTheme } from "@react-navigation/native";
import Rating from "./Rating";

interface Props {
  book: BookPdf;
  onPress?: () => void;
}
const BookCard = ({
  book,
  width = 80,
  height = 110,
  onPress = () => {},
}: Props) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      width: 300,
    },
    bookDetail: {
      marginLeft: 30,
      flex: 1,
      paddingVertical: 6,
    },
    bookTitle: {
      fontSize: 18,
      fontFamily: FontsList.GTSectraFine,
      color: colors.text,
      width: "100%",
    },
    authorText: {
      fontSize: 12,
      fontFamily: FontsList.MontserratMedium,
      color: Colors.subTitle,
      marginVertical: 5,
    },
    rowPrice: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    spacing: {
      flex: 1,
    },
    priceText: {
      color: colors.text,
      fontSize: 18,
      fontFamily: FontsList.MontserratSemiBold,
    },
    ratingAvarageText: {
      fontSize: 14,
      fontFamily: FontsList.MontserratMedium,
      color: colors.text,
      marginHorizontal: 5,
    },
    ratingPoepleText: {
      fontFamily: FontsList.MontserratRegular,
      fontSize: 13,
      color: colors.text,
    },
  });
  return (
    <View style={styles.container}>
      <PosterImg
        imgURL={book.bookCover}
        showPlayBoton={false}
        width={width}
        height={height}
        onPress={onPress}
      />

      <View style={styles.bookDetail}>
        <Text numberOfLines={3} adjustsFontSizeToFit style={styles.bookTitle}>
          {book.bookName}
        </Text>
        <Text style={styles.authorText}>{book.bookWriterBy}</Text>
        <View style={styles.rowPrice}>
          <ManageBookDetail book={book} />

          {/*
          <Text style={styles.priceText}>{book.bookDesc} </Text>
          <View style={styles.spacing} />
          <Rating
            averageRating={book.averageRating}
            ratingPeople={book.ratingPeople}
          />
          <Icon name="star" size={16} color={Colors.star} />
          <Text style={styles.ratingAvarageText}>{book.averageRating}</Text>
          <Text style={styles.ratingPoepleText}>({book.ratingPeople})</Text> */}
        </View>
      </View>
    </View>
  );
};

export default BookCard;
