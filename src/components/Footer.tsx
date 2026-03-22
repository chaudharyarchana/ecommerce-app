import useCart from "../hooks/useCart";

const Footer = () => {
  const { totalItems, totalValue } = useCart();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-indigo-600 text-white px-4 py-3 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="text-sm font-medium">
          Items in cart: <strong>{totalItems}</strong>
        </span>
        <span className="text-sm font-medium">
          Total: <strong>${totalValue.toFixed(2)}</strong>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
