import { useEffect, useState } from "react";
import { booksList, Book, BookPdf } from "../api/books";
import axios from "axios";
import { getDataUser } from "../../store_data";
export function useBook(bookId: string): BookPdf {
  const [book, setBook] = useState({} as BookPdf);

  useEffect(async () => {
    const user = await getDataUser();
    if (user.token) {
      const headers = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      // const result = await axios.get("https://api.tooncontent.com/book", headers);
      // console.log(result);
      // alert(result)

      axios
        .get(`https://api.tooncontent.com/book/${bookId}`, headers)
        .then((result) => {
          console.log(result);
          if (result.status == 200) {
            console.log(result.data.message);
            let item = result.data.message;
            const book = {
              bookName: item.bookName,
              bookCover: item.bookCover,
              bookWriterBy: item.bookWriterBy,
              bookDesc: item.bookDesc,
              fullFile: item.fullFile,
              bookId: item.bookId,
            };
            setBook(book);
          } else {
            setBooks();
          }
        })
        .catch((error) => {
          alert("error");

          setBooks([]);
        });
    }
  }, [bookId]);

  return book;
}
