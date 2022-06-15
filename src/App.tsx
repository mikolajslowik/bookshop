import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { useAppDispatch } from "./app/hooks";
import Cart from "./components/Cart";
import DeliveryForm from "./components/DeliveryForm";
import Homepage from "./components/Homepage";
import Navigation from "./components/Navigation";
import { fetchData } from "./features/counter/bookSlice";

function App() {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, []);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/deliveryform" element={<DeliveryForm />} />
      </Routes>
    </div>
  );
}

export default App;
