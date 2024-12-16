import { NextApiRequest, NextApiResponse } from "next";
import products from "../../../../data/products";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    category,
    minPrice,
    maxPrice,
    sort,
    search,
    page = "1",
    limit = "5",
  } = req.query;
  const searchTerm = Array.isArray(search) ? search[0] : search;
  const currentPage = parseInt(page as string, 10);
  const currentLimit = parseInt(limit as string, 10);
  const min = minPrice ? parseInt(minPrice as string, 10) : null;
  const max = maxPrice ? parseInt(maxPrice as string, 10) : null;

  let filteredProducts = products;
  console.log(filteredProducts);
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (min !== null) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= min
    );
  }
  if (max !== null) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= max
    );
  }
  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm?.toLowerCase() ?? "")
    );
  }

  if (sort) {
    filteredProducts = filteredProducts.sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });
  }

  const startIndex = (currentPage - 1) * currentLimit;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + currentLimit
  );
  res
    .status(200)
    .json({ products: paginatedProducts, total: filteredProducts.length });
}
