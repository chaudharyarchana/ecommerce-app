import { Link } from "react-router-dom";
import { Product } from "../types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      data-cy="product-card"
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 h-full"
    >
      <div className="p-4 flex flex-col items-center gap-3 h-full">
        {/* Image — fixed height */}
        <div className="w-full h-48 flex items-center justify-center flex-shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Title — fixed height with clamp */}
        <h3 className="text-sm font-medium text-gray-800 text-center line-clamp-2 h-10 w-full">
          {product.title}
        </h3>

        {/* Price + Rating */}
        <div className="flex items-center justify-between w-full mt-auto">
          <span className="text-indigo-600 font-bold">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
            ⭐ {product.rating.rate}
          </span>
        </div>

        {/* Category */}
        <span className="text-xs text-gray-400 capitalize w-full text-center">
          {product.category}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
