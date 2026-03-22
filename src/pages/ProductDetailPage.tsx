import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types";
import useCart from "../hooks/useCart";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartItems,
  } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [added, setAdded] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch product");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const cartItem = cartItems.find((item) => item.id === Number(id));
  const isInCart = Boolean(cartItem);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error || "Product not found"}
      </div>
    );
  }

  return (
    <div className="page-height bg-gray-50 pb-24 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 mb-6 transition-all duration-200 hover:-translate-x-1"
        >
          <span
            style={{ transform: "translateY(-2px)", display: "inline-block" }}
          >
            ←
          </span>
          <span>Back</span>
        </button>

        {/* Product card */}
        <div
          className="bg-white rounded-2xl shadow-md p-6 md:p-10 flex flex-col md:flex-row gap-8 animate-bounce-in opacity-0"
          style={{ animationFillMode: "forwards" }}
        >
          {/* Image */}
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-64 h-64">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110 hover:rotate-2"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 flex-1">
            {/* Category */}
            <span
              className="text-xs text-gray-400 uppercase tracking-wide capitalize animate-fade-in opacity-0"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              {product.category}
            </span>

            {/* Title */}
            <h1
              className="text-xl font-bold text-gray-800 animate-fade-in opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              {product.title}
            </h1>

            {/* Rating */}
            <div
              className="flex items-center gap-2 animate-fade-in opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <span className="text-yellow-400 text-sm">
                ⭐ {product.rating.rate}
              </span>
              <span className="text-gray-400 text-sm">
                ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <p
              className="text-2xl font-bold text-indigo-600 animate-fade-in opacity-0"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <p
              className="text-gray-600 text-sm leading-relaxed animate-fade-in opacity-0"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              {product.description}
            </p>

            {/* Add to cart / Quantity controls */}
            <div
              className="animate-fade-in opacity-0"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              {!isInCart || added ? (
                <button
                  data-cy="add-to-cart"
                  onClick={handleAddToCart}
                  className={`mt-auto w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                    added
                      ? "bg-green-500 animate-scale-up"
                      : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 hover:scale-105 active:scale-95"
                  }`}
                >
                  {added ? "✓ Added to Cart!" : "Add to Cart"}
                </button>
              ) : (
                <div className="mt-auto flex items-center gap-4 animate-fade-in">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2">
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-red-100 hover:border-red-300 hover:scale-110 transition-all duration-200 font-bold"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">
                      {cartItem?.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(product.id)}
                      className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-green-100 hover:border-green-300 hover:scale-110 transition-all duration-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95"
                  >
                    🗑️ Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
