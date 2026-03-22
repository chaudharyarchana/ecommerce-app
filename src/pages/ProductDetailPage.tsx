import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types";
import useCart from "../hooks/useCart";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

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

  const isInCart = cartItems.some((item) => item.id === Number(id));

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
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6 transition"
        >
          ← Back
        </button>

        {/* Product card */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-64 h-64">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 flex-1">
            {/* Category */}
            <span className="text-xs text-gray-400 uppercase tracking-wide capitalize">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-xl font-bold text-gray-800">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-sm">
                ⭐ {product.rating.rate}
              </span>
              <span className="text-gray-400 text-sm">
                ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Add to cart button */}
            <button
              data-cy="add-to-cart"
              onClick={handleAddToCart}
              className={`mt-auto w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                added
                  ? "bg-green-500 scale-95"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
              }`}
            >
              {added
                ? "✓ Added to Cart!"
                : isInCart
                  ? "Add More"
                  : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
