type propsType = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ showCart, setShowCart }: propsType) => {
  const button = showCart ? "View Products" : "View Cart"; // Changed button labels for better clarity

  const content = (
    <nav>
      <nav className="styled-button" onClick={() => setShowCart(!showCart)}>
        {button}
      </nav>
    </nav>
  );

  return content;
};
export default Nav;
