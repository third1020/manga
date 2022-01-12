import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Book, BookPdf } from "../api/books";
import PosterImg from "./PosterImg";
import { FontsList, Colors } from "../theme/styles";


import Rating from "./Rating";

interface Props {
  book: BookPdf;
  onPress?: () => void;
}
const BookCard = ({ book, onPress = () => {} }: Props) => {
  return (
    <View style={styles.container}>
      <PosterImg
        imgURL={book.bookCover}
        showPlayBoton={false}
        width={80}
        height={110}
        onPress={onPress}
      />

      <View style={styles.bookDetail}>
        <Text numberOfLines={3} adjustsFontSizeToFit style={styles.bookTitle}>
          {book.bookName}
        </Text>
        <Text style={styles.authorText}>{book.bookWriterBy}</Text>
        <View style={styles.rowPrice}>

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
    color: "white",
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
    color: "white",
    fontSize: 18,
    fontFamily: FontsList.MontserratSemiBold,
  },
  ratingAvarageText: {
    fontSize: 14,
    fontFamily: FontsList.MontserratMedium,
    color: "white",
    marginHorizontal: 5,
  },
  ratingPoepleText: {
    fontFamily: FontsList.MontserratRegular,
    fontSize: 13,
    color: Colors.subTitle,
  },
});
