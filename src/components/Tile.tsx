import { useDispatch } from "react-redux";
import { Book } from "../features/counter/bookSlice";
import "./Tile.scss";

// export interface TileProps {
//   book: Book;
// }

// export interface Books {
//   books: Book[];
// }

export default function Tile(props: any) {
  const dispatch = useDispatch();

  return (
    <div className="tile">
      <div className="img">
        {props.book.cover_url ? (
          <img
            className="cover"
            src={props.book.cover_url}
            alt="Cannot find image!"
          />
        ) : (
          <p className="cover">cannot find cover</p>
        )}
      </div>

      <div className="details">
        <div className="scroll">
          <ul>
            <li>
              <p>Author: {props.book.author}</p>
            </li>
            <li>
              <p>Title: {props.book.title}</p>
            </li>
          </ul>
          <div className="add" onClick={() => {}}>
            <p>
              {props.book ? (
                <p style={{ color: "red" }}>-</p>
              ) : (
                <p style={{ color: "green" }}>+</p>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
