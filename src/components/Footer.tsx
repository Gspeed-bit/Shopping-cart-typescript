import useCart from "../hooks/useCart";

type PropsType = {
  showCart: boolean;
};

const Footer = ({ showCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();
  const year: number = new Date().getFullYear();
  const pageContent = showCart ? (
    <p className="footer_para"> Shopping Cart &copy; {year}</p>
  ) : (
    <div className="wrapper">
      <div className="footer_container">
        <p> Total Items: {totalItems}</p>
        <p> Total price: {totalPrice}</p>
      </div>
      <p className="footer_para"> Shopping Cart &copy; {year}</p>
    </div>
  );
  const content = <footer className="footer">{pageContent}</footer>;
  return content;
};
export default Footer;
