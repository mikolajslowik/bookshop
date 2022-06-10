import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { cart } from "../features/counter/bookSlice";
import "./Cart.scss";
import Tile from "./Tile";

function Cart() {
  const cartItems = useAppSelector(cart);

  return (
    <div className="cart">
      <div className="list">
        <>
          {cartItems.map((book: any) => (
            <Tile key={book.id} book={book} />
          ))}
        </>
      </div>
      <Link
        className="further"
        role="button"
        to="/deliveryform"
        //  onClick={this.handleClick()}
      >
        order
      </Link>
    </div>
  );
}

export default Cart;
