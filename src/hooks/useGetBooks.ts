import { useEffect, useState } from "react";
import { booksList, Book } from "../api/books";
import { getDataUser } from "../../store_data";
import axios from "axios";

interface BookPdf {
  bookName: string;
  bookCover: string;
  bookWriterBy: string;
  bookDesc: string;
  fullFile: string;
  bookId: number;
}

export function useGetBooks(): BookPdf[] {
  const [books, setBooks] = useState([] as BookPdf[]);

  //
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
        .get("https://api.tooncontent.com/book", headers)
        .then((result) => {
          console.log(result);
          if (result.status == 200) {
            console.log(result.data.message);
            let arraybooks = result.data.message;
            let newarray = [];
            arraybooks.map((item) => {
              newarray.push({
                bookName: item.bookName,
                bookCover: item.bookCover,
                bookWriterBy: item.bookWriterBy,
                bookDesc: item.bookDesc,
                fullFile: item.fullFile,
                bookId: item.bookId,
              });
            });

            setBooks([...newarray]);
          } else {
            setBooks([]);
          }
        })
        .catch((error) => {
          alert("error");

          setBooks([]);
        });
    }
  }, []);

  return books;
}
