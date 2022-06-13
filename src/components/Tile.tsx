import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import {
  addToCart,
  Book,
  cart,
  removeFromCart,
} from "../features/counter/bookSlice";
import "./Tile.scss";

interface BookProps {
  book: Book;
}

export default function Tile(props: BookProps) {
  const cartItems = useAppSelector(cart);
  const dispatch = useDispatch();

  const isInCart = cartItems.includes(props.book);
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
            <li>
              <p>Pages: {props.book.pages}</p>
            </li>
          </ul>
          <div className="counter"></div>
          <div className="add">
            {isInCart ? (
              <p onClick={() => dispatch(removeFromCart(props.book))}>
                remove from cart
              </p>
            ) : (
              <p onClick={() => dispatch(addToCart(props.book))}>add to cart</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
