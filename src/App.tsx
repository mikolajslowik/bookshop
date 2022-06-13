import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Cart from "./components/Cart";
import DeliveryForm from "./components/DeliveryForm";
import Homepage from "./components/Homepage";
import Navigation from "./components/Navigation";

function App() {
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
