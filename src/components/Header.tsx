import Nav from "./Nav";
import useCart from "../hooks/useCart";
type PropsType = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ showCart, setShowCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();
  const content = (
    <header className="header">
      <div className=" header__content">
        <h1>LivingLogos PLC</h1>
        <div>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
          <Nav showCart={showCart} setShowCart={setShowCart} />
        </div>
      </div>
    </header>
  );

  return content;
};
export default Header;
