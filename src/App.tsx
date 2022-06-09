import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Cart from "./components/Cart";
import DeliveryForm from "./components/DeliveryForm";
import Homepage from "./components/Homepage";
import Navigation from "./components/Navigation";
import { fetchData, query } from "./features/counter/bookSlice";

function App() {
  const dispatch = useAppDispatch();
  const storeQuery = useAppSelector(query);
  console.log(storeQuery);
  useEffect(() => {
    dispatch(fetchData());
  }, [storeQuery]);

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
