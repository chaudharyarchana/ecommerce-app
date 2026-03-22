import { Link, useLocation } from "react-router-dom";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-indigo-600 text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide hover:opacity-90"
        >
          MyShop
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium hover:opacity-80 transition ${
              isActive("/") ? "text-yellow-400" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/cart"
            className={`text-sm font-medium hover:opacity-80 transition flex items-center gap-1 ${
              isActive("/cart") ? "text-yellow-400" : ""
            }`}
          >
            Cart
            <span className="bg-white text-indigo-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
