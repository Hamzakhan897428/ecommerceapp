import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  const cartCount = useSelector((state) => state.cardStore.cards?.length ?? 0);

  return (
    <header className="bg-slate-900 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-amber-400"
        >
          EcommerceApp
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-200 justify-center sm:justify-start w-full sm:w-auto">
          <Link to="/" className="transition hover:text-yellow-400">
            Home
          </Link>
          <Link to="/Card" className="transition hover:text-yellow-400">
            Cart
          </Link>
        </nav>

        <Link
          to="/Card"
          className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
        >
          <FaShoppingCart />
          <span className="hidden sm:inline">Cart</span>
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-900">
            {cartCount}
          </span>
        </Link>
      </div>
   
    </header>
  );
}

export default Header;
