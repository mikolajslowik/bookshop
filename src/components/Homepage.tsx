import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchData,
  page,
  query,
  selectBooks,
  setPage,
  setQuery,
  totalRecords,
} from "../features/counter/bookSlice";
import "./Homepage.scss";
import Tile from "./Tile";

function Homepage() {
  const books = useAppSelector(selectBooks);
  const recordsInTotal = useAppSelector(totalRecords);
  const q = useAppSelector(query);
  const p = useAppSelector(page);
  const dispatch = useAppDispatch();
  let debounceTimeoutId: NodeJS.Timeout;
  let lockScrollCallback: boolean;

  useEffect(() => {
    if (recordsInTotal > books.length || recordsInTotal === 0) {
      dispatch(fetchData());
    }
  }, [p, q]);

  const handleScroll = (event: any) => {
    if (
      lockScrollCallback &&
      window.innerHeight + event.target.documentElement.scrollTop + 1 >=
        event.target.documentElement.scrollHeight
    ) {
      dispatch(setPage(1));
    } else return;
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      clearTimeout(debounceTimeoutId);
      lockScrollCallback = true;
      debounceTimeoutId = setTimeout(() => {
        handleScroll(e);
        setTimeout(() => {
          lockScrollCallback = false;
        }, 100);
      }, 100);
    });
  }, []);

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
          {books.map((book: any) => (
            <Tile key={book.id} book={book} />
          ))}
        </>
      </div>
    </div>
  );
}

export default Homepage;
