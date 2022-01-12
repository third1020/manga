import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontsList, Colors } from "../theme/styles";
import Rating from "./Rating";
import { Book, BookPdf } from "../api/books";

interface Props {
  book: BookPdf;
  center?: boolean;
}
const BookDetails = ({ book, center = false }: Props) => {
  return (
    <View style={[styles.contentContainer, center && styles.center]}>
      <Text
        numberOfLines={2}
        adjustsFontSizeToFit
        style={[styles.title, center && styles.textCenter]}
      >
        {book.bookName}
      </Text>
      <Text style={styles.authorText}>{book.bookWriterBy}</Text>
    </View>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  contentContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: FontsList.GTSectraFine,
    fontSize: 30,
    lineHeight: 30,
    color: "white",
    marginBottom: 15,
  },
  textCenter: {
    paddingHorizontal: 30,
    textAlign: "center",
  },
  authorText: {
    fontSize: 18,
    fontFamily: FontsList.MontserratMedium,
    color: Colors.subTitle,
  },
  ratingContainer: {
    marginTop: 20,
    marginBottom: 35,
  },
});
