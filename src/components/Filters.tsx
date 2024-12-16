import React, { SetStateAction, useState, useEffect } from "react";

interface Props {
  setFilters: SetStateAction<any>;
}

const Filters = ({ setFilters }: Props) => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setFilters({ category, minPrice, maxPrice, sort });
  }, [category, minPrice, maxPrice, sort, setFilters]);

  return (
    <div className="space-y-4">
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
