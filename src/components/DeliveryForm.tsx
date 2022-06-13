import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  cart,
  removeEverythingFromCart,
  removeFromCart,
} from "../features/counter/bookSlice";
import "./DeliveryForm.scss";
import Popup from "./Popup";
import Sent from "./Sent";

function DeliveryForm() {
  const cartItems = useAppSelector(cart);
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isSent, setIsSent] = useState<boolean>(false);

  const count = cartItems.reduce((accumulator: any, value) => {
    return { ...accumulator, [value.id]: (accumulator[value.id] || 0) + 1 };
  }, {});

  const orderData = Object.entries(count).map((item) => ({
    id: Number(item[0]),
    quantity: Number(item[1]),
  }));

  const [formData, setFormData] = useState({
    order: orderData,
    first_name: "",
    last_name: "",
    city: "",
    zip_code: "",
  });

  const inputs = [
    {
      id: 1,
      name: "first_name",
      type: "text",
      placeholder: "name",
      label: "name",
    },
    {
      id: 2,
      name: "last_name",
      type: "text",
      placeholder: "surname",
      label: "surname",
    },
    {
      id: 3,
      name: "city",
      type: "text",
      placeholder: "city",
      label: "city",
    },
    {
      id: 4,
      name: "zip_code",
      type: "text",
      placeholder: "zipcode",
      label: "zipcode",
    },
  ];

  const onChange = (e: any) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let isZipValid: Array<string> | null;

  const checkZip = () => {
    isZipValid = formData.zip_code.match(new RegExp(/(\d{2}-\d{3})+/g));
  };

  useEffect(() => {
    checkZip();
  }, [isValid]);

  // console.log("ziplen", isZipValid?.length);
  // console.log("zipval", isZipValid);

  const handleSubmit = (e: any) => {
    if (
      !formData.city ||
      !formData.first_name ||
      !formData.last_name ||
      !isZipValid
    ) {
      return setIsValid(false), (formData.zip_code = "");
    } else
      return (
        e.preventDefault(),
        console.log("before post", formData),
        axios
          .post(
            "http://localhost:3001/docs/#/Book/order",
            JSON.stringify(formData)
          )
          .then((res) => {
            if (res.status === 200) return setIsSent(true);
          })
          .then(
            () => (
              dispatch(removeEverythingFromCart()),
              (formData.city = ""),
              (formData.first_name = ""),
              (formData.last_name = ""),
              (formData.zip_code = ""),
              (formData.order = []),
              console.log("after post", formData)
            )
          )
      );
  };

  let totalCost = 0;
  cartItems.forEach((item) => (totalCost += item.price));

  return (
    <div className="deliveryForm">
      <div className="formContainer">
        <h1> Please fill the form.</h1>
        <form>
          <>
            {inputs.map((input) => (
              <label>
                <input
                  type={input.type}
                  name={input.name}
                  onChange={onChange}
                  placeholder={input.placeholder}
                />
              </label>
            ))}
          </>
        </form>
        <Link className="further" role="button" to="/cart">
          go back to cart
        </Link>
        <input
          className="send"
          type="submit"
          value="Pay and Buy"
          onClick={handleSubmit}
        />
        <h1>summary</h1>
      </div>
      <div className="orderList">
        <table>
          <tr>
            <td>author</td>
            <td>title</td>
            {/* <td>amount</td> */}
            <td>price</td>
          </tr>
          {cartItems.map((item) => (
            <tr>
              <td>{item.author}</td>
              <td>{item.title}</td>
              {/* <td>{item.amount}</td> */}
              <td>{item.price}</td>
              <td style={{ border: "none" }}>
                <button
                  className="remove"
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  remove item
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="totalCost">Total price is {totalCost} pln</div>
      {isSent ? <Sent /> : null}
      {!isValid ? <Popup isValid={isValid} setIsValid={setIsValid} /> : null}
    </div>
  );
}

export default DeliveryForm;
function IsMatch(zip_code: string, arg1: string) {
  throw new Error("Function not implemented.");
}
