import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeCard, changeQuantity } from "../redux/cardSlice";
import {
  FaHeart,
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";

const ProductCard = () => {
  const cards = useSelector((state) => state.cardStore.cards || []);
  const dispatch = useDispatch();

  const handleRemove = (cardItem) => {
    dispatch(removeCard({ cardItem }));
    toast.info("Removed item from cart");
  };

  const handleDelta = (id, delta) => {
    dispatch(changeQuantity({ cardItem: { id, delta } }));
  };

  const subtotal = cards.reduce((s, c) => s + (c.total || (c.price * (c.quantity || 1))), 0);
  const shipping = cards.reduce((s, c) => s + (c.shipping || 0), 0);
  const tax = cards.reduce((s, c) => s + (c.tax || 0), 0);
  const total = subtotal + shipping + tax;

  const handleProceedCheckout = () => {
    if (cards.length === 0) {
      toast.warn("Your cart is empty.");
      return;
    }

    const checkoutData = {
      items: cards,
      subtotal,
      shipping,
      tax,
      total,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem("checkoutCart", JSON.stringify(checkoutData));
    toast.success("Cart saved to local storage for checkout.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cards.length === 0 && (
            <div className="bg-white p-6 rounded-lg text-center text-gray-600">Your cart is empty</div>
          )}

          {cards.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
              <img src={product.thumbnail} alt={product.title} className="w-28 h-20 object-cover rounded-lg" />

              <div className="flex-1">
                <h3 className="font-bold">{product.title}</h3>
                <p className="text-sm text-gray-500">${product.price} each</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => handleDelta(product.id, -1)}
                    className="p-2 bg-gray-100 rounded border border-gray-200 hover:bg-gray-200 transition"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>

                  <span className="font-semibold">{product.quantity || 1}</span>

                  <button
                    onClick={() => handleDelta(product.id, 1)}
                    className="p-2 bg-orange-100 rounded-lg border border-gray-200 hover:bg-gray-200 transition"
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>

                  <button onClick={() => handleRemove({ id: product.id })} className="ml-4 text-red-500 hover:text-red-600 transition">
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold">${((product.total) || (product.price * (product.quantity || 1))).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button onClick={handleProceedCheckout} className="w-full mt-5 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">Proceed Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;