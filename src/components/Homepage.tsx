import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchData,
  selectBooks,
  setQuery,
} from "../features/counter/bookSlice";
// import { useGetBookByNameQuery } from "../features/counter/services/search";
import "./Homepage.scss";
import Tile from "./Tile";

// import useGetBookByQuery from "../features/counter/services/search";

function Homepage() {
  const books = useAppSelector(selectBooks);
  const dispatch = useAppDispatch();
  const [que, setQue] = useState("");

  // const { data, error, isLoading } = useGetBookByNameQuery(que);

  useEffect(() => {
    dispatch(fetchData());
  }, [que]);
  console.log();

  return (
    <div className="homepage">
      <div className="search">
        <input
          onChange={(e) => dispatch(setQuery(e.target.value))}
          name="searchinput"
          className="searchinput"
          type="text"
          placeholder="write title or author"
        />
      </div>
      <div className="list">
        <>
          {
            books.map((book: any) => (
              <Tile key={book.id} book={book} />
            ))
            // s: data.map((book: any) => <Tile key={book.id} book={book} />)}
          }{" "}
        </>
      </div>
    </div>
  );
}

export default Homepage;
