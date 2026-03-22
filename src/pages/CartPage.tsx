import React from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { CartItem } from "../types";

const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    totalItems,
    totalValue,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24">
        <div className="text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything yet
          </p>
          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            My Cart ({totalItems} items)
          </h1>
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800 text-sm transition"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Cart items */}
        <div className="flex flex-col gap-4">
          {cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center border border-gray-100"
            >
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 capitalize mt-1">
                  {item.category}
                </p>
                <p className="text-indigo-600 font-bold mt-1">
                  ${item.price.toFixed(2)}
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition font-bold"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition font-bold"
                  >
                    +
                  </button>
                  <span className="text-gray-400 text-xs ml-2">
                    = ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Remove button */}
              <button
                data-cy="remove-from-cart"
                onClick={() => removeFromCart(item.id)}
                className="flex-shrink-0 text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${totalValue.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span className="text-indigo-600">${totalValue.toFixed(2)}</span>
            </div>
          </div>

          <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 active:scale-95">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
