import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { cart } from "../features/counter/bookSlice";
import "./DeliveryForm.scss";

function DeliveryForm() {
  const cartItems = useAppSelector(cart);

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

  const handleSubmit = (e: any) => {
    return e.preventDefault(), console.log(formData);
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
            <td>amount</td>
            <td>price</td>
          </tr>
          {cartItems.map((item) => (
            <tr>
              <td>{item.author}</td>
              <td>{item.title}</td>
              <td>{item.amount}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </table>
      </div>
      <div className="totalCost">Total price is {totalCost}pln</div>
    </div>
  );
}

export default DeliveryForm;
