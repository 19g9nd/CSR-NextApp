import { Product } from "@/types/Product";
import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import SearchBar from "./SearchBar";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<any>({
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); 
  const [totalProducts, setTotalProducts] = useState(0); 
  const limit = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      const queryString = new URLSearchParams({
        ...filters,
        search,
        page: page.toString(),
        limit: limit.toString(),
      }).toString();
      const response = await fetch(`/api/products?${queryString}`);
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.total); 
    };

    fetchProducts();
  }, [filters, search, page]);

  const totalPages = Math.ceil(totalProducts / limit); // Calculate total number of pages

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <SearchBar search={search} setSearch={setSearch} />
      <Filters setFilters={setFilters} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.category}</p>
            <p className="text-lg font-bold text-green-600">
              {product.price} $
            </p>
            <p className="text-yellow-500">{product.rating}★</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
