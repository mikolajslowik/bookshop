import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchData,
  loading,
  page,
  query,
  selectBooks,
  setPage,
  setQuery,
} from "../features/counter/bookSlice";
import "./Homepage.scss";
import Tile from "./Tile";

function Homepage() {
  const isLoading = useAppSelector(loading);
  const books = useAppSelector(selectBooks);
  const dispatch = useAppDispatch();
  let debounceTimeoutId: NodeJS.Timeout;
  let lockScrollCallback: boolean;

  const q = useAppSelector(query);
  const p = useAppSelector(page);

  useEffect(() => {
    dispatch(fetchData());
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
      <div className="loading">{isLoading ? <p>loading</p> : null}</div>
    </div>
  );
}

export default Homepage;
