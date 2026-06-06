import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch ,useSelector} from "react-redux";
import { toast } from "react-toastify";

import {
  FaHeart,
  FaStar,
  FaRegStar,
  FaShoppingCart,
} from "react-icons/fa";

import { addCard } from "../redux/cardSlice";
import { removeCard } from "../redux/cardSlice";

/* ===================== HOME ===================== */

function Home() {
  const API_URL = "https://dummyjson.com/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data?.products || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen py-10">

      <h1 className="text-3xl font-bold text-center mb-10 text-gray-700">
        Our Products
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading...
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            dispatch={dispatch}
          />
        ))}

      </div>
    </section>
  );
}

export default Home;

/* ===================== PRODUCT CARD ===================== */

function ProductCard({ product, dispatch }) {
  if (!product) return null;

  const card = useSelector((state) => state.cardStore.cards);
  const checkCarditem = card?.find((obj) => obj.id === product.id);

  const addToCart = () => {
    const cardItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      total: product.price,
      thumbnail: product.thumbnail,
    };

    dispatch(addCard({ cardItem }));

    // ✅ Toast success
    toast.success("Product added to cart!");
    console.log("Current Cart State:", card);
  };

  const removeCardItem = () => {
    const cardItem = { id: product.id };
    dispatch(removeCard({ cardItem }));
    toast.info("Product removed from cart");
    console.log("Current Cart State:", card);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition duration-300">

      {/* Image */}
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />

        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-red-500 hover:scale-110 transition">
          <FaHeart />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Title */}
        <h2 className="text-lg font-bold mb-2">
          {product.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 mb-3">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStar />

          <span className="text-gray-600 ml-2 text-sm">
            ({product.rating?.toFixed(1) || "0.0"})
          </span>
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-gray-800 mb-4">
          ${product.price}
        </p>

        {/* Button */}
        {
          checkCarditem ? (
            <button
              onClick={removeCardItem}
              className="w-full bg-red-500 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition"
            >
              <FaShoppingCart />
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={addToCart}
              className="w-full bg-black text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-500 transition"
            >
              <FaShoppingCart />
              Add to Cart
            </button>
          )
        }
     
      </div>
    </div>
  );
}