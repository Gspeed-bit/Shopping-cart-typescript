import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { useState } from "react";

function App() {
  const [showCart, setShowCart] = useState<boolean>(false);

  const pageContent = showCart ? <Cart /> : <ProductList />;

  const content = (
    <div className="container">
      <Header showCart={showCart} setShowCart={setShowCart} />
      <div className="page_content">{pageContent}</div>
      <Footer showCart={showCart} />
    </div>
  );

  return content;
}
export default App;
