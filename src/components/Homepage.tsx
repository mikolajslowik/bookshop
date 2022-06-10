import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchData,
  selectBooks,
  setQuery,
} from "../features/counter/bookSlice";
import "./Homepage.scss";
import Tile from "./Tile";

function Homepage() {
  const books = useAppSelector(selectBooks);
  // const p = useAppSelector(page);
  const dispatch = useAppDispatch();

  // const [pageApi, setPageApi] = useState(1);

  // const handleScroll = (event: any) => {
  //   if (
  //     window.innerHeight + event.target.documentElement.scrollTop >=
  //     event.target.documentElement.scrollHeight
  //   ) {
  //     setPageApi(pageApi + 1);
  //   } else return;
  // };
  // dispatch(setPage(pageApi));

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  // }, [pageApi]);

  useEffect(() => {
    dispatch(fetchData());
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
