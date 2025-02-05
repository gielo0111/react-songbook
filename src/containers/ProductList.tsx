import React, { useState } from "react";
import { useProducts } from "./../lib/db.ts";

export const ProductList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const { products, newOffset, totalProducts, loading } = useProducts(search, offset);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🎵 Songbook</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="mt-4">
          {/* Product List */}
          <ul className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <li key={product._id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">by {product.artist}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Load More Button */}
      {newOffset !== null && (
        <button
          onClick={() => setOffset(newOffset)}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Load More
        </button>
      )}

      <p className="text-gray-500 text-sm mt-2">Total Songs: {totalProducts}</p>
    </div>
  );
};
